import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import axiosInstance from "../plugins/interceptor";
import { symbolsAtom } from "../atoms";
import { Layout, Typography, Input, Card, Button, Modal } from "antd";
import Loader from "../components/Loader";
import type { Symbol } from "../atoms";

const { Paragraph, Text, Title } = Typography;
const { Content } = Layout;

type StockDetails = {
  c: number; // current price
  pc: number; // previous close price
  o: number; // open price
  h: number; // high price
  l: number; // low price
};

const Symbols: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("apple");
  const [symbols, setSymbols] = useAtom(symbolsAtom);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const fetchStockDetails = async (symbol: string) => {
    setDetailsLoading(true);
    try {
      const response = await axiosInstance.get(`/quote?symbol=${symbol}`);
      setStockDetails(response.data);
    } catch (error) {
      console.error("Error fetching stock details:", error);
      setStockDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchSymbols = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(
            `/search?q=${searchQuery}&exchange=US`
          );
          setSymbols(response.data.result);
        } catch (error) {
          console.error("Error fetching symbols:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSymbols();
    }, 500);

    return () => clearTimeout(handler);
  }, [setSymbols, searchQuery]);

  const handleShowDetails = (symbol: Symbol) => {
    setSelectedSymbol(symbol);
    setModalVisible(true);
    fetchStockDetails(symbol.symbol);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedSymbol(null);
    setStockDetails(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <Content style={{ padding: "50px", marginTop: 64 }}>
        <div
          className="site-layout-content"
          style={{ background: "#fff", padding: 24, minHeight: 380 }}
        >
          <Paragraph>
            Welcome to the Symbols page! Here you can find information about
            various stock symbols, including their name, exchange, and more.
          </Paragraph>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a symbol..."
            style={{
              width: "300px",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ marginTop: "16px", fontStyle: "italic" }}>
            <Text type="secondary">{symbols.length} symbols found.</Text>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
              marginTop: "16px",
            }}
          >
            {symbols.map((symbol: Symbol) => (
              <Card
                key={symbol.symbol}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <Title level={3}>{symbol.displaySymbol}</Title>
                <Paragraph>{symbol.description}</Paragraph>
                <Button
                  type="primary"
                  onClick={() => handleShowDetails(symbol)}
                  style={{ marginBottom: "8px" }}
                >
                  Show Details
                </Button>
              </Card>
            ))}
          </div>
          <Modal
            title={selectedSymbol?.displaySymbol}
            visible={modalVisible}
            onCancel={handleModalClose}
            footer={null}
          >
            {detailsLoading ? (
              <Loader />
            ) : stockDetails ? (
              <div>
                <Paragraph>
                  <Text strong>Current Price:</Text> ${stockDetails.c}
                </Paragraph>
                <Paragraph>
                  <Text strong>Previous Close:</Text> ${stockDetails.pc}
                </Paragraph>
                <Paragraph>
                  <Text strong>Open:</Text> ${stockDetails.o}
                </Paragraph>
                <Paragraph>
                  <Text strong>High:</Text> ${stockDetails.h}
                </Paragraph>
                <Paragraph>
                  <Text strong>Low:</Text> ${stockDetails.l}
                </Paragraph>
              </div>
            ) : (
              <Paragraph>No details available.</Paragraph>
            )}
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default Symbols;

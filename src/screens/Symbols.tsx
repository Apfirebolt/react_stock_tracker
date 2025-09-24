import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import axiosInstance from "../plugins/interceptor";
import { symbolsAtom } from "../atoms";
import { Layout, Typography, Input, Card, Button, Modal } from "antd";
import Loader from "../components/Loader";
import StockPrice from "../components/StockPrice";
import StockProfile from "../components/StockProfile";
import StockNews from "../components/StockNews";
import type { Symbol, NewsItem } from "../atoms";

const { Paragraph, Text, Title } = Typography;
const { Content } = Layout;

const Symbols: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("apple");
  const [symbols, setSymbols] = useAtom(symbolsAtom);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [isNewsModalVisible, setIsNewsModalVisible] = useState(false);
  const [isStockProfileModalVisible, setIsStockProfileModalVisible] = useState(false);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [stockProfile, setStockProfile] = useState<any | null>(null);
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

  const fetchStockNews = async (symbol: string) => {
    setDetailsLoading(true);
    try {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      const from = lastWeek.toISOString().slice(0, 10);
      const to = today.toISOString().slice(0, 10);

      const response = await axiosInstance.get(
        `/company-news?symbol=${symbol}&from=${from}&to=${to}`
      );
      setNewsData(response.data);
      setIsNewsModalVisible(true);
    } catch (error) {
      console.error("Error fetching stock news:", error);
      setNewsData([]);
    } finally {
      setDetailsLoading(false);
    }
  };

  const fetchStockProfile = async (symbol: string) => {
    setDetailsLoading(true);
    try {
      const response = await axiosInstance.get(`/stock/profile2?symbol=${symbol}`);
      setStockProfile(response.data);
      setIsStockProfileModalVisible(true);
    } catch (error) {
      console.error("Error fetching stock profile:", error);
      setStockProfile(null);
    } finally {
      setDetailsLoading(false);
    }
  }

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

  const handleFetchStockNews = (symbol: Symbol) => {
    setSelectedSymbol(symbol);
    fetchStockNews(symbol.symbol);
  };

  const handleStockProfile = (symbol: Symbol) => {
    setSelectedSymbol(symbol);
    fetchStockProfile(symbol.symbol);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <Content style={{ padding: "16px", marginTop: 32 }}>
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
                <Button
                  onClick={() => handleFetchStockNews(symbol)}
                  style={{ marginTop: "8px", marginLeft: "8px" }}
                >
                  Stock News
                </Button>
                <Button
                  onClick={() => handleStockProfile(symbol)}
                  style={{ marginTop: "8px", marginLeft: "8px" }}
                >
                  Stock Profile
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
              <StockPrice stockDetails={stockDetails} />
            ) : (
              <Paragraph>No details available.</Paragraph>
            )}
          </Modal>
          <Modal
            title={`${selectedSymbol?.displaySymbol} News`}
            visible={isNewsModalVisible}
            onCancel={() => setIsNewsModalVisible(false)}
            footer={null}
            width={800}
          >
            {detailsLoading ? (
              <Loader />
            ) : newsData.length > 0 ? (
              newsData.map((news, index) => (
                <StockNews key={index} stockNews={news} />
              ))
            ) : (
              <Paragraph>No news available.</Paragraph>
            )}
          </Modal>
          <Modal
            title={`${selectedSymbol?.displaySymbol} Profile`}
            visible={isStockProfileModalVisible}
            onCancel={() => setIsStockProfileModalVisible(false)}
            footer={null}
            width={600}
          >
            {detailsLoading ? (
              <Loader />
            ) : stockProfile ? (
              <StockProfile stockProfile={stockProfile} />
            ) : (
              <Paragraph>No profile available.</Paragraph>
            )}
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default Symbols;

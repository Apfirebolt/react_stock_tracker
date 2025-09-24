import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import axiosInstance from "../plugins/interceptor";
import { symbolsAtom } from "../atoms";
import { Layout, Typography } from "antd";
import Loader from "../components/Loader";
import type { Symbol } from "../atoms";

const { Paragraph } = Typography;
const { Content } = Layout;

const Symbols: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("apple");
  const [symbols, setSymbols] = useAtom(symbolsAtom);
  const [loading, setLoading] = useState(true);

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
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [setSymbols, searchQuery]);

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
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a symbol..."
            style={{
              width: "300px",
              padding: "8px",
              marginBottom: "24px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ marginTop: "32px", fontStyle: "italic" }}>
            {symbols.length} symbols found.
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {symbols.map((symbol: Symbol) => (
              <div
                key={symbol.symbol}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <h3>{symbol.displaySymbol}</h3>
                <p>{symbol.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Symbols;

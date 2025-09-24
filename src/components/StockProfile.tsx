import React from "react";
import { Typography } from "antd";

const { Paragraph, Text } = Typography;

type StockProfile = {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
};

const StockProfile: React.FC<{ stockProfile: StockProfile }> = (props) => {
  const { stockProfile } = props;

  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: "24px",
        borderRadius: "8px",
        maxWidth: "500px",
      }}
    >
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Name:
        </Text>{" "}
        {stockProfile.name}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Industry:
        </Text>{" "}
        {stockProfile.finnhubIndustry}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Country:
        </Text>{" "}
        {stockProfile.country}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Exchange:
        </Text>{" "}
        {stockProfile.exchange}
      </Paragraph>
      <Paragraph style={{ marginBottom: "0" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Website:
        </Text>{" "}
        <a
          href={stockProfile.weburl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline", color: "#52c41a" }}
        >
          {stockProfile.weburl}
        </a>
      </Paragraph>
    </div>
  );
};

export default StockProfile;

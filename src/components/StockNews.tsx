import React from "react";
import { Typography } from "antd";

const { Paragraph, Text } = Typography;

type StockNews = {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
};

const StockNews: React.FC<{ stockNews: StockNews }> = (props) => {
  const { stockNews } = props;

  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: "24px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Headline:
        </Text>{" "}
        {stockNews.headline}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Source:
        </Text>{" "}
        {stockNews.source}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Summary:
        </Text>{" "}
        {stockNews.summary}
      </Paragraph>
      {stockNews.image && (
        <img
          src={stockNews.image}
          alt={stockNews.headline}
          style={{
            width: "100%",
            borderRadius: "4px",
            marginBottom: "8px",
          }}
        />
      )}
      <a href={stockNews.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default StockNews;

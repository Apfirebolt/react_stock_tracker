import React from "react";
import { Typography } from "antd";
import type { Recommendation } from "../atoms";

const { Paragraph, Text } = Typography;

const StockRecommendation: React.FC<{ recommendation: Recommendation }> = (props) => {
  const { recommendation } = props;

  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: "24px",
        borderRadius: "8px",
        marginTop: "16px",
      }}
    >
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Buy:
        </Text>{" "}
        {recommendation.buy}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Hold:
        </Text>{" "}
        {recommendation.hold}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Sell:
        </Text>{" "}
        {recommendation.sell}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Strong Buy:
        </Text>{" "}
        {recommendation.strongBuy}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Strong Sell:
        </Text>{" "}
        {recommendation.strongSell}
      </Paragraph>
      <Paragraph style={{ marginBottom: "12px" }}>
        <Text strong style={{ color: "#1890ff" }}>
          Period:
        </Text>{" "}
        {recommendation.period}
      </Paragraph>
    </div>
  );
};

export default StockRecommendation;

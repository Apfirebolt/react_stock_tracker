import React from "react";
import { Typography } from "antd";

const { Paragraph, Text } = Typography;

type StockDetails = {
  c: number; // current price
  pc: number; // previous close price
  o: number; // open price
  h: number; // high price
  l: number; // low price
};

const StockPrice: React.FC<{ stockDetails: StockDetails }> = (props) => {
  const { stockDetails } = props;

  return (
    <div
      style={{
        background: "#f0f2f5",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        maxWidth: "350px",
        margin: "0 auto",
      }}
    >
      <Typography.Title
        level={4}
        style={{ marginBottom: 16, textAlign: "center" }}
      >
        Stock Details
      </Typography.Title>
      <Paragraph>
        <Text strong style={{ color: "#1890ff" }}>
          Current Price:
        </Text>{" "}
        <Text style={{ fontWeight: 600, fontSize: 18 }}>${stockDetails.c}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong style={{ color: "#52c41a" }}>
          Previous Close:
        </Text>{" "}
        <Text>${stockDetails.pc}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong style={{ color: "#faad14" }}>
          Open:
        </Text>{" "}
        <Text>${stockDetails.o}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong style={{ color: "#f5222d" }}>
          High:
        </Text>{" "}
        <Text>${stockDetails.h}</Text>
      </Paragraph>
      <Paragraph>
        <Text strong style={{ color: "#722ed1" }}>
          Low:
        </Text>{" "}
        <Text>${stockDetails.l}</Text>
      </Paragraph>
    </div>
  );
};

export default StockPrice;

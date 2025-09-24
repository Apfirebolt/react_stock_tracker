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
  );
};

export default StockPrice;

import React from "react";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const About: React.FC = () => {

  return (
    <Layout>
      <Content style={{ padding: "16px", marginTop: 32 }}>
        <div
          className="site-layout-content"
          style={{ background: "#fff", padding: 24, minHeight: 380 }}
        >
          <Title level={2}>About Stock Tracker App</Title>
          <Paragraph>
            Stock Tracker App is a web application designed to bring the fascinating
            world of stock market to life. Our goal is to educate and entertain
            users by providing detailed information about various stocks,
            their history, and much more.
          </Paragraph>
          <Title level={3}>Tech Stack</Title>
        </div>
      </Content>
    </Layout>
  );
};

export default About;

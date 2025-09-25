import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const Home: React.FC = () => {

  return (
    <Layout>
      <Content style={{ padding: "16px", marginTop: 32 }}>
        <div
          className="site-layout-content"
          style={{ background: "#fff", padding: 24, minHeight: 380 }}
        >
          <p>
            Welcome to the Stock Tracker App! This application is designed to help you stay informed about the stock market by providing real-time stock prices, company information, and other relevant financial data. Use the navigation menu to explore different sections of the app and start tracking your favorite stocks today.
          </p>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;

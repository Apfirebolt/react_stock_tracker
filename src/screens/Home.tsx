import React, { useEffect } from "react";
import { Layout } from "antd";

const { Content } = Layout;

const Home: React.FC = () => {

  useEffect(() => {
    // read env variable VITE_API_URL and VITE_API_KEY
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    console.log("API URL:", apiUrl);
    console.log("API KEY:", apiKey);
  }, []);

  return (
    <Layout>
      <Content style={{ padding: "50px", marginTop: 64 }}>
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

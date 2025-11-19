import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { axiosInstance } from "../plugins/interceptor";
import { countriesAtom } from "../atoms";
import { Layout } from "antd";
import { Typography } from "antd";
import Loader from "../components/Loader";
import type { Country } from "../atoms";

const { Paragraph } = Typography;

const { Content } = Layout;

const Countries: React.FC = () => {
  const [countries, setCountries] = useAtom(countriesAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("/country");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [setCountries]);

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
            Welcome to the Countries page! Here you can find information about
            various countries, including their risk premiums, currency, and
            more.
          </Paragraph>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            {countries.map((country: Country) => (
              <div
                key={country.code2 || country.country}
                style={{
                  border: "1px solid #e8e8e8",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  background: "#fafafa",
                }}
              >
                <Typography.Title level={4}>{country.country}</Typography.Title>
                <Paragraph>
                  <strong>Currency:</strong> {country.currency || "N/A"}
                </Paragraph>
                <Paragraph>
                  <strong>Risk Premium:</strong>{" "}
                  {country.countryRiskPremium ?? "N/A"}
                </Paragraph>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Countries;

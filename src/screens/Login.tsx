import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Layout, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { axiosBackend } from "../plugins/interceptor";
import { authAtom } from "../store/auth";
import { useAtom } from "jotai";

const { Title } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useAtom(authAtom);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axiosBackend.post("auth/login", values);
      message.success({
        content: "Login successful!",
        duration: 2,
      });
      setAuthData({ user: response.data, isAuthenticated: true });
    } catch (error) {
      message.error("Login failed. Please check your credentials.", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Auth Data:", authData);

  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card style={{ width: 400, padding: 24 }}>
          <Title
            level={2}
            style={{
              textAlign: "center",
              background: "#f0f2f5",
              padding: "16px 0",
              borderRadius: "8px",
              marginBottom: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            Login
          </Title>
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters." },
              ]}
            >
              <Input.Password
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                Don't have an account? <a href="/register">Register</a>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;

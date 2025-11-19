import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Layout, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  RedEnvelopeOutlined,
} from "@ant-design/icons";
import { axiosBackend } from "../plugins/interceptor";
import { authAtom } from "../store/auth";
import { useAtom } from "jotai";

const { Title } = Typography;
const { Content } = Layout;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useAtom(authAtom);

  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      // Replace with your register API call
      const response = await axiosBackend.post("auth/register", values);
      message.success({
        content: "Registration successful!",
        duration: 2,
      });
      setAuthData({ user: response.data, isAuthenticated: true });
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            Register
          </Title>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
                { min: 3, message: "Username must be at least 3 characters." },
              ]}
            >
              <Input placeholder="Username" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email" prefix={<RedEnvelopeOutlined />} />
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
                Register
              </Button>
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                Already have an account? <a href="/login">Login</a>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Register;

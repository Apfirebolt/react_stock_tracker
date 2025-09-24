import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Layout, message } from "antd";

const { Title } = Typography;
const { Content } = Layout;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      // Replace with your register API call
      // await axiosInstance.post("/register", values);
      message.success("Registration successful!");
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
          <Title level={2} style={{ textAlign: "center" }}>
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
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters." },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Form,
  Space,
  Typography,
  notification,
} from "antd";
import axios from "axios";

const { Text } = Typography; // Destructure Text component from Typography

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await axios
      .get(
        `http://localhost:3000/users/authenticate?email=${email}&password=${password}`
      )
      .then((response) => {
        localStorage.setItem("userId", response.data);
        navigate("/");
      })
      .catch(() => {
        notification.error({
          message: "Error",
          description: "Invalid email or password.",
          placement: "topRight",
        });
      });
  };

  return (
    <div>
      <Card title="Login" style={{ width: "450px" }}>
        <Form
          name="login-form"
          onFinish={handleSubmit}
          initialValues={{ username: "", password: "" }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
              <Text
                onClick={() => navigate("/register")}
                style={{ cursor: "pointer", color: "#1890ff" }}
              >
                Don't have an account? Register
              </Text>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

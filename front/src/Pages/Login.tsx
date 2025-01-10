import React, { useState, useEffect } from "react";
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

const { Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/authenticate?email=${email}&password=${password}`
      );
      const userId = response.data;
      localStorage.setItem("userId", userId);

      // Recupera o estado da homepage do backend (se existir)
      try {
        const res = await axios.get(`http://localhost:3000/users/${userId}/homepage`);
        const savedTodos = res.data.todos;
        if (savedTodos) {
          localStorage.setItem("homepageTodos", JSON.stringify(savedTodos));
        }
        navigate("/");
      } catch {
        navigate("/"); // Continua mesmo que não tenha estado salvo
      }
    } catch {
      notification.error({
        message: "Error",
        description: "Invalid email or password.",
        placement: "topRight",
      });
    }
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

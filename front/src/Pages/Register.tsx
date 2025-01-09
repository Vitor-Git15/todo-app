import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Input,
  Button,
  Form,
  Space,
  Typography,
  notification,
} from "antd";

const { Text } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    let userAlreadyExists = false;

    await axios
      .get(`http://localhost:3000/users/email?email=${email}`)
      .then(() => {
        notification.error({
          message: "Error",
          description: "An account with this email already exists.",
          placement: "topRight",
        });

        userAlreadyExists = true;
      })
      .catch(() => {});

    if (userAlreadyExists) return;

    await axios
      .post("http://localhost:3000/users", {
        username: username,
        email: email,
        password: password,
      })
      .then(() => {
        notification.success({
          message: "User Successfully Created",
          description: "Your account has been created. You can now log in.",
          placement: "topRight",
        });

        navigate("/login");
      })
      .catch(() => {
        notification.error({
          message: "Error",
          description: "An error occurred while creating your account.",
          placement: "topRight",
        });
      });
  };

  return (
    <div>
      <Card title="Register" style={{ width: "450px" }}>
        <Form
          name="login-form"
          onFinish={handleSubmit}
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </Form.Item>

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

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
              <Text
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer", color: "#1890ff" }}
              >
                Already have an account? Log in
              </Text>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;

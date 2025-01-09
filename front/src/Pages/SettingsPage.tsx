import React, { useState } from "react";
import { Card, Switch, Space, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [darkTheme, setDarkTheme] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (checked: boolean) => {
    setDarkTheme(checked);
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
  };

  const handleSaveSettings = () => {
    console.log("Theme:", darkTheme ? "Dark" : "Light");
    console.log("Notifications:", notifications ? "Enabled" : "Disabled");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Card title="Settings" style={{ width: "450px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ marginBottom: "16px" }}>
            <Text strong>Dark Theme</Text>
            <Switch
              checked={darkTheme}
              onChange={handleThemeChange}
              style={{ marginLeft: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <Text strong>Enable Notifications</Text>
            <Switch
              checked={notifications}
              onChange={handleNotificationsChange}
              style={{ marginLeft: "10px" }}
            />
          </div>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Button type="primary" onClick={handleSaveSettings} block>
              Save Settings
            </Button>
            <Text
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", color: "#1890ff", textAlign: "center" }}
            >
              Back to Home
            </Text>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default SettingsPage;

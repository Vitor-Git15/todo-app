import React, { useState } from "react";
import { Layout, Menu, Typography, Dropdown, message } from "antd";
import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

const MenuBar = () => {
  const [username, setUsername] = useState("Guest");

  const handleLogout = () => {
    message.success("Logged out successfully");
    setUsername("Guest");
  };

  // Dropdown menu items
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ float: "right" }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="3" style={{ float: "right" }} disabled>
            <Dropdown overlay={menu} trigger={["click"]}>
              <button
                onClick={(e) => e.preventDefault()}
                style={{ background: "none", border: "none", color: "inherit" }}
              >
                <Text style={{ color: "white" }}>
                  <UserOutlined /> {username}
                </Text>
              </button>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default MenuBar;

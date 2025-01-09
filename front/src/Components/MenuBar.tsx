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
  const menuItems = [
    {
      key: "logout",
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo e nome TodoList */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`} // Certifique-se de que o arquivo está em `public/logo.png`
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Text style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>TodoList</Text>
        </div>

        {/* Menu no lado direito */}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "2",
              icon: <SettingOutlined />,
              label: <Link to="/settings">Settings</Link>,
            },
            {
              key: "3",
              style: { float: "right" },
              disabled: true,
              label: (
                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                  <button
                    onClick={(e) => e.preventDefault()}
                    style={{ background: "none", border: "none", color: "inherit" }}
                  >
                    <Text style={{ color: "white" }}>
                      <UserOutlined /> {username}
                    </Text>
                  </button>
                </Dropdown>
              ),
            },
          ]}
        />
      </Header>
    </Layout>
  );
};

export default MenuBar;

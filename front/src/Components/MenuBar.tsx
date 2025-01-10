import React, { useState } from "react";
import { Layout, Menu, Typography, Dropdown, message } from "antd";
import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

const MenuBar = () => {
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar se o usuário está logado
  const navigate = useNavigate(); // Hook para navegação

  const handleLogout = () => {
    message.success("Logged out successfully");
    setUsername("Guest");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    navigate("/login"); // Redireciona para a página de login
  };

  const handleSignUp = () => {
    navigate("/register"); // Redireciona para a página de registro
  };

  // Menu de dropdown baseado no estado de login
  const menuItems = isLoggedIn
    ? [
        {
          key: "profile",
          label: "Profile",
          // Coloque aqui a lógica de navegação ou exibição de informações do perfil
        },
        {
          key: "logout",
          label: "Logout",
          onClick: handleLogout,
        },
      ]
    : [
        {
          key: "login",
          label: "Sign In",
          onClick: handleLogin,
        },
        {
          key: "signup",
          label: "Sign Up",
          onClick: handleSignUp,
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

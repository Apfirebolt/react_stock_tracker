import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const menuItems = [
  { key: "1", label: "Home", path: "/" },
  { key: "2", label: "Countries", path: "/countries" },
  { key: "3", label: "Symbols", path: "/symbols" },
  { key: "4", label: "About", path: "/about" },
  { key: "5", label: "Login", path: "/login" },
  { key: "6", label: "Register", path: "/register" }
];

const AppHeader: React.FC = () => {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#006A67", // New background color
        padding: "1.5rem 2rem",
      }}
    >
      <Menu
        theme="light" // Changed theme to light
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{
          flex: 1,
          backgroundColor: "#006A67", // Match header background
          color: "white", // Text color
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} style={{ color: "white" }}>
            <Link to={item.path} style={{ color: "white" }}>
              {item.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      <div
        className="logo"
        style={{
          color: "white",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        Stock Tracker App
      </div>
    </Header>
  );
};

export default AppHeader;

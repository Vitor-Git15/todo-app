import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login.tsx";
import RegisterPage from "./Pages/Register.tsx";
import HomePage from "./Pages/Home.tsx";
import MenuBar from "./Components/ManuBar.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <MenuBar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 64px)",
            backgroundColor: "#f0f2f5",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

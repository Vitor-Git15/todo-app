import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login.tsx";
import RegisterPage from "./Pages/Register.tsx";
import HomePage from "./Pages/HomePage.tsx";
import MenuBar from "./Components/MenuBar.tsx";
import SettingsPage from "./Pages/SettingsPage.tsx";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <MenuBar key={location.pathname} />
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
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

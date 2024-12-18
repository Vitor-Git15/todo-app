import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './Pages/LoginPage.tsx';
import './App.css';
import RegisterPage from "./Pages/RegisterPage.tsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

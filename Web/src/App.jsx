import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ChuongtrinhPage from './pages/ChuongtrinhPage/Chuongtrinh';
import Chatbot from './components/Chatbot/Chatbot';
import Admin from './pages/AdminPage/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/programs" element={<ChuongtrinhPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;

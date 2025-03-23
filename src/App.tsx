import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/login.tsx';
import { Home } from './components/home.tsx';
import { LoginPanel } from './components/login-panel.tsx';
import { AdminPanel } from './components/admin-panel.tsx';
import { AdminDockOffers } from './components/admin-dock-offers.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/login/:userType" element={<LoginPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/docks" element={<AdminDockOffers />} />
      </Routes>
    </Router>
  );
};

export default App;
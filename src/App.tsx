import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.tsx';
import Home from './pages/home.tsx';
import LoginPanel from './pages/login-panel.tsx';
import AdminPanel from './pages/admin-panel.tsx';
import AdminDockOffers from './pages/admin-dock-offers.tsx';
import DockDetails from './pages/admin-dock-details.tsx';
import AdminBookings from './pages/admin-bookings.tsx';
import BookingDetails from './pages/admin-booking-details.tsx';
import AdminUsers from './pages/admin-users.tsx';
import UserDetails from './pages/admin-user-details.tsx';
import AdminGuides from './pages/admin-guides.tsx';
import GuideDetails from './pages/admin-guide-details.tsx';
import EdtiorPanel from './pages/editor-panel.tsx';

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
        <Route path="/admin/dock/:dockId" element={<DockDetails />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/booking/:bookingId" element={<BookingDetails />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/user/:userId" element={<UserDetails />} />
        <Route path="/admin/guides" element={<AdminGuides />} />
        <Route path="admin/guide/:guideId" element={<GuideDetails />} />
        <Route path="/editor" element={<EdtiorPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
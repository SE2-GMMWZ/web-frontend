import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import PublicRoute from "./components/PublicRoute.tsx";

import Login from "./pages/login.tsx";
import LoginPanel from "./pages/login-panel.tsx";
import Home from "./pages/home.tsx";
import AdminPanel from "./pages/admin-panel.tsx";
import AdminDockOffers from "./pages/admin-dock-offers.tsx";
import DockDetails from "./pages/admin-dock-details.tsx";
import AdminBookings from "./pages/admin-bookings.tsx";
import BookingDetails from "./pages/admin-booking-details.tsx";
import AdminUsers from "./pages/admin-users.tsx";
import UserDetails from "./pages/admin-user-details.tsx";
import AdminGuides from "./pages/admin-guides.tsx";
import GuideDetails from "./pages/admin-guide-details.tsx";

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public (only when logged out) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login/:userType"
          element={
            <PublicRoute>
              <LoginPanel />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        {/* Protected Admin routes */}
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminPanel />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/docks"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminDockOffers />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/dock/:dockId"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <DockDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminBookings />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/booking/:bookingId"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <BookingDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminUsers />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/user/:userId"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <UserDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/guides"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminGuides />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/guide/:guideId"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <GuideDetails />
            </RequireAuth>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;

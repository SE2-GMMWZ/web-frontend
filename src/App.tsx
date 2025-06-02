import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./providers/AuthProvider.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import PublicRoute from "./components/PublicRoute.tsx";

import Welcome from "./pages/welcome.tsx";
import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import AdminPanel from "./pages/admin-panel.tsx";
import AdminDockOffers from "./pages/lists/admin-dock-offers.tsx";
import DockDetails from "./pages/details/admin-dock-details.tsx";
import AdminBookings from "./pages/lists/admin-bookings.tsx";
import BookingDetails from "./pages/details/admin-booking-details.tsx";
import AdminUsers from "./pages/lists/admin-users.tsx";
import UserDetails from "./pages/details/admin-user-details.tsx";
import AdminGuides from "./pages/lists/admin-guides.tsx";
import GuideDetails from "./pages/details/admin-guide-details.tsx";
import EditorPanel from "./pages/editor-panel.tsx";
import AddGuideView from "./pages/editor-add-guide.tsx";

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Routes>
        {/* Public (only when logged out) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Welcome />
            </PublicRoute>
          }
        />
        <Route
          path="/login/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register/"
          element={
            <PublicRoute>
              <Register />
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
        <Route
          path="/editor"
          element={
            <RequireAuth allowedRoles={["admin", "editor"]}>
              <EditorPanel />
            </RequireAuth>
          }
        />
        <Route
          path="/editor/add-guide"
          element={
            <RequireAuth allowedRoles={["admin", "editor"]}>
              <AddGuideView />
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

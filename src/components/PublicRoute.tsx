import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.tsx";

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (user) {
    const dest =
      user.role === "admin"
        ? "/admin"
        : user.role === "editor"
          ? "/editor"
          : "/home";

    console.log(dest);
    return <Navigate to={dest} state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;

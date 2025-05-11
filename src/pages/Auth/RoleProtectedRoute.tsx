// src/routes/RoleProtectedRoute.tsx
import Cookies from "js-cookie";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, role, isLoading } = useContext(AuthContext);
  const location = useLocation();
  const token = Cookies.get("core");

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (!token || !user) {
    toast.warning("You must be logged in");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("role", role);

    toast.error("Access denied");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;

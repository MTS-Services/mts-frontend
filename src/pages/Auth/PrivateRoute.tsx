// src/routes/PrivateRoute.tsx
import Cookies from "js-cookie";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  const token = Cookies.get("core");
  if (!token) {
    toast.warning("You don't have the access on this page");
    router.replace("/");
    return;
  }

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (!user) {
    // Redirect to login and keep current location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

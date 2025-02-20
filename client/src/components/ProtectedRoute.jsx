import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isLoggedIn = false;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

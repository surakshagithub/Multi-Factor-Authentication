import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

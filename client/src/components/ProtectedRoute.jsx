import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useSession();
  const is2FAVerified = localStorage.getItem("is2FAVerified") === "true";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (
    !is2FAVerified &&
    isLoggedIn &&
    window.location.pathname !== "/verify-2fa"
  ) {
    return <Navigate to="/verify-2fa" replace />;
  }

  return <Outlet />;
};

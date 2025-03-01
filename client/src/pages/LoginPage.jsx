import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useSession } from "../context/SessionContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useSession();

  const handleLoginSuccessful = (userData) => {
    login(userData);
    if (!userData.isMfaActive) {
      navigate("/setup-2fa");
    } else {
      navigate("/verify-2fa");
    }
  };
  return (
    <>
      <LoginForm onLoginSuccess={handleLoginSuccessful} />
    </>
  );
};

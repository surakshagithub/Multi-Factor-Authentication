import { useNavigate } from "react-router-dom";
import { TwoFAVerification } from "../components/TwoFAVerification";
export const Verify2FA = () => {
  const navigate = useNavigate();

  const handleVerification = async (data) => {
    if (data) {
      localStorage.setItem("is2FAVerified", "true"); // Store verification status
      navigate("/");
    }
  };

  const handle2FAReset = async (data) => {
    if (data) {
      localStorage.clear("is2FAVerified");
      navigate("/setup-2fa");
    }
  };
  return (
    <TwoFAVerification
      onVerifySuccess={handleVerification}
      onResetSuccess={handle2FAReset}
    />
  );
};

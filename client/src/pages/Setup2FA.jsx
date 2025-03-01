import { useNavigate } from "react-router-dom";
import { TwoFASetup } from "../components/TwoFASetup";

export const Setup2FA = () => {
  const navigate = useNavigate();
  const onSetupComplete = () => {
    navigate("/verify-2fa");
  };

  return <TwoFASetup onSetupComplete={onSetupComplete} />;
};

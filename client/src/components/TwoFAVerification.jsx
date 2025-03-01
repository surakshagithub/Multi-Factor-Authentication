/* eslint-disable react/prop-types */
import { useState } from "react";
import { reset2FA, verify2FA } from "../service/authApi";

export const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verify2FA(otp);
      onVerifySuccess(data);
    } catch (error) {
      console.log(error);
      setOtp("");
      setError("Invalid TOTP. Please try again.");
    }
  };

  const handle2FAReset = async () => {
    try {
      const { data } = await reset2FA();
      onResetSuccess(data);
      onResetSuccess(data);
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again later.");
    }
  };
  return (
    <form
      onSubmit={handleTokenVerification}
      className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">Validate 2FA</h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-600 text-lg font-light">
        Please enter 6-digit Time based OTP to verify your account
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label className="text-gray-600 text-sm">TOTP</label>
          <input
            type="text"
            label="TOTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            placeholder="Enter your TOTP"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-2"
        >
          Verify TOTP
        </button>
        <button
          type="button"
          className="w-full bg-red-500 text-white py-2 rounded-md"
          onClick={handle2FAReset}
        >
          Reset 2FA
        </button>
      </div>
    </form>
  );
};

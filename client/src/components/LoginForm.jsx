import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser, register } from "../service/authApi";

export const LoginForm = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  console.log("isRegistered", isRegistered);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await register(userName, password);
      setIsRegistered(false);
      setMessage(data.message);
      setUserName("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(userName, password);
      setMessage(data.message);
      setUserName("");
      setPassword("");
      setError("");
    } catch (error) {
      console.log(error);
      setError("Invalid Login Credentials. Please try again later.");
    }
  };

  const handleRegisterToggle = () => {
    setIsRegistered(!isRegistered);
    setError("");
    setMessage("");
  };
  return (
    <>
      <form
        onSubmit={isRegistered ? handleRegister : handleLogin}
        className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto"
      >
        <div className="pt-6">
          <h2 className="text-3xl text-center font-extralight">
            {isRegistered ? "Create Account" : "Login"}
          </h2>
        </div>
        <hr className="text-gray-200 mt-6 mb-6" />
        <p className="text-center text-gray-600 text-lg font-light">
          {isRegistered
            ? "Welcome! Please create an account."
            : "We are happy to see you again!"}
        </p>
        <div className="p-6">
          <div className="mb-4">
            <label className="text-gray-600 text-sm">UserName</label>
            <input
              type="text"
              label="UserName"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Enter your Password"
              required
            />
          </div>
          {isRegistered && (
            <div className="mb-4">
              <label className="text-gray-600 text-sm">Confirm Password</label>
              <input
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your Password again"
                required
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            {isRegistered ? "Create Account" : "Login"}
          </button>
          <div>
            <p className="pt-4 text-center text-gray-600 text-sm">
              {isRegistered
                ? "Already have an account ? "
                : "Don't have an account ? "}
              <Link onClick={() => handleRegisterToggle()}>
                {isRegistered ? "Login" : "Create Account"}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.clear("is2FAVerified");

      sessionStorage.removeItem("user");
    }
  };
  return (
    <SessionContext.Provider
      value={{ isLoggedIn, user, login, logout, isLoading }}
    >
      {children}
    </SessionContext.Provider>
  );
};

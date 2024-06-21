// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user was logged in before refreshing the page
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    // Implement your login logic here, e.g., setting isLoggedIn to true
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Store login state in localStorage
  };

  const logout = () => {
    // Implement your logout logic here, e.g., clearing session
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Remove login state from localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

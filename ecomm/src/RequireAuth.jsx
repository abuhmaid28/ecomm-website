// RequireAuth.js
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;

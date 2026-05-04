import { Navigate } from "react-router-dom";
import { getAuthToken } from "../api/auth";

export default function ProtectedRoute({ children }) {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function PublicRoute({ children }) {
  const token = getAuthToken();
  return token ? <Navigate to="/" replace /> : children;
}
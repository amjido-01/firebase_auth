import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";

export const ProtectedRoutes = () => {
  const { currentUser, loading } = useAuth();
  return loading ? (
    <h1>loading...</h1>
  ) : currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

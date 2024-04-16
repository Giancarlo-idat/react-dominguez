import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : <Navigate to="/auth/login" />;
};

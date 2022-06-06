import { Navigate, Outlet } from "react-router";

export const PrivateRoute = ({ authed, path }) => {
  const link = path ? '/login/redirect/' + path : '/login';
  return authed ? <Outlet /> : <Navigate to={link} replace />;
};
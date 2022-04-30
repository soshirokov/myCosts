import { Navigate, Outlet } from "react-router";

export const PrivateRoute = ({ authed, path }) => {
  return authed ? <Outlet /> : <Navigate to={'/login/' + path} replace />;
};
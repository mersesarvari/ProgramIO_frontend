import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./App";
const LoggedInRoutes = () => {
  // Define location type explicitly
  const isAuth = isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const LoggedOutRoutes = () => {
  // Define location type explicitly
  const isAuth = isAuthenticated();
  return !isAuth ? <Outlet /> : <Navigate to="/home" />;
};

export { LoggedInRoutes, LoggedOutRoutes };

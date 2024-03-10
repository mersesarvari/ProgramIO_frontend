import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./App";
const PrivateRoutes = () => {
  // Define location type explicitly
  const isAuth = isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

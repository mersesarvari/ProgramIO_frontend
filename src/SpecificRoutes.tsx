import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/auth/authSlice";

const LoggedInRoutes = () => {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = () => {
    console.log("User data:", user);
    if (user !== null) {
      return true;
    } else return false;
  };
  // Define location type explicitly
  const isAuth = isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const LoggedOutRoutes = () => {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = () => {
    console.log("User data:", user);
    if (user !== null) {
      console.log("Authenticated:", true);
      return true;
    } else return false;
  };
  // Define location type explicitly
  const isAuth = isAuthenticated();
  return !isAuth ? <Outlet /> : <Navigate to="/home" />;
};

export { LoggedInRoutes, LoggedOutRoutes };

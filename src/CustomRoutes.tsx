import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/auth/authSlice";
import Cookies from "js-cookie";

const LoggedInRoutes = () => {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = () => {
    const userCookieString = Cookies.get("user");
    let userCookie = null;
    if (userCookieString) {
      userCookie = JSON.parse(userCookieString);
    }
    if (user !== null || userCookie !== null) {
      console.log("Authenticated:", true);
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
    const userCookieString = Cookies.get("user");
    let userCookie = null;
    if (userCookieString) {
      userCookie = JSON.parse(userCookieString);
    }
    if (user !== null || userCookie !== null) {
      console.log("Authenticated:", true);
      return true;
    } else return false;
  };
  // Define location type explicitly
  const isAuth = isAuthenticated();
  return !isAuth ? <Outlet /> : <Navigate to="/home" />;
};

export { LoggedInRoutes, LoggedOutRoutes };

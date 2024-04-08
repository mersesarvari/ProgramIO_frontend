import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./components/navigation/Navbar";
import Adminbar from "./components/navigation/Adminbar";
import { GetUser } from "./features/CookieManager";

const LoggedInRoutes = () => {
  const user = GetUser();
  const isAuthenticated = () => {
    if (user) {
      return true;
    }
    return false;
  };
  // Define location type explicitly
  const isAuth = isAuthenticated();
  return isAuth ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const LoggedOutRoutes = () => {
  const user = GetUser();
  const isAuthenticated = () => {
    if (user) {
      return true;
    }
    return false;
  };
  // Define location type explicitly
  const isAuth = isAuthenticated();
  return !isAuth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/home" />
  );
};

const AdminRoutes = () => {
  //const user = useSelector(selectCurrentUser);
  const isAuthenticatedAdmin = () => {
    const userCookieString = Cookies.get("user");
    let userCookie = null;
    if (userCookieString) {
      userCookie = JSON.parse(userCookieString);
      console.log("userCookie: ", userCookie);
      if (userCookie.role === "admin") {
        return true;
      }
    } else if (user !== null && user.role === "admin") {
      return true;
    }
    console.log("Admin function is not reachable...");
    return false;
  };
  // Define location type explicitly
  const isAuth = isAuthenticatedAdmin();
  return isAuth ? (
    <>
      <Navbar />
      <div className="flex h-full">
        <Adminbar />
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export { LoggedInRoutes, LoggedOutRoutes, AdminRoutes };

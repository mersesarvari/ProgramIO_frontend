import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import Cookies from "js-cookie";
import PrivateRoutes from "./PrivateRoute";

export const isAuthenticated = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  if (accessToken && refreshToken) {
    return true;
  } else return false;
};

export const Logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  console.log("[Client]:", "Succesfully logged out from the application");
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Protected routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;

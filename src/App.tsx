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
import { LoggedInRoutes, LoggedOutRoutes } from "./SpecificRoutes";
import AdminPage from "./pages/AdminPage";
import { DarkThemeToggle, Flowbite, Sidebar } from "flowbite-react";

export const isAuthenticated = () => {
  const user = Cookies.get("user");
  if (user) {
    return true;
  } else return false;
};

export const Logout = () => {
  console.log("[Client]:", "Succesfully logged out from the application");
  Cookies.remove("user");
};

const App = () => {
  return (
    <div id="App" className="flex flex-col h-screen">
      <Router>
        <Routes>
          {/* Protected routes */}
          <Route element={<LoggedInRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/side" element={<Sidebar />} />
          </Route>
          <Route element={<LoggedOutRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

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
import { AdminRoutes, LoggedInRoutes, LoggedOutRoutes } from "./CustomRoutes";
import Sidebar from "./components/navigation/Sidebar";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";
import CreateEvent from "./pages/event/CreateEvent";

export const Logout = () => {
  console.log("[Client]:", "Succesfully logged out from the application");
  Cookies.remove("user");
};

const App = () => {
  return (
    <div id="App">
      <Router>
        <Routes>
          {/* Protected routes */}
          <Route element={<LoggedInRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-event" element={<CreateEvent />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/side" element={<Sidebar />} />
          </Route>
          <Route element={<LoggedOutRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<DashboardAdminPage />} />
            <Route path="/admin/users" element={<UsersAdminPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

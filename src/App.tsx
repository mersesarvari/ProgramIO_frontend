import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import { AdminRoutes, LoggedInRoutes, LoggedOutRoutes } from "./CustomRoutes";
import { APIProvider } from "@vis.gl/react-google-maps";

const EventSinglePage = React.lazy(
  () => import("./pages/event/EventSinglePage")
);
const NewEventPage = React.lazy(() => import("./pages/event/NewEventPage"));
const UsersAdminPage = React.lazy(() => import("./pages/admin/UsersAdminPage"));
const DashboardAdminPage = React.lazy(
  () => import("./pages/admin/DashboardAdminPage")
);
const Sidebar = React.lazy(() => import("./pages/admin/DashboardAdminPage"));
const RegisterPage = React.lazy(
  () => import("./pages/authentication/RegisterPage")
);
const LoginPage = React.lazy(() => import("./pages/authentication/LoginPage"));
const Home = React.lazy(() => import("./pages/Home"));

export const Logout = () => {
  console.log("[Client]:", "Succesfully logged out from the application");
  Cookies.remove("user");
};

const App = () => {
  return (
    <div id="App" className="bg-gray-100 p-0">
      <React.Suspense>
        <APIProvider apiKey="AIzaSyBIgQHkge1pDUTdHp_HFzb2QKLiw_8UTG0">
          <Router>
            <Routes>
              {/* Protected routes */}
              <Route element={<LoggedInRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/new-event" element={<NewEventPage />} />
                <Route path="/event/:id" element={<EventSinglePage />} />
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
        </APIProvider>
      </React.Suspense>
    </div>
  );
};

export default App;

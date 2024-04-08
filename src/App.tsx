import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminRoutes, LoggedInRoutes, LoggedOutRoutes } from "./CustomRoutes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { APIProvider } from "@vis.gl/react-google-maps";
const EventSinglePage = React.lazy(
  () => import("./pages/event/EventSinglePage")
);
const NewEventPage = React.lazy(() => import("./pages/event/NewEventPage"));
const EventEditor = React.lazy(() => import("./pages/event/EventEditor"));
const EventManagerPage = React.lazy(
  () => import("./pages/event/EventManagerPage")
);
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

export const queryClient = new QueryClient();
const App = () => {
  return (
    <div id="App" className="bg-gray-50 p-0 min-h-[100vh]">
      <ToastContainer position="top-center" />
      <QueryClientProvider client={queryClient}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
          <React.Suspense>
            <Router>
              <Routes>
                {/* Protected routes */}
                <Route element={<LoggedInRoutes />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/new-event" element={<NewEventPage />} />
                  <Route
                    path="/event/:eventId/editor"
                    element={<EventEditor />}
                  />
                  <Route
                    path="/event/dashboard"
                    element={<EventManagerPage />}
                  />
                  <Route path="/event/:eventId" element={<EventSinglePage />} />
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
          </React.Suspense>
        </APIProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
};

export default App;

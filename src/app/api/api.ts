import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handling error 430
    if (error.response.status === 430 && !originalRequest._retry) {
      console.log(
        "[Error] : Refresh token was not valid, trying to access a new one..."
      );

      originalRequest._retry = true;
      try {
        const refreshResponse = await api.post("/auth/token", {});
        return api(originalRequest);
      } catch (refreshError) {
        console.log(
          "[Client]: Access token invalid or expired, reauthenticating..."
        );
        return Promise.reject(refreshError);
      }
    }
    // Handling error 431
    if (error.response.status === 431 && !originalRequest._retry) {
      try {
        console.log(
          "[Client]: Refresh token invalid or expired, reauthenticating..."
        );
        //Logging out.
      } catch (refreshError) {
        console.log("[Client]: Unexpected error occured, logging out...");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;

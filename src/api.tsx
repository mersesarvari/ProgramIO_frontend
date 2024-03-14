import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://localhost:5000",
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

    // Handling error 499
    if (error.response.status === 499 && !originalRequest._retry) {
      console.log(
        "[Error] : Refresh token was not valid, trying to access a new one..."
      );

      originalRequest._retry = true;
      try {
        console.log("499Error", error.response);
        const refreshResponse = await api.post("/auth/token", {});

        console.log(refreshResponse);
        return api(originalRequest);
      } catch (refreshError) {
        console.log("[Client]: removed invalid cookie tokens");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

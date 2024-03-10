import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
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
      originalRequest._retry = true;
      try {
        console.log("499Error", error.response);
        // When receiving a 499 error ---> asking for a new accessToken
        const refreshResponse = await api.post(
          "/auth/token",
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("refreshToken")}`,
            },
          }
        );
        console.log(refreshResponse);

        const newAccessToken = refreshResponse.data.accessToken;

        // Update the access token in cookies
        await Cookies.remove("accessToken");
        await Cookies.set("accessToken", newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.message);
        // Redirect to login or handle appropriately
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

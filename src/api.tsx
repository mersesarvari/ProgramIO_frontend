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
      console.log(
        "[Error] : Refresh token was not valid, trying to access a new one..."
      );

      originalRequest._retry = true;
      try {
        console.log("499Error", error.response);
        if (Cookies.get("refreshToken") === null) {
          console.log(
            "[Console] : No refresh token found, removing accessToken"
          );
          Cookies.remove("accessToken");
        }
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
        console.log("[Client]: Token refresh succeeded:", newAccessToken);
        // Update the access token in cookies
        await Cookies.remove("accessToken");
        await Cookies.set("accessToken", newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("[Client] Token refresh failed:", refreshError.message);
        //Removing refresh and access tokens
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        console.log("[Client]: removed invalid cookie tokens");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

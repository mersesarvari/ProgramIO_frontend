import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const baseURL = "http://localhost:5000/";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //If access token token was invalid
  if (result?.error?.status === 430) {
    //Send the refresh token to get new access token
    const refreshResult = await baseQuery("/auth/token", api, extraOptions);

    if (refreshResult?.data) {
      const user = await api.getState().auth.user;
      //Store the new token
      //api.dispatch(setCredentials({ ...refreshResult.data, user }));
      api.dispatch(setCredentials({ ...user }));
      //retry the original query with new accccess token
      result = await baseQuery(args, api, extraOptions);
    } else {
      //api.dispatch(logout({}));
      toast.error("Something went wrong. Logging out...!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  //If refresh token was invalid
  if (result?.error?.status === 431) {
    toast.error(
      "Your login session was invalid. The system will log you out!",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    //removin login data when refresh token is not valid
    Cookies.remove("user");
    api.dispatch(logout({}));
  }
  //Default server error handling
  if (result?.error?.status === 400 || result?.error?.status === 404) {
    toast.error("Something really went wrong. Please try again later!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(result?.error);
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

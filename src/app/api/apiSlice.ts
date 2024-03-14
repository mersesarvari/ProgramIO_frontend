import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";
import Cookies from "js-cookie";

const baseURL = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //If access token token was invalid
  if (result?.error?.status === 430) {
    console.log("sending request token");
    //Send the refresh token to get new access token
    const refreshResult = await baseQuery("/auth/token", api, extraOptions);
    console.log("refreshResult", refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      //Store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      //retry the original query with new accccess token
      result = await baseQuery(args, api, extraOptions);
    } else {
      //api.dispatch(logout({}));
      console.error("[baseQueryWithReauth] : something really went wrong");
    }
  }
  //If refresh token was invalid
  if (result?.error?.status === 431) {
    console.error(
      "[baseQueryWithReauth] : Refresh token was invalid... Logging out..."
    );
    Cookies.remove("user");
    api.dispatch(logout({}));
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

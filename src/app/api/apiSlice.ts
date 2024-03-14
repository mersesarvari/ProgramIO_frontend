import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../../features/auth/authSlice";

const baseURL = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  /* prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }, */
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //If needs to send the refreshToken
  if (result?.error?.status === 499) {
    console.log("sending request token");
    //Send the refresh token to get new access token
    const refreshResult = await baseQuery("/auth/token", api, extraOptions);
    console.log("refreshResult", refreshResult);

    if (refreshResults?.data) {
      const user = api.getState().auth.user;
      //Store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      //retry the original query with new accccess token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

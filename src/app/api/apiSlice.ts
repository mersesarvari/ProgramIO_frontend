import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseURL = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //If needs to send the refreshToken
  if (result?.error?.status === 499) {
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
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

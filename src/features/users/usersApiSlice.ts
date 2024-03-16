import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
    }),
    getOneUser: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: `user`,
        method: "POST",
        body: user,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `user/${user.id}`,
        method: "PATCH",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetOneUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;

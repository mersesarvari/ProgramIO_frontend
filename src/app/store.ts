import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import addressReducer from "./slices/addressSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

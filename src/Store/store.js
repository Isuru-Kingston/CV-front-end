import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import seekerSlice from "./Slices/seekerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    seeker: seekerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

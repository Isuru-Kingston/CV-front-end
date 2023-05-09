import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import seekerSlice from "./Slices/seekerSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    user: userReducer,
    seeker: seekerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

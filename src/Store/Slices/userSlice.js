import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  userRegistration as userRegistrationService,
  userLogin as userLoginService,
} from "../../Services/userService";

const initialState = {
  userRegistration: {
    status: "idle",
    isRegistered: "false",
  },
  userLogin: {
    status: "idle",
    token: "",
    userName: "",
    userId: "",
    role: "",
  },
};

export const userRegistration = createAsyncThunk(
  "user/register",
  async (request) => {
    const { data, showToast, toastMsg } = request;
    const response = await userRegistrationService(data);

    const registerResponse = response?.data;

    return { registerResponse, showToast, toastMsg };
  }
);

export const userLogin = createAsyncThunk("user/login", async (request) => {
  const { data, showToast, toastMsg } = request;
  let loginResponse = {};
  try {
    const response = await userLoginService(data);
    loginResponse = response?.data;
  } catch (error) {
  } finally {
    return { loginResponse, showToast, toastMsg };
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.userRegistration.status = "loading";
        state.userRegistration.isRegistered = "false";
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.userRegistration.status = "idle";
        state.userRegistration.isRegistered = "true";
        if (action.payload.registerResponse.success) {
          action.payload.showToast(
            "success",
            "Success",
            action.payload.toastMsg.success
          );
        } else {
          action.payload.showToast(
            "error",
            "Error",
            action.payload.toastMsg.error
          );
        }
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.userRegistration.status = "failed";
        state.userRegistration.isRegistered = "false";
        action.payload.showToast(
          "error",
          "Error",
          action.payload.toastMsg.error
        );
      })
      .addCase(userLogin.pending, (state) => {
        state.userLogin.status = "loading";
        state.userLogin.token = "";
        state.userLogin.userName = "";
        state.userLogin.userId = "";
        state.userLogin.role = "";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userLogin.status = "idle";
        state.userLogin.token = action.payload.loginResponse?.data?.jwttoken;
        state.userLogin.userName = action.payload.loginResponse?.data?.userName;
        state.userLogin.userId = action.payload.loginResponse?.data?.userId;
        state.userLogin.role = action.payload.loginResponse?.data?.role;

        if (action.payload.loginResponse.success) {
          action.payload.showToast(
            "success",
            "Success",
            action.payload.toastMsg.success
          );
        } else {
          action.payload.showToast(
            "error",
            "Error",
            action.payload.toastMsg.error
          );
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userLogin.status = "failed";
        state.userLogin.token = "";
        state.userLogin.userName = "";
        state.userLogin.userId = "";
        state.userLogin.role = "";
        action.payload.showToast(
          "error",
          "Error",
          action.payload.toastMsg.error
        );
      });
  },
});

// Action creators are generated for each case reducer function
export const selectuserRegistration = (state) => state.userRegistration;
export const selectuser = (state) => state.userLogin;

export default userSlice.reducer;

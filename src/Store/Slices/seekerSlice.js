import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getSeeker as getSeekerService } from "../../Services/seekerService";

const initialState = {
  seeker: {
    status: "idle",
    user: {
      id: null,
      firstName: null,
      lastName: null,
      username: null,
      birthDay: null,
      mobileNumber: null,
      gender: null,
      address: null,
      email: null,
      role: null,
    },
    headline: null,
    about: null,
    industry: null,
    eductionLevel: null,
    skills: [],
    experiences: [],
    academicQualifications: [],
    professionalQualifications: [],
  },
};

export const getSeeker = createAsyncThunk("seeker/get", async (request) => {
  const { token, userId, showToast, toastMsg } = request;
  const response = await getSeekerService(token, userId);

  const seekerResponse = response?.data;

  return { seekerResponse, showToast, toastMsg };
});

export const seekerSlice = createSlice({
  name: "seeker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSeeker.pending, (state) => {
        state.seeker.status = "loading";
        state.seeker.user = {
          id: null,
          firstName: null,
          lastName: null,
          username: null,
          birthDay: null,
          mobileNumber: null,
          gender: null,
          address: null,
          email: null,
          role: null,
        };
        state.seeker.headline = null;
        state.seeker.about = null;
        state.seeker.industry = null;
        state.seeker.eductionLevel = null;
        state.seeker.skills = [];
        state.seeker.experiences = [];
        state.seeker.academicQualifications = [];
        state.seeker.professionalQualifications = [];
      })
      .addCase(getSeeker.fulfilled, (state, action) => {
        state.seeker.status = "idle";
        if (action.payload.getSeeker.success) {
          state.seeker.user = {
            id: action.payload.seekerResponse?.data?.user?.id,
            firstName: action.payload.seekerResponse?.data?.user?.firstName,
            lastName: action.payload.seekerResponse?.data?.user?.lastName,
            username: action.payload.seekerResponse?.data?.user?.username,
            birthDay: action.payload.seekerResponse?.data?.user?.birthDay,
            mobileNumber:
              action.payload.seekerResponse?.data?.user?.mobileNumber,
            gender: action.payload.seekerResponse?.data?.user?.gender,
            address: action.payload.seekerResponse?.data?.user?.address,
            email: action.payload.seekerResponse?.data?.user?.email,
            role: action.payload.seekerResponse?.data?.user?.role,
          };
          state.seeker.headline = action.payload.seekerResponse?.data?.headline;
          state.seeker.about = action.payload.seekerResponse?.data?.about;
          state.seeker.industry = action.payload.seekerResponse?.data?.industry;
          state.seeker.eductionLevel =
            action.payload.seekerResponse?.data?.eductionLevel;
          state.seeker.skills = action.payload.seekerResponse?.data?.skills;
          state.seeker.experiences =
            action.payload.seekerResponse?.data?.experiences;
          state.seeker.academicQualifications =
            action.payload.seekerResponse?.data?.academicQualifications;
          state.seeker.professionalQualifications =
            action.payload.seekerResponse?.data?.professionalQualifications;

          action.payload.showToast(
            "success",
            "Success",
            action.payload.toastMsg.success
          );
        } else {
          state.seeker.status = "failed";
          state.seeker.user = {
            id: null,
            firstName: null,
            lastName: null,
            username: null,
            birthDay: null,
            mobileNumber: null,
            gender: null,
            address: null,
            email: null,
            role: null,
          };
          state.seeker.headline = null;
          state.seeker.about = null;
          state.seeker.industry = null;
          state.seeker.eductionLevel = null;
          state.seeker.skills = [];
          state.seeker.experiences = [];
          state.seeker.academicQualifications = [];
          state.seeker.professionalQualifications = [];
          action.payload.showToast(
            "error",
            "Error",
            action.payload.toastMsg.error
          );
        }
      })
      .addCase(getSeeker.rejected, (state, action) => {
        state.seeker.status = "failed";
        state.seeker.user = {
          id: null,
          firstName: null,
          lastName: null,
          username: null,
          birthDay: null,
          mobileNumber: null,
          gender: null,
          address: null,
          email: null,
          role: null,
        };
        state.seeker.headline = null;
        state.seeker.about = null;
        state.seeker.industry = null;
        state.seeker.eductionLevel = null;
        state.seeker.skills = [];
        state.seeker.experiences = [];
        state.seeker.academicQualifications = [];
        state.seeker.professionalQualifications = [];
        action.payload.showToast(
          "error",
          "Error",
          action.payload.toastMsg.error
        );
      });
  },
});

// Action creators are generated for each case reducer function

export const selectSeeker = (state) => state.seeker;

export default seekerSlice.reducer;

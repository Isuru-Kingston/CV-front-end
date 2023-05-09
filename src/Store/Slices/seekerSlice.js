import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getSeeker as getSeekerService,
  updateSeeker as updateSeekerService,
  searchSeekers as searchSeekersService,
} from "../../Services/seekerService";

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
    educationLevel: null,
    gcsePasses: null,
    yearsOfExperience: null,
    skills: [],
    experiences: [],
    academicQualifications: [],
    professionalQualifications: [],
  },
  seekerUpdate: {
    status: "idle",
  },
  seekers: {
    status: "idle",
    data: [],
  },
  profileImage: {
    status: "idle",
    data: "",
  },
};

export const getSeeker = createAsyncThunk("seeker/get", async (request) => {
  const { token, userId, showToast, toastMsg } = request;
  let seekerResponse = {};
  try {
    const response = await getSeekerService(token, userId);
    seekerResponse = response?.data;
  } catch (error) {
    console.log(error);
  } finally {
    return { seekerResponse, showToast, toastMsg };
  }
});

export const updateSeeker = createAsyncThunk(
  "seeker/update",
  async (request) => {
    const { token, userId, data, showToast, toastMsg } = request;
    let seekerResponse = {};
    try {
      const response = await updateSeekerService(token, userId, data);
      seekerResponse = response?.data;
    } catch (error) {
      console.log(error);
    } finally {
      return { seekerResponse, showToast, toastMsg };
    }
  }
);

export const searchSeekers = createAsyncThunk(
  "seeker/search",
  async (request) => {
    const { token, data, showToast, toastMsg } = request;
    let seekerResponse = {};
    try {
      const response = await searchSeekersService(token, data);
      seekerResponse = response?.data;
    } catch (error) {
      console.log(error);
    } finally {
      return { seekerResponse, showToast, toastMsg };
    }
  }
);

export const seekerSlice = createSlice({
  name: "seeker",
  initialState,
  reducers: {
    onUploadImageStart: (state) => {
      state.profileImage.status = "loading";
    },
    onUploadImageSuccess: (state, action) => {
      state.profileImage.status = "idle";
      state.profileImage.data = action.payload;
    },
    onUploadImageFail: (state) => {
      state.profileImage.status = "failed";
    },
  },
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
        state.seeker.educationLevel = null;
        state.seeker.gcsePasses = 0;
        state.seeker.yearsOfExperience = 0;
        state.seeker.skills = [];
        state.seeker.experiences = [];
        state.seeker.academicQualifications = [];
        state.seeker.professionalQualifications = [];
      })
      .addCase(getSeeker.fulfilled, (state, action) => {
        state.seeker.status = "idle";
        if (action.payload.seekerResponse.success) {
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
          state.seeker.educationLevel =
            action.payload.seekerResponse?.data?.educationLevel;
          state.seeker.gcsePasses =
            action.payload.seekerResponse?.data?.gcsePasses;
          state.seeker.yearsOfExperience =
            action.payload.seekerResponse?.data?.yearsOfExperience;
          state.seeker.skills = action.payload.seekerResponse?.data?.skills
            ? action.payload.seekerResponse?.data?.skills
            : [];
          state.seeker.experiences = action.payload.seekerResponse?.data
            ?.experiences
            ? action.payload.seekerResponse?.data?.experiences
            : [];
          state.seeker.academicQualifications = action.payload.seekerResponse
            ?.data?.academicQualifications
            ? action.payload.seekerResponse?.data?.academicQualifications
            : [];
          state.seeker.professionalQualifications = action.payload
            .seekerResponse?.data?.professionalQualifications
            ? action.payload.seekerResponse?.data?.professionalQualifications
            : [];

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
          state.seeker.educationLevel = null;
          state.seeker.gcsePasses = 0;
          state.seeker.yearsOfExperience = 0;
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
        state.seeker.educationLevel = null;
        state.seeker.gcsePasses = 0;
        state.seeker.yearsOfExperience = 0;
        state.seeker.skills = [];
        state.seeker.experiences = [];
        state.seeker.academicQualifications = [];
        state.seeker.professionalQualifications = [];
        action.payload.showToast(
          "error",
          "Error",
          action.payload.toastMsg.error
        );
      })
      .addCase(updateSeeker.pending, (state) => {
        state.seekerUpdate.status = "loading";
      })
      .addCase(updateSeeker.fulfilled, (state, action) => {
        state.seekerUpdate.status = "idle";
        if (action.payload.seekerResponse.success) {
          action.payload.showToast(
            "success",
            "Success",
            action.payload.toastMsg.success
          );
        } else {
          state.seekerUpdate.status = "failed";
          action.payload.showToast(
            "error",
            "Error",
            action.payload.toastMsg.error
          );
        }
      })
      .addCase(updateSeeker.rejected, (state, action) => {
        state.seekerUpdate.status = "failed";
        action.payload.showToast(
          "error",
          "Error",
          action.payload.toastMsg.error
        );
      })
      .addCase(searchSeekers.pending, (state, action) => {
        state.seekers.status = "loading";
        state.seekers.data = [];
      })
      .addCase(searchSeekers.fulfilled, (state, action) => {
        if (action.payload.seekerResponse.success) {
          const seekers = [];
          action.payload.seekerResponse?.result?.list.map((seeker) => {
            const experiences = [];

            seeker?.experiences.map((experience) => {
              experiences.push({
                id: experience?.id,
                organization: experience?.organization,
                position: experience?.position,
                from: experience?.start
                  ? new Date(experience?.start)
                  : new Date(),
                to: experience?.to ? new Date(experience?.to) : new Date(),
              });
            });

            const academicQualifications = [];

            seeker?.academicQualifications.map((qualification) => {
              academicQualifications.push({
                id: qualification?.id,
                institute: qualification?.institute,
                certificate: qualification?.certificate,
                certificateType: qualification?.certificateType,
                from: qualification?.start
                  ? new Date(qualification?.start)
                  : new Date(),
                to: qualification?.to
                  ? new Date(qualification?.to)
                  : new Date(),
              });
            });

            const professionalQualifications = [];

            seeker?.professionalQualifications.map((qualification) => {
              professionalQualifications.push({
                id: qualification?.id,
                institute: qualification?.institute,
                certificate: qualification?.certificate,
                certificateType: qualification?.certificateType,
                from: qualification?.start
                  ? new Date(qualification?.start)
                  : new Date(),
                to: qualification?.to
                  ? new Date(qualification?.to)
                  : new Date(),
              });
            });

            const newSeeker = {
              firstName: seeker?.user?.firstName,
              lastName: seeker?.user?.lastName,
              birthDay: seeker?.user?.birthDay
                ? new Date(seeker?.user?.birthDay)
                : new Date(),
              gender: seeker?.user?.gender,
              mobileNumber: seeker?.user?.mobileNumber,
              email: seeker?.user?.email,
              address: seeker?.user?.address,
              industry: seeker?.industry,
              yearsOfExperience: seeker?.yearsOfExperience,
              educationLevel: seeker?.educationLevel,
              gcsePasses: seeker?.gcsePasses,
              skills: seeker?.skills.length > 0 ? seeker?.skills : [],
              experiences,
              academicQualifications,
              professionalQualifications,
            };

            seekers.push(newSeeker);
          });

          state.seekers.status = "idle";
          state.seekers.data = seekers;
          action.payload.showToast(
            "success",
            "Success",
            action.payload.toastMsg.success
          );
        } else {
          state.seekers.status = "failed";
          state.seekers.data = [];
          action.payload.showToast(
            "error",
            "Error",
            action.payload.toastMsg.error
          );
        }
      })
      .addCase(searchSeekers.rejected, (state, action) => {
        state.seekerUpdate.status = "failed";
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
export const { onUploadImageFail, onUploadImageStart, onUploadImageSuccess } =
  seekerSlice.actions;

export default seekerSlice.reducer;

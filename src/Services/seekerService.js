import axios from "axios";

import {
  getSeeker as getSeekerEndPoint,
  updateSeeker as updateSeekerEndPoint,
  searchSeekers as searchSeekersEndPoint,
} from "../Config/endPoints";

const getSeeker = async (token, userId) => {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_BASE_URL}${getSeekerEndPoint}${userId}`,
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateSeeker = async (token, userId, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.REACT_APP_BASE_URL}${updateSeekerEndPoint}${userId}`,
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
};

const searchSeekers = async (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_BASE_URL}${searchSeekersEndPoint}`,
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
};

const uploadProfileImage = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "job-seeker");

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
    },
  };

  const result = await axios.post(
    `${process.env.REACT_APP_IMAGE_URL}`,
    formData,
    config
  );

  const url = result?.data?.secure_url
    ? result?.data?.secure_url
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU";

  return url;
};

export { getSeeker, updateSeeker, searchSeekers, uploadProfileImage };

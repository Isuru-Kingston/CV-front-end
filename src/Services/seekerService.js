import axios from "axios";

import { getSeeker as getSeekerEndPoint } from "../Config/endPoints";

const getSeeker = async (token, userId) => {
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_BASE_URL}${getSeekerEndPoint}${userId}`,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { getSeeker };

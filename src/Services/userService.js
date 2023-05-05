import axios from "axios";

import {
  userRegistration as userRegistrationEndPoint,
  userLogin as userLoginEndPoint,
} from "../Config/endPoints";

const userRegistration = async (data) => {
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_BASE_URL}${userRegistrationEndPoint}`,
    data,
  });
};

const userLogin = async (data) => {
  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_BASE_URL}${userLoginEndPoint}`,
    data,
  });
};

export { userRegistration, userLogin };

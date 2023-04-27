import React, { Suspense } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import SeekerProfile from "../Screen/SeekerProfile";

const Login = React.lazy(() => import("../Screen/Login"));
const Register = React.lazy(() => import("../Screen/Register"));

const AuthNavigation = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/seeker-profile" element={<SeekerProfile />} />
      </Routes>
    </Suspense>
  );
};

export default AuthNavigation;

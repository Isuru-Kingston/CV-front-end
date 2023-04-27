import React, { Suspense } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router";

const Login = React.lazy(() => import("../Screen/Login"));
const Register = React.lazy(() => import("../Screen/Register"));

const UnAuthNavigation = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default UnAuthNavigation;

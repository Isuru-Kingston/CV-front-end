import React, { Suspense, useState, useEffect } from "react";
import { Routes, Navigate } from "react-router-dom";
import { Route } from "react-router";
import { useSelector } from "react-redux";

const SeekerProfile = React.lazy(() => import("../Screen/SeekerProfile"));
const AgentProfile = React.lazy(() => import("../Screen/AgentProfile"));

const AuthNavigation = () => {
  const user = useSelector((state) => state.user.userLogin);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user?.role == "AGENT" ? (
        <Routes>
          <Route path="/agent-profile" element={<AgentProfile />} />
          <Route path="*" element={<Navigate to="/agent-profile" />} />
        </Routes>
      ) : user?.role == "JOB_SEEKER" ? (
        <Routes>
          <Route path="/seeker-profile" element={<SeekerProfile />} />
          <Route path="*" element={<Navigate to="/seeker-profile" />} />
        </Routes>
      ) : null}
    </Suspense>
  );
};

export default AuthNavigation;

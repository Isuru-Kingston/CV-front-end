import React, { useState } from "react";
import { useSelector } from "react-redux";

import UnAuthLayout from "./UnAuthLayout";
import AuthLayout from "./AuthLayout";

function Layout() {
  const user = useSelector((state) => state.user.userLogin);

  return (
    <div>
      {user?.token && user?.userName && user?.userId && user?.role ? (
        <AuthLayout />
      ) : (
        <UnAuthLayout />
      )}
    </div>
  );
}

export default Layout;

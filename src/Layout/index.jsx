import React, { useState } from "react";
import UnAuthLayout from "./UnAuthLayout";
import AuthLayout from "./AuthLayout";

function Layout() {
  const [isAuth, setAuth] = useState(true);
  return <div>{isAuth ? <AuthLayout /> : <UnAuthLayout />}</div>;
}

export default Layout;

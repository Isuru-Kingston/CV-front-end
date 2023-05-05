import React from "react";
import { AuthNavigation } from "../Navigations";
import Header from "../Features/Header";

const AuthLayout = () => {
  return (
    <div>
      <div className="sticky top-0 z-5">
        <Header />
      </div>
      <div>
        <AuthNavigation />
      </div>
    </div>
  );
};

export default AuthLayout;

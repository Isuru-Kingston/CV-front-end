import React, { useState } from "react";
import LoginPanel from "../../Features/LoginPanel";
import backgroundImage from "../../Imges/backgroung.jpg";

const Login = () => {
  return (
    <div className="h-screen">
      <div
        className=" flex bg-cover bg-no-repeat bg-center  border-round h-screen w-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="col-6"></div>
        <div className="col-5">
          <LoginPanel />
        </div>
      </div>
    </div>
  );
};

export default Login;

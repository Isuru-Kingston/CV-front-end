import React from "react";
import RegisterPanel from "../../Features/RegisterPanel";
import backgroundImage from "../../Imges/backgroung.jpg";

const Register = () => {
  return (
    <div
      className=" flex bg-cover bg-no-repeat bg-center bg-blue-500 border-round h-full w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="col-6"></div>
      <div className="col-5">
        <RegisterPanel />
      </div>
    </div>
  );
};

export default Register;

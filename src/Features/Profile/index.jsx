import React from "react";
import Avatart from "../../Components/Avatar";

function Profile({ image, name, jobSector, jobTitle, onClickView }) {
  return (
    <div className="grid shadow-4 m-1">
      <div className="col-3">
        <Avatart image={image} size="xlarge" shape="circle" />
      </div>
      <div className="col-8">
        <div className="font-bold">{name}</div>
        <div className="text-base">{jobSector}</div>
        <div className="text-base">{jobTitle}</div>
      </div>
      <div
        className="col-1 flex justify-content-center align-items-center"
        onClick={onClickView}
      >
        <i className="pi pi-window-maximize" style={{ fontSize: "1rem" }}></i>
      </div>
    </div>
  );
}

export default Profile;

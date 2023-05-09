import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Avatart from "../../Components/Avatar";
import ProfileView from "../ProfileView";

function Profile({ image, data }) {
  const { t: translate } = useTranslation();

  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="grid shadow-4 m-1 justify-content-center align-items-center">
        <div className="col-2">
          <Avatart image={image} size="xlarge" shape="circle" />
        </div>
        <div className="col-3">
          <div className="font-bold">{`${data?.firstName} ${data?.lastName}`}</div>
        </div>
        <div className="col-3">
          <div className="text-base">{data?.industry}</div>
        </div>
        <div className="col-3">
          <div className="text-base">{data?.educationLevel}</div>
        </div>
        <div
          className="col-1 flex justify-content-center align-items-center"
          onClick={() => setVisible(true)}
        >
          <i className="pi pi-window-maximize" style={{ fontSize: "1rem" }}></i>
        </div>
      </div>
      <ProfileView
        header={translate("profile_view_panel.profile_header")}
        visible={visible}
        style={{ width: "80%" }}
        onHide={() => setVisible(false)}
        data={data}
      />
    </>
  );
}

export default Profile;

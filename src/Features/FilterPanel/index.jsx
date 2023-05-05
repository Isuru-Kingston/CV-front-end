import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ProfileView from "../ProfileView";
import Profile from "../Profile";

function FilterPanel() {
  const { t: translate } = useTranslation();
  const [visible, setVisible] = useState(false);

  const items = [
    {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDay: new Date(),
      gender: "",
      mobileNumber: "",
      email: "",
      address: "",
      industry: "",
      experiences: [
        {
          organization: "",
          position: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      academicQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      professionalQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
    },
    {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDay: new Date(),
      gender: "",
      mobileNumber: "",
      email: "",
      address: "",
      industry: "",
      experiences: [
        {
          organization: "",
          position: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      academicQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      professionalQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
    },
    {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDay: new Date(),
      gender: "",
      mobileNumber: "",
      email: "",
      address: "",
      industry: "",
      experiences: [
        {
          organization: "",
          position: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      academicQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      professionalQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
    },
    {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDay: new Date(),
      gender: "",
      mobileNumber: "",
      email: "",
      address: "",
      industry: "",
      experiences: [
        {
          organization: "",
          position: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      academicQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      professionalQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
    },
    {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDay: new Date(),
      gender: "",
      mobileNumber: "",
      email: "",
      address: "",
      industry: "",
      experiences: [
        {
          organization: "",
          position: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      academicQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
      professionalQualifications: [
        {
          institute: "",
          certificate: "",
          certificateType: "",
          from: new Date(),
          to: new Date(),
        },
      ],
    },
  ];

  const rows = items.reduce((acc, curr, i) => {
    const index = Math.floor(i / 3);
    if (!acc[index]) {
      acc[index] = [];
    }
    acc[index].push(curr);
    return acc;
  }, []);

  return (
    <div className=" m-4">
      <div className="grid p-4">
        <div className="col text-2xl font-bold">
          {translate("filter_panel.filter_header")}
        </div>
      </div>
      {/* ----------------------------------------Profile-------------------------------------------- */}
      <div className="grid pl-4 pr-4">
        <div className="col text-lg font-bold">
          {translate("filter_panel.candidate_header")}
        </div>
      </div>

      {rows.map((row, i) => (
        <div key={i} className="grid pl-4 pr-4">
          {row.map((item) => (
            <div key={item} className="col-4">
              <Profile
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&usqp=CAU"
                name="Isuru"
                jobSector="Information Technology"
                jobTitle="Software Engineer"
                onClickView={() => setVisible(true)}
              />
              <ProfileView
                header={translate("profile_view_panel.profile_header")}
                visible={visible}
                style={{ width: "80%" }}
                onHide={() => setVisible(false)}
                data={item}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FilterPanel;

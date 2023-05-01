import React from "react";
import { render } from "@testing-library/react";
import ProfileView from "../ProfileView";

describe("ProfileEdit", () => {
  test("renders ProfileView component", () => {
    const data = {
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
    };
    render(<ProfileView data={data} />);
  });
});

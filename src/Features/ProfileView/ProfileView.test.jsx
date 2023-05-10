import React from "react";
import { render } from "@testing-library/react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";

import ProfileView from "../ProfileView";

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: {
        // your translations
      },
    },
  },
});

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
    render(
      <I18nextProvider i18n={i18n}>
        <ProfileView data={data} />
      </I18nextProvider>
    );
  });
});

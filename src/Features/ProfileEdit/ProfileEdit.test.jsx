import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";

import { store } from "../../Store/store";
import ProfileEdit from "../ProfileEdit";

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
  test("renders ProfileEdit component", () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <ProfileEdit />
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      );
    });
  });
});

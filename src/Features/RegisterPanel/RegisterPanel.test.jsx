import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";

import { store } from "../../Store/store";
import RegisterPanel from "../RegisterPanel";

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

describe("RegisterPanel", () => {
  test("renders RegisterPanel component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <RegisterPanel />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    );
  });
});

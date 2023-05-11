import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";

import { store } from "../../Store/store";
import AgentProfile from "../AgentProfile";

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

describe("AgentProfile", () => {
  test("renders AgentProfile component", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AgentProfile />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    );
    const agentProfile = getByTestId("filter-panel");
    expect(agentProfile).toBeInTheDocument();
    expect(agentProfile).toHaveAttribute("data-testid", "filter-panel");
  });
});

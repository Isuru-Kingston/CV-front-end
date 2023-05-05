import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../../Store/store";
import HeaderPanel from "../Header";

describe("LoginPanel", () => {
  test("renders LoginPanel component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <HeaderPanel />
        </Provider>
      </BrowserRouter>
    );
  });
});

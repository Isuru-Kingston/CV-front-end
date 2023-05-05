import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../../Store/store";
import RegisterPanel from "../RegisterPanel";

describe("RegisterPanel", () => {
  test("renders RegisterPanel component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RegisterPanel />
        </Provider>
      </BrowserRouter>
    );
  });
});

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../../Store/store";
import Profile from "../Profile";

describe("Profile", () => {
  test("renders Profile component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Profile />
        </Provider>
      </BrowserRouter>
    );
  });
});

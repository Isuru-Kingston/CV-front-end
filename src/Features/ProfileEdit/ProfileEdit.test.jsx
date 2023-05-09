import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../../Store/store";
import ProfileEdit from "../ProfileEdit";

describe("ProfileEdit", () => {
  test("renders ProfileEdit component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProfileEdit />
        </Provider>
      </BrowserRouter>
    );
  });
});

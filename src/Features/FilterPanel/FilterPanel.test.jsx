import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../../Store/store";
import FilterPanel from "../FilterPanel";

describe("Profile", () => {
  test("renders Profile component", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <FilterPanel />
        </Provider>
      </BrowserRouter>
    );
  });
});

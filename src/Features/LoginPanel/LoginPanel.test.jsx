import React from "react";
import { render } from "@testing-library/react";
import LoginPanel from "../LoginPanel";

describe("LoginPanel", () => {
  test("renders LoginPanel component", () => {
    render(<LoginPanel />);
  });
});

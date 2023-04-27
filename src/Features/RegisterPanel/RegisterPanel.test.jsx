import React from "react";
import { render } from "@testing-library/react";
import RegisterPanel from "../RegisterPanel";

describe("RegisterPanel", () => {
  test("renders RegisterPanel component", () => {
    render(<RegisterPanel />);
  });
});

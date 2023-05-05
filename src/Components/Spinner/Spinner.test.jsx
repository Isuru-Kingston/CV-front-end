import React from "react";
import { render } from "@testing-library/react";
import Spinner from "../Spinner";

describe("Spinner component", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<Spinner />);
    expect(getByTestId("spinner")).toBeInTheDocument();
  });
});

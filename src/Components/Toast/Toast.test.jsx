import React from "react";
import { render } from "@testing-library/react";
import Toast from "../Toast";

describe("Toast", () => {
  test("renders without errors", () => {
    const ref = React.createRef();
    render(<Toast ref={ref} />);
    expect(ref.current).toBeDefined();
  });
});

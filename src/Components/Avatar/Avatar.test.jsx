import React from "react";
import { render } from "@testing-library/react";
import Avatar from "../Avatar";

describe("Avatar", () => {
  it("renders with the correct props", () => {
    const image = "https://example.com/avatar.png";
    const size = "xlarge";
    const shape = "circle";
    const { getByTestId } = render(<Avatar image={image} />);
    const avatar = getByTestId("avatar");

    expect(avatar).toBeInTheDocument();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders Menubar component with provided props", () => {
    const end = jest.fn(() => <div>Some component as end</div>);
    const { getByRole } = render(<Header end={end} />);
    const menubarElement = getByRole("menubar");

    expect(menubarElement).toBeInTheDocument();
    expect(end).toHaveBeenCalled();
  });
});

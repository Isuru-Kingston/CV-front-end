import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button />);
  });

  it("renders the label prop", () => {
    const label = "Click me";
    const { getByText } = render(<Button label={label} />);
    expect(getByText(label)).toBeInTheDocument();
  });

  it("calls the onClick prop when the button is clicked", () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick} />);
    fireEvent.click(getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("passes other props to the button", () => {
    const id = "test";
    const { getByRole } = render(<Button id={id} />);
    expect(getByRole("button")).toHaveAttribute("id", id);
  });
});

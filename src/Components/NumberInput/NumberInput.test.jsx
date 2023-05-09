import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NumberInput from "../NumberInput";

describe("NumberInput", () => {
  const onChangeValue = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders label correctly", () => {
    const { getByText } = render(<NumberInput label="Test Label" />);
    expect(getByText("Test Label")).toBeInTheDocument();
  });

  it("renders error message correctly", () => {
    const { getByText } = render(<NumberInput errormsg="Test Error" isError />);
    expect(getByText("Test Error")).toBeInTheDocument();
  });

  it("renders other props correctly", () => {
    const { getByRole } = render(
      <NumberInput placeholder="Test Placeholder" />
    );
    const input = getByRole("spinbutton");
    expect(input).toHaveAttribute("placeholder", "Test Placeholder");
  });
});

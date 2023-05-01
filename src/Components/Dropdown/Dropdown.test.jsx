import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dropdown from "../Dropdown";

describe("Dropdown", () => {
  const label = "Select a color:";
  const errormsg = "Please select a color";
  const options = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
  ];

  it("renders the label and the dropdown", () => {
    const value = "red";
    const onChangeValue = jest.fn();
    const { getByTestId, queryByText } = render(
      <Dropdown
        label={label}
        value={value}
        options={options}
        onChangeValue={onChangeValue}
      />
    );

    const dropdown = getByTestId("dropdown");
    const errorMessageElement = queryByText(errormsg);

    expect(dropdown).toBeInTheDocument();

    expect(errorMessageElement).not.toBeInTheDocument();
  });

  it("renders the label, the dropdown, and the error message", () => {
    const value = null;
    const onChangeValue = jest.fn();
    const { getByTestId, getByText } = render(
      <Dropdown
        label={label}
        errormsg={errormsg}
        isError={true}
        value={value}
        options={options}
        onChangeValue={onChangeValue}
      />
    );

    const dropdown = getByTestId("dropdown");
    const errorMessageElement = getByText(errormsg);

    expect(dropdown).toBeInTheDocument();
    expect(dropdown).not.toHaveAttribute("value");

    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveTextContent(errormsg);
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextInput from "../TextInput";

describe("TextInput", () => {
  const label = "Name";
  const errormsg = "Please enter a valid name";
  const value = "John Doe";
  const onChangeValue = jest.fn();
  const isError = true;

  it("renders without crashing", () => {
    render(
      <TextInput
        label={label}
        errormsg={errormsg}
        isError={isError}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
  });

  it("renders the label prop", () => {
    const { getByLabelText } = render(
      <TextInput
        label={label}
        errormsg={errormsg}
        isError={isError}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
    expect(getByLabelText(label)).toBeInTheDocument();
  });

  it("renders the value prop", () => {
    const { getByDisplayValue } = render(
      <TextInput
        label={label}
        errormsg={errormsg}
        isError={isError}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
    expect(getByDisplayValue(value)).toBeInTheDocument();
  });

  it("renders the error message when the isError prop is true", () => {
    const { getByText } = render(
      <TextInput
        label={label}
        errormsg={errormsg}
        isError={isError}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
    expect(getByText(errormsg)).toBeInTheDocument();
  });

  it("does not render the error message when the isError prop is false", () => {
    const { queryByText } = render(
      <TextInput
        label={label}
        errormsg={errormsg}
        isError={false}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
    expect(queryByText(errormsg)).not.toBeInTheDocument();
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PasswordInput from "../PasswordInput";

describe("PasswordInput", () => {
  const label = "Password";
  const errormsg = "Password is required";
  const value = "123456";
  const onChangeValue = jest.fn();
  const setIsError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { getByLabelText } = render(
      <PasswordInput
        label={label}
        errormsg={errormsg}
        isError={false}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
  });

  it("renders the label prop", () => {
    const { getByText } = render(
      <PasswordInput
        label={label}
        errormsg={errormsg}
        isError={false}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
    expect(getByText(label)).toBeInTheDocument();
  });

  it("renders the value prop", () => {
    const { getByDisplayValue } = render(
      <PasswordInput
        label={label}
        errormsg={errormsg}
        isError={false}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
    expect(getByDisplayValue(value)).toBeInTheDocument();
  });

  it("renders the error message when the isError prop is true", () => {
    const { getByText } = render(
      <PasswordInput
        label={label}
        errormsg={errormsg}
        isError={true}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
    expect(getByText(errormsg)).toBeInTheDocument();
  });

  it("does not render the error message when the isError prop is false", () => {
    const { queryByText } = render(
      <PasswordInput
        label={label}
        errormsg={errormsg}
        isError={false}
        value={value}
        onChangeValue={onChangeValue}
      />
    );
    expect(queryByText(errormsg)).toBeNull();
  });
});

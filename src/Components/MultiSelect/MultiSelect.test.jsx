import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MultiSelect from "../MultiSelect";

describe("MultiSelect", () => {
  const label = "Select fruits";
  const errormsg = "Please select at least one fruit";
  const options = ["Apple", "Banana", "Orange"];
  const onChangeValue = jest.fn();

  it("renders label", () => {
    const { getByLabelText, getByText } = render(
      <MultiSelect
        label={label}
        options={options}
        onChangeValue={onChangeValue}
        value={[]}
      />
    );

    expect(getByText(label)).toBeInTheDocument();
  });

  it("renders error message when isError prop is true", () => {
    const { getByText } = render(
      <MultiSelect
        label={label}
        options={options}
        onChangeValue={onChangeValue}
        value={[]}
        isError={true}
        errormsg={errormsg}
      />
    );

    expect(getByText(errormsg)).toBeInTheDocument();
  });
});

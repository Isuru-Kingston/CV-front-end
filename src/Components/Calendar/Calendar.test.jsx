import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Calendar from "../Calendar";

describe("Calendar", () => {
  it("renders with the correct props", () => {
    const label = "Date:";
    const errormsg = "Invalid date";
    const isError = true;
    const value = new Date();
    const onChangeValue = jest.fn();
    const { getByTestId, getByText } = render(
      <Calendar
        label={label}
        errormsg={errormsg}
        isError={isError}
        value={value}
        onChangeValue={onChangeValue}
      />
    );

    const calendar = getByTestId("calendar");
    const labelElement = getByText(label);
    const errorMessageElement = getByText(errormsg);

    expect(calendar).toBeInTheDocument();
    expect(calendar).toHaveAttribute("data-testid", "calendar");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(label);

    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveTextContent(errormsg);
  });
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dialog from "../Dialog";

describe("Dialog component", () => {
  test("displays the correct header text", () => {
    const headerText = "Test Header";
    const { getByText } = render(<Dialog header={headerText} visible />);
    const headerElement = getByText(headerText);
    expect(headerElement).toBeInTheDocument();
  });

  test("displays the correct content", () => {
    const contentText = "Test Content";
    const { getByText } = render(
      <Dialog visible>
        <p>{contentText}</p>
      </Dialog>
    );
    const contentElement = getByText(contentText);
    expect(contentElement).toBeInTheDocument();
  });

  test("hides the dialog when the 'onHide' callback is called", () => {
    const onHideMock = jest.fn();
    const { getByTestId } = render(
      <Dialog visible onHide={onHideMock}>
        <p>Test Content</p>
      </Dialog>
    );
    const dialogElement = getByTestId("dialog-component");
    fireEvent.click(dialogElement.querySelector(".p-dialog-header-close"));
    expect(onHideMock).toHaveBeenCalled();
  });
});

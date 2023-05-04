import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Alert from "../Alert";

describe("Alert component", () => {
  const accept = jest.fn();
  const reject = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component with the correct message and header", () => {
    const { getByText } = render(
      <Alert
        visible={true}
        onHide={() => {}}
        message="This is a test message"
        header="Test Header"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
      />
    );
    expect(getByText("Test Header")).toBeInTheDocument();
    expect(getByText("This is a test message")).toBeInTheDocument();
  });

  it("should call the accept function when accept button is clicked", () => {
    const { getByText } = render(
      <Alert
        visible={true}
        onHide={() => {}}
        message="This is a test message"
        header="Test Header"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
      />
    );
    const acceptButton = getByText("Yes");
    fireEvent.click(acceptButton);
    expect(accept).toHaveBeenCalled();
  });

  it("should call the reject function when reject button is clicked", () => {
    const { getByText } = render(
      <Alert
        visible={true}
        onHide={() => {}}
        message="This is a test message"
        header="Test Header"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
      />
    );
    const rejectButton = getByText("No");
    fireEvent.click(rejectButton);
    expect(reject).toHaveBeenCalled();
  });
});

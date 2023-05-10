import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FileUpload from "../FileUpload";

describe("FileUpload", () => {
  const label = "Upload file";
  const errormsg = "Please select a valid file";
  const onChangeValue = jest.fn();

  it("renders label correctly", () => {
    render(<FileUpload label={label} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    render(<FileUpload errormsg={errormsg} isError />);
    expect(screen.getByText(errormsg)).toBeInTheDocument();
  });

  it("calls onChangeValue prop when file is selected", () => {
    render(<FileUpload onChangeValue={onChangeValue} label={label} />);
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { files: [file] } });
    expect(onChangeValue).toHaveBeenCalledWith(expect.any(Object));
  });
});

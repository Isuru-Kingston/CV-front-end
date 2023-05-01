import React from "react";
import { render } from "@testing-library/react";
import FileUpload from "../FileUpload";

describe("FileUpload component", () => {
  test("renders without crashing", () => {
    const { getByTestId } = render(<FileUpload />);
    const fileUploadComponent = getByTestId("file-upload-component");
    expect(fileUploadComponent).toBeInTheDocument();
  });

  test("accepts multiple files", () => {
    const { getByTestId } = render(<FileUpload multiple />);
    const fileUploadComponent = getByTestId("file-upload-component");
  });
});

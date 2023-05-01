import React from "react";
import { render } from "@testing-library/react";
import Image from "../Image";

describe("Image component", () => {
  test("renders without crashing", () => {
    const { getByTestId } = render(<Image />);
    const imageComponent = getByTestId("image-component");
    expect(imageComponent).toBeInTheDocument();
  });

  test("displays the correct image source", () => {
    const imageUrl = "https://via.placeholder.com/150";
    const { getByAltText } = render(<Image src={imageUrl} alt="Test Image" />);
    const imageElement = getByAltText("Test Image");
    expect(imageElement).toHaveAttribute("src", imageUrl);
  });
});

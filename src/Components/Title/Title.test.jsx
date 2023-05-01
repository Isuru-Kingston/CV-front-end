import React from "react";
import { render } from "@testing-library/react";
import Title from "../Title";

describe("Title component", () => {
  it("renders title and subtitle correctly", () => {
    const titleText = "Title";
    const subTitleText = "Subtitle";
    const { getByText } = render(
      <Title Title={titleText} subTitle={subTitleText} />
    );
    const titleElement = getByText(titleText);
    const subTitleElement = getByText(subTitleText);
    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeInTheDocument();
  });

  it("renders without subtitle", () => {
    const titleText = "Title";
    const { getByText, queryByText } = render(<Title Title={titleText} />);
    const titleElement = getByText(titleText);
    const subTitleElement = queryByText("Subtitle");
    expect(titleElement).toBeInTheDocument();
    expect(subTitleElement).toBeNull();
  });
});

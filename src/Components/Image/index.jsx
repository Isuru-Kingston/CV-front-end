import React from "react";
import { Image as PRImage } from "primereact/image";

export default function Image({ ...otherProps }) {
  return <PRImage {...otherProps} data-testid="image-component" />;
}

import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

function Spinner({ ...otherProps }) {
  return (
    <ProgressSpinner
      {...otherProps}
      style={{ width: "50px", height: "50px" }}
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
      data-testid="spinner"
    />
  );
}

export default Spinner;

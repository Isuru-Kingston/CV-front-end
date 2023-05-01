import React from "react";
import { Button as PRButton } from "primereact/button";

export default function Button({ ...otherProps }) {
  return (
    <div className="card flex justify-content-center">
      <PRButton className="w-full" {...otherProps} />
    </div>
  );
}

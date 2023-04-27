import React from "react";
import { Button as PRButton } from "primereact/button";

export default function Button({ label, onClick, ...otherProps }) {
  return (
    <div className="card flex justify-content-center">
      <PRButton
        label={label}
        onClick={onClick}
        className="w-full"
        {...otherProps}
      />
    </div>
  );
}

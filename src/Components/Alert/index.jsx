import React from "react";
import { ConfirmDialog } from "primereact/confirmdialog";

function Alert({ ...otherProps }) {
  return <ConfirmDialog {...otherProps} />;
}

export default Alert;

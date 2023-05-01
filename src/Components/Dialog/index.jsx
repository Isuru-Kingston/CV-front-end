import React from "react";
import { Dialog as PRDialog } from "primereact/dialog";

function Dialog({ children, ...otheProps }) {
  return (
    <PRDialog data-testid="dialog-component" {...otheProps}>
      {children}
    </PRDialog>
  );
}

export default Dialog;

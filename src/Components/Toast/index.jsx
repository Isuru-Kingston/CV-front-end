import React from "react";
import { Toast as PRToast } from "primereact/toast";

const Toast = React.forwardRef((props, ref) => {
  return <PRToast {...props} ref={ref} />;
});

export default Toast;

import React, { useRef } from "react";
import { FileUpload as PRFileUpload } from "primereact/fileupload";

export default function FileUpload({ ...otherProps }) {
  return <PRFileUpload data-testid="file-upload-component" {...otherProps} />;
}

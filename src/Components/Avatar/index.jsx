import React from "react";
import { Avatar as PRAvatar } from "primereact/avatar";

function Avatar({ ...otherProps }) {
  return <PRAvatar data-testid="avatar" test {...otherProps} />;
}

export default Avatar;

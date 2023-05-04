import React from "react";
import { Menubar } from "primereact/menubar";

function Header({ ...otherProps }) {
  return <Menubar {...otherProps} />;
}

export default Header;

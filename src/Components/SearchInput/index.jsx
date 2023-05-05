import React from "react";
import { InputText } from "primereact/inputtext";

function SearchInput({ ...otherProps }) {
  return (
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText {...otherProps} placeholder="Search" />
    </span>
  );
}

export default SearchInput;

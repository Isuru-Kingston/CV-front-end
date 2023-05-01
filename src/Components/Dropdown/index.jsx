import React from "react";
import { Dropdown as PRDropdown } from "primereact/dropdown";

const Dropdown = ({
  label,
  errormsg,
  isError,
  value,
  options,
  onChangeValue,
}) => {
  return (
    <div className="flex flex-column gap-2" data-testid="dropdown">
      <label htmlFor="dropdown">{label}</label>
      <PRDropdown
        id="dropdown"
        aria-describedby="dropdown-help"
        value={value}
        onChange={onChangeValue}
        className={isError ? "p-invalid" : ""}
        options={options}
      />
      {isError ? <small id="dropdown-help">{errormsg}</small> : null}
    </div>
  );
};

export default Dropdown;

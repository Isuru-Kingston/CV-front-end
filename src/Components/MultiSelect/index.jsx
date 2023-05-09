import React from "react";
import { MultiSelect as PRMultiSelect } from "primereact/multiselect";

const MultiSelect = ({
  label,
  errormsg,
  isError,
  value,
  options,
  onChangeValue,
}) => {
  return (
    <div className="flex flex-column gap-2" data-testid="multi-select">
      <label htmlFor="multi-select">{label}</label>
      <PRMultiSelect
        id="multi-select"
        aria-describedby="multi-select-help"
        value={value}
        onChange={onChangeValue}
        className={isError ? "p-invalid" : ""}
        options={options}
      />
      {isError ? <small id="multi-select-help">{errormsg}</small> : null}
    </div>
  );
};

export default MultiSelect;

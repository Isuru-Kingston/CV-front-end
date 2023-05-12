import React from "react";
import { InputNumber } from "primereact/inputnumber";

const NumberInput = ({
  label,
  errormsg,
  isError,
  value,
  onChangeValue,
  ...otherProps
}) => {
  return (
    <div className="flex flex-column gap-2">
      <label htmlFor="number-input">{label}</label>
      <InputNumber
        id="number-input"
        aria-describedby="number-input-help"
        value={value}
        onChange={onChangeValue}
        className={isError ? "p-invalid" : ""}
        showButtons
        mode="decimal"
        min={0}
        {...otherProps}
      />
      {isError ? <small id="number-input-help">{errormsg}</small> : null}
    </div>
  );
};

export default NumberInput;

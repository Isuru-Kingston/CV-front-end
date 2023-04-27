import React from "react";
import { InputText } from "primereact/inputtext";

const TextInput = ({ label, errormsg, isError, value, setValue }) => {
  return (
    <div className="flex flex-column gap-2">
      <label htmlFor="text-input">{label}</label>
      <InputText
        id="text-input"
        aria-describedby="text-input-help"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={isError ? "p-invalid" : ""}
      />
      {isError ? <small id="text-input-help">{errormsg}</small> : null}
    </div>
  );
};

export default TextInput;

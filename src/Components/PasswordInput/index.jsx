import React from "react";
import { Password } from "primereact/password";

const PasswordInput = ({ label, errormsg, isError, value, onChangeValue }) => {
  return (
    <div className="flex flex-column gap-2">
      <label htmlFor="password-input">{label}</label>
      <Password
        type="password"
        id="password-input"
        aria-describedby="password-input-help"
        value={value}
        onChange={onChangeValue}
        className={isError ? "p-invalid" : ""}
        toggleMask
      />

      {isError ? <small id="password-input-help">{errormsg}</small> : null}
    </div>
  );
};

export default PasswordInput;

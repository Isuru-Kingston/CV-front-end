import React from "react";

const FileUpload = ({
  label,
  errormsg,
  isError,
  onChangeValue,
  ...otherProps
}) => {
  return (
    <div className="flex flex-column gap-2">
      <label htmlFor="file-input">{label}</label>
      <input
        type="file"
        id="file-input"
        aria-describedby="file-input-help"
        onChange={onChangeValue}
        className={
          isError
            ? "p-invalid border-1 border-red-500 p-3  border-round-lg text-base"
            : "border-1 border-blue-500 p-3 border-round-lg text-base"
        }
        accept="image/*"
        {...otherProps}
      />
      {isError ? <small id="file-input-help">{errormsg}</small> : null}
    </div>
  );
};

export default FileUpload;

import React from "react";

function Title({ Title, subTitle }) {
  return (
    <div>
      <div className="text-base font-medium">{Title}</div>
      <div className="text-base">{subTitle}</div>
    </div>
  );
}

export default Title;

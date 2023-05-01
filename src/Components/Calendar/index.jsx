import React from "react";
import { Calendar as PRCalendar } from "primereact/calendar";

const Calendar = ({
  label,
  errormsg,
  isError,
  value,
  onChangeValue,
  ...otherProps
}) => {
  return (
    <div className="flex flex-column gap-2" data-testid="calendar">
      <label htmlFor="text-input">{label}</label>
      <PRCalendar
        id="calendar"
        aria-describedby="calendar-help"
        value={value}
        onChange={onChangeValue}
        className={isError ? "p-invalid" : ""}
        {...otherProps}
      />
      {isError ? <small id="calendar-help">{errormsg}</small> : null}
    </div>
  );
};

export default Calendar;

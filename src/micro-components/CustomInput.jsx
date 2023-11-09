import React from "react";
import CalendarFilter from "../assets/svg-icons/CalendarFilter";

const CustomInput = ({ onFocus, value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        className="custom-c"
        onChange={onChange}
        onFocus={onFocus}
        value={value}
      />
    </div>
  );
};

export default CustomInput;

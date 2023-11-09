import React from "react";

const MinusButton = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="30" height="30" fill="none" />
      <path
        opacity="0.4"
        d="M20 2.5H10C5 2.5 2.5 5 2.5 10V26.25C2.5 26.9375 3.0625 27.5 3.75 27.5H20C25 27.5 27.5 25 27.5 20V10C27.5 5 25 2.5 20 2.5Z"
        fill="#EC1D1D"
      />
      <path
        d="M19.375 14.0625H10.625C10.1125 14.0625 9.6875 14.4875 9.6875 15C9.6875 15.5125 10.1125 15.9375 10.625 15.9375H19.375C19.8875 15.9375 20.3125 15.5125 20.3125 15C20.3125 14.4875 19.8875 14.0625 19.375 14.0625Z"
        fill="#EC1D1D"
      />
    </svg>
  );
};

export default MinusButton;

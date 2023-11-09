import React from "react";

const AddIcon = () => {
  return (
    <span
      className="bg-royal d-flex align-items-center justify-content-center rounded-circle"
      style={{ height: "54px", width: "54px" }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
          fill="white"
        />
        <path
          d="M20 14.0625H15.9375V10C15.9375 9.4875 15.5125 9.0625 15 9.0625C14.4875 9.0625 14.0625 9.4875 14.0625 10V14.0625H10C9.4875 14.0625 9.0625 14.4875 9.0625 15C9.0625 15.5125 9.4875 15.9375 10 15.9375H14.0625V20C14.0625 20.5125 14.4875 20.9375 15 20.9375C15.5125 20.9375 15.9375 20.5125 15.9375 20V15.9375H20C20.5125 15.9375 20.9375 15.5125 20.9375 15C20.9375 14.4875 20.5125 14.0625 20 14.0625Z"
          fill="white"
        />
      </svg>
    </span>
  );
};

export default AddIcon;

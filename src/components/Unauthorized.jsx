import React from "react";
import { useNavigate } from "react-router-dom";
import InvoiceSingleFailIcon from "../assets/svg-icons/InvoiceSingleFailIcon";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container px-4 position-relative"
      style={{ height: "100vh" }}
      dir="rtl"
    >
      <div className="bg-white rounded-5 py-4 px-5 unauth-message-box drop-shadow">
        <div className="text-center mb-4">
          <InvoiceSingleFailIcon />
        </div>
        <div className="red-xlarge-bold mb-3 text-center">
          شما به این صفحه دسترسی ندارید
        </div>
        <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3">
          <span
            className="btn-red-bold rounded-pill flex-grow-1 py-3 text-center has-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            بازگشت
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

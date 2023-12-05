import React from "react";
import InvoiceSingleFailIcon from "../assets/svg-icons/InvoiceSingleFailIcon";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();
  console.log(error);
  return (
    <div
      className="container px-3 position-relative"
      style={{ height: "100vh" }}
      dir="rtl"
    >
      <div className="bg-white rounded-5 py-4 px-5 unauth-message-box drop-shadow">
        <div className="text-center mb-4">
          <InvoiceSingleFailIcon />
        </div>
        {error.message === "Network Error" ? (
          <div className="red-xlarge-bold mb-3 text-center">
            خطای شبکه ! دسترسی خود را به اینترنت بررسی کنید
            <div>(فیلترشکن خود را خاموش کنید)</div>
          </div>
        ) : (
          <div className="red-xlarge-bold mb-3 text-center">
            خطا ! مشکلی پیش آمده
            <div>لطفا مجددا تلاش کنید</div>
          </div>
        )}
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

export default ErrorPage;

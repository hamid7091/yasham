import React from "react";
import ExitProfileBanner from "../assets/svg-pics/ExitProfileBanner";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axiosInstance from "../util-functions/axiosInstance";

const CancelOrderPopup = ({ orderID, setisModalActive }) => {
  const navigate = useNavigate();

  const handleClosePopup = () => {
    setisModalActive(false);
  };

  const handleCancelOrder = async () => {
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post("/order/update-order", {
        orderID,
      });
      Loading.remove();
      if (response.data.response.success) {
        setisModalActive(false);
        Notify.success("سفارش با موفقیت لغو شد");
        navigate("orderList");
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
      setisModalActive(false);
      Notify.failure("خطا ! لطفا مجددا تلاش کنید");
    }
  };
  return (
    <div>
      <div className="exit-profile-popup bg-default rounded-5 p-4 show">
        <div className="exit-profile-popup-head position-relative">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="bold-xxlarge">لغو سفارش</span>
            <span className="has-pointer" onClick={handleClosePopup}>
              <CloseIcon />
            </span>
          </div>
          <div className="text-center mb-3">
            <ExitProfileBanner />
          </div>
        </div>
        <div className="exit-profile-popup-taxt text-center">
          <p className="lgrey-large-bold500">
            آیا از لغو این سفارش مطمئن هستید ؟
          </p>
        </div>
        <div className="d-flex justify-content-center gap-3 align-items-center">
          <button className="btn-green-bold" onClick={handleCancelOrder}>
            بله
          </button>
          <button
            className="popup-close-btn btn-lgrey-bold"
            onClick={handleClosePopup}
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderPopup;

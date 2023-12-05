import React from "react";
import ExitProfileBanner from "../assets/svg-pics/ExitProfileBanner";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axiosInstance from "../util-functions/axiosInstance";

const RemoveUserPopup = ({
  isPopupActive,
  selectedUserToDelete,
  setNewReqSent,
  clientID,
}) => {
  const navigate = useNavigate();
  const handleClosePopup = () => {
    isPopupActive(false);
  };

  const removeUser = async () => {
    const formdata = new FormData();
    formdata.append("userID", selectedUserToDelete);
    formdata.append("clientID", clientID);
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post(
        "client/remove_employee",
        formdata
      );
      console.log(response.data);
      Loading.remove();
      if (response.data.response) {
        isPopupActive(false);
        Notify.success(response.data.response.response);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
      Notify.failure("خطایی پیش آمده ! لطفا مجددا تلاش کنید");
    }
  };

  return (
    <div>
      <div className="exit-profile-popup bg-default rounded-5 p-4 show">
        <div className="exit-profile-popup-head position-relative">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="bold-xxlarge">حذف کاربر</span>
            <span className="has-pointer" onClick={handleClosePopup}>
              <CloseIcon />
            </span>
          </div>
          <div className="text-center mb-3">
            <ExitProfileBanner />
          </div>
        </div>
        <div className="exit-profile-popup-taxt text-center">
          <p className="lgrey-large-bold500">آیا از حذف کاربر مطمئن هستید ؟</p>
        </div>
        <div className="d-flex justify-content-center gap-3 align-items-center">
          <button className="btn-green-bold" onClick={removeUser}>
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

export default RemoveUserPopup;

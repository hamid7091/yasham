import React from "react";
import ExitProfileBanner from "../assets/svg-pics/ExitProfileBanner";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const RemoveUserPopup = ({
  isPopupActive,
  selectedUserToDelete,
  setNewReqSent,
}) => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const removeUserURL = "some url";
  const removeUserHeader = new Headers();
  removeUserHeader.append("Authorization", `Bearer ${accessToken}`);
  const removeUserFormdata = new FormData();
  removeUserFormdata.append("userID", selectedUserToDelete);
  const removeUserRequestOptions = {
    method: "POST",
    headers: removeUserHeader,
    body: removeUserFormdata,
    redirect: "follow",
  };
  const navigate = useNavigate();
  const handleClosePopup = () => {
    isPopupActive(false);
  };
  const handleRemoveUser = async () => {
    Loading.standard("در حال ارسال درخواست");
    const response = await fetchData(removeUserURL, removeUserRequestOptions);
    if (response.success) {
      isPopupActive(false);
      Loading.remove();
      Notify.success("کاربر مورد نظر با موفقیت حذف شد");
      setNewReqSent(true);
    } else {
      isPopupActive(false);
      Loading.remove();
      Notify.failure("خطایی پیش آمده ! لطفا مجددا تلاش کنید");
    }
    console.log(selectedUserToDelete);
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
          <button className="btn-green-bold" onClick={handleRemoveUser}>
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

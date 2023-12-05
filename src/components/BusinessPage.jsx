import React, { useEffect, useRef, useState } from "react";
import BackArrow from "../assets/svg-icons/BackArrow";
import EditPen from "../assets/svg-icons/EditPen";

import ExitProfilePopup from "./ExitProfilePopup";
import PopupBackground from "./PopupBackground";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../util-functions/axiosInstance";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location?.state?.businessInfo;

  const [isPopupActive, setIsPopupActive] = useState(false);
  const [businessIsValid, setBusinessIsValid] = useState(true);
  const [businessLocation, setBusinessLocation] = useState(true);
  const [businessAddress, setBusinessAddress] = useState(true);
  const [mobileIsValid, setMobileIsValid] = useState(true);
  const [avatarIsChanged, setAvatarIsChanged] = useState(false);

  const [clientName, setClientName] = useState(state?.clientName);
  const [clientPhone, setClientPhone] = useState(state?.clientPhone);
  const [clientAddress, setClientAddress] = useState(state?.clientAddress);
  const [clientLocation, setClientLocation] = useState(state?.clientLocation);
  const [userAvatar, setUserAvatar] = useState(state?.clientAvatar);

  const profile = useRef(null);
  const editProfile = useRef(null);
  const avatarInput = useRef(null);
  const avatar = useRef(null);

  const handleChangePage = () => {
    profile.current.classList.toggle("d-none");
    editProfile.current.classList.toggle("d-none");
  };
  const handleExitPopup = () => {
    setIsPopupActive(true);
  };
  const handleAvatarChange = () => {
    const choosenFile = avatarInput.current.files[0];
    if (choosenFile) {
      setUserAvatar(choosenFile);
      setAvatarIsChanged(true);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        avatar.current.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(choosenFile);
    }
  };
  const handleBusinessPhoneValidation = (e) => {
    if (e.target.value) {
      setMobileIsValid(true);
      setClientPhone(e.target.value);
    } else {
      setMobileIsValid(false);
      setClientPhone(e.target.value);
    }
  };
  const handleBusinessNameValidation = (e) => {
    if (e.target.value) {
      setBusinessIsValid(true);
      setClientName(e.target.value);
    } else {
      setBusinessIsValid(false);
      setClientName(e.target.value);
    }
  };
  const handleAddressValidation = (e) => {
    if (e.target.value) {
      setBusinessAddress(true);
      setClientAddress(e.target.value);
    } else {
      setBusinessAddress(false);
      setClientAddress(e.target.value);
    }
  };
  const handleLocationValidation = (e) => {
    if (e.target.value) {
      setBusinessLocation(true);
      setClientLocation(e.target.value);
    } else {
      setBusinessLocation(false);
      setClientLocation(e.target.value);
    }
  };
  const handleSubmitAxios = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    businessIsValid && formdata.append("businessName", clientName);
    businessAddress && formdata.append("address", clientAddress);
    mobileIsValid && formdata.append("phone", clientPhone);
    avatarIsChanged && formdata.append("clientAvatar", userAvatar);
    businessLocation && formdata.append("location", clientLocation);
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post(
        "/client/update_business",
        formdata
      );
      console.log(response.data.response);
      Loading.remove();
      if (response.data.response) {
        Notify.success(response.data.response);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
      Notify.failure("خطا! مجددا تلاش کنید");
    }
  };

  useEffect(() => {
    if (state === null || state === undefined) {
      navigate("/");
    }
  }, []);

  return (
    state && (
      <div className="container px-3 pb-3" dir="rtl">
        {isPopupActive && (
          <>
            <ExitProfilePopup isPopupActive={setIsPopupActive} />
            <PopupBackground isPopupActive={setIsPopupActive} />
          </>
        )}
        <div ref={editProfile} className="d-none">
          <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3">
            <div className="bold-xlarge">ویرایش پروفایل کسب و کار</div>
            <span onClick={handleChangePage}>
              <BackArrow />
            </span>
          </header>
          <form
            className="edit-form mt-5 pb-4"
            onSubmit={(event) => handleSubmitAxios(event)}
          >
            <div className="text-center d-flex flex-column justify-content-center align-items-center">
              <div>
                <img
                  ref={avatar}
                  className="avatar-svg-image"
                  src={state.clientAvatar}
                  alt=""
                />
              </div>
              <div>
                <input
                  onChange={handleAvatarChange}
                  ref={avatarInput}
                  type="file"
                  name="profile-avatar"
                  accept="image/*"
                  id="profile-avatar-uploader"
                />
                <label
                  htmlFor="profile-avatar-uploader"
                  className="btn-greyd-thin mt-2 has-pointer d-flex gap-2 justify-content-center "
                >
                  <EditPen />
                  <span>{avatarIsChanged ? "انتخاب مجدد" : "انتخاب عکس"}</span>
                </label>
              </div>
            </div>
            <hr className="mt-4 mb-4" />
            <label htmlFor="userFirstName" className="bold500-large mb-2 pe-3 ">
              {" "}
              نام کسب و کار{" "}
              <span
                className={`text-danger ${businessIsValid ? "d-none" : ""}`}
              >
                (ورود نام کسب و کار الزامی است)
              </span>
            </label>
            <input
              defaultValue={state.clientName}
              type="text"
              name="userFirstName"
              className={`form-control rounded-pill mb-3 py-2 is-valid ${
                businessIsValid ? "is-valid" : "is-invalid"
              }`}
              id="userFirstName"
              placeholder="نام کسب و کار"
              onKeyUp={(event) => handleBusinessNameValidation(event)}
            />
            <label htmlFor="mobile" className="bold500-large mb-2 pe-3">
              شماره تماس کسب و کار
              <span className={`text-danger ${mobileIsValid ? "d-none" : ""}`}>
                {" "}
                (ورود شماره تماس کسب و کار الزامی است)
              </span>
            </label>
            <input
              defaultValue={state.clientPhone}
              maxLength={10}
              type="number"
              name="mobile"
              className={`form-control rounded-pill mb-3 py-2 ${
                mobileIsValid ? "is-valid" : "is-invalid"
              }`}
              id="mobile"
              placeholder="شماره تماس کسب و کار"
              onKeyUp={(event) => handleBusinessPhoneValidation(event)}
            />
            <label htmlFor="userLastName" className="bold500-large mb-2 pe-3">
              آدرس کسب و کار
              <span
                className={`text-danger ${businessAddress ? "d-none" : ""}`}
              >
                {" "}
                (ورود آدرس کسب و کار الزامی است)
              </span>
            </label>
            <input
              defaultValue={state.clientAddress}
              type="text"
              name="userLastName"
              className={`form-control rounded-pill mb-3 py-2 ${
                businessAddress ? "is-valid" : "is-invalid"
              }`}
              id="userLastName"
              placeholder="نام خانوادگی "
              onKeyUp={(event) => handleAddressValidation(event)}
            />
            <label htmlFor="clientLocation" className="bold500-large mb-2 pe-3">
              موقعیت مکانی
              <span
                className={`text-danger ${businessLocation ? "d-none" : ""}`}
              >
                {" "}
                (ورود موقعیت مکانی الزامی است)
              </span>
            </label>
            <input
              defaultValue={state.clientLocation}
              type="text"
              name="clientLocation"
              className={`form-control rounded-pill mb-3 py-2 ${
                businessLocation ? "is-valid" : "is-invalid"
              }`}
              id="clientLocation"
              placeholder="موقعیت مکانی"
              onKeyUp={(event) => handleLocationValidation(event)}
            />
            {/* <label htmlFor="password" className="bold500-large mb-2 pe-3">
              رمز عبور{" "}
              <span
                className={`text-danger ${passwordIsValid ? "d-none" : ""}`}
              >
                (رمز عبور باید بیش از 8 کاراکتر باشد)
              </span>
            </label>
            <input
              onKeyUp={(event) => handlePassword(event)}
              type="password"
              name="password"
              className={
                passwordIsValid
                  ? "form-control rounded-pill mb-3 py-2 is-valid"
                  : "form-control rounded-pill mb-3 py-2 is-invalid"
              }
              id="password"
              placeholder="*********"
            /> */}
            <button
              type="submit"
              className="btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
            >
              اعمال تغییرات
            </button>
          </form>
        </div>
        <div ref={profile} className="">
          <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3">
            <div className="bold-xlarge">پروفایل کسب و کار</div>
            <Link to="/" state={state}>
              <BackArrow />
            </Link>
          </header>
          <div className="text-center d-flex flex-column justify-content-between align-items-center">
            <div>
              <img
                className="avatar-svg-image"
                src={state.clientAvatar}
                alt="آواتار"
              />
            </div>
          </div>
          <div className="tborder-vlroyal mt-4">
            <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
              <span className="royal-large ms-2">نام کسب و کار</span>
              <span className="grey-large-bold500">{state.clientName}</span>
            </div>
            <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
              <span className="royal-large ms-2">شماره تماس کسب و کار</span>
              <span className="grey-large-bold500">{state.clientPhone}</span>
            </div>
            <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
              <span className="royal-large ms-2">آدرس کسب و کار</span>
              <span className="grey-large-bold500">{state.clientAddress}</span>
            </div>
            <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
              <span className="royal-large ms-2">موقعیت مکانی</span>
              <span className="grey-large-bold500">{state.clientLocation}</span>
            </div>
            <div className="d-flex align-items-center rounded-pill gap-3 mt-4">
              <button
                className="btn-royal-bold-default exit-profile-btn rounded-pill flex-grow-1 text-center py-3 has-pointer border-0"
                onClick={handleChangePage}
              >
                ویرایش
              </button>
              <button
                className="btn-red-bold exit-profile-btn rounded-pill flex-grow-1 text-center py-3 has-pointer border-0"
                onClick={handleExitPopup}
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;

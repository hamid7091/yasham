import React, { useEffect, useRef, useState } from "react";
import BackArrow from "../assets/svg-icons/BackArrow";
import EditPen from "../assets/svg-icons/EditPen";
import EditProfileIcon from "../assets/svg-icons/EditProfileIcon";
import BackIconLight from "../assets/svg-icons/BackIconLight";
import OrderListIcon from "../assets/svg-icons/OrderListIcon";
import WalletIcon from "../assets/svg-icons/WalletIcon";

import ExitProfilePopup from "./ExitProfilePopup";
import PopupBackground from "./PopupBackground";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../util-functions/axiosInstance";

const Profile = () => {
  const accessToken = window.localStorage.getItem("AccessToken");

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state.user;
  console.log(location);
  console.log(state);

  const [isPopupActive, setIsPopupActive] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [lastNameIsValid, setLastNameIsValid] = useState(true);
  const [mobileIsValid, setMobileIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [avatarIsChanged, setAvatarIsChanged] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [userRole, setUserRole] = useState(state?.userRole);

  const [userFirstName, setUserFirstName] = useState(state?.userFirstName);
  const [userLastName, setUserLastName] = useState(state?.userLastName);
  const [userAvatar, setUserAvatar] = useState(state?.userAvatar);
  const [mobile, setMobile] = useState(state?.mobile);
  const [userPassword, setUserPassword] = useState("");

  const profile = useRef(null);
  const editProfile = useRef(null);
  const avatarInput = useRef(null);
  const avatar = useRef(null);

  useEffect(() => {
    if (state === null) {
      navigate("/");
    }
    userRole?.forEach((role) => {
      if (role === "client") {
        setIsClient(true);
      }
    });
  }, []);

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
  const handleMobileValidation = (e) => {
    const mobilePattern = /9[0-9]{9,9}$/;
    if (e.target.value) {
      if (mobilePattern.test(e.target.value)) {
        setMobileIsValid(true);
        setMobile(e.target.value);
      } else {
        setMobileIsValid(false);
        setMobile(e.target.value);
      }
    } else {
      setMobileIsValid(false);
      setMobile(e.target.value);
    }
  };
  const handleFirstNameValidation = (e) => {
    if (e.target.value) {
      setFirstNameIsValid(true);
      setUserFirstName(e.target.value);
    } else {
      setFirstNameIsValid(false);
      setUserFirstName(e.target.value);
    }
  };
  const handleLastNameValidation = (e) => {
    if (e.target.value) {
      setLastNameIsValid(true);
      setUserLastName(e.target.value);
    } else {
      setLastNameIsValid(false);
      setUserLastName(e.target.value);
    }
  };
  const handlePassword = (e) => {
    const passwordPattern = /^[\w]{8,24}$/;
    if (e.target.value) {
      if (passwordPattern.test(e.target.value)) {
        setUserPassword(e.target.value);
        setPasswordIsValid(true);
      } else {
        setPasswordIsValid(false);
      }
    } else {
      setPasswordIsValid(true);
    }
  };
  const handleSubmitAxios = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    firstNameIsValid && formdata.append("userFirstName", userFirstName);
    lastNameIsValid && formdata.append("userLastName", userLastName);
    mobileIsValid && formdata.append("mobile", mobile);
    passwordIsValid && formdata.append("userPassword", userPassword);
    avatarIsChanged && formdata.append("userAvatar", userAvatar);

    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post(
        "/user/update_profile",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        Loading.remove();
        Notify.success(response.data.response);
        navigate("/");
      } else {
        Loading.remove();
        Notify.failure("خطا! مجددا تلاش کنید");
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  return (
    state && (
      <>
        {isPopupActive && (
          <>
            <ExitProfilePopup isPopupActive={setIsPopupActive} />
            <PopupBackground
              isPopupActive={setIsPopupActive}
              handleStartDateChange={() => {}}
              handleEndDateChange={() => {}}
              setStatusField={() => {}}
            />
          </>
        )}
        <div ref={editProfile} dir="rtl" className="container d-none">
          <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3">
            <div className="bold-xlarge">ویرایش پروفایل کاربری</div>
            <span onClick={handleChangePage}>
              <BackArrow />
            </span>
          </header>
          <form className="edit-form mt-5 pb-4" onSubmit={handleSubmitAxios}>
            <div className="text-center d-flex flex-column justify-content-center align-items-center">
              <div>
                <img
                  ref={avatar}
                  className="avatar-svg-image"
                  src={state.userAvatar}
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
              نام{" "}
              <span
                className={`text-danger ${firstNameIsValid ? "d-none" : ""}`}
              >
                (ورود نام الزامی است)
              </span>
            </label>
            <input
              defaultValue={state.userFirstName}
              type="text"
              name="userFirstName"
              className={`form-control rounded-pill mb-3 py-2 is-valid ${
                firstNameIsValid ? "is-valid" : "is-invalid"
              }`}
              id="userFirstName"
              placeholder="نام "
              onKeyUp={(event) => handleFirstNameValidation(event)}
            />
            <label htmlFor="userLastName" className="bold500-large mb-2 pe-3">
              نام خانوادگی{" "}
              <span
                className={`text-danger ${lastNameIsValid ? "d-none" : ""}`}
              >
                (ورود نام خانوادگی الزامی است)
              </span>
            </label>
            <input
              defaultValue={state.userLastName}
              type="text"
              name="userLastName"
              className={`form-control rounded-pill mb-3 py-2 ${
                lastNameIsValid ? "is-valid" : "is-invalid"
              }`}
              id="userLastName"
              placeholder="نام خانوادگی "
              onKeyUp={(event) => handleLastNameValidation(event)}
            />
            <label htmlFor="mobile" className="bold500-large mb-2 pe-3">
              شماره موبایل (بدون صفر){" "}
              <span className={`text-danger ${mobileIsValid ? "d-none" : ""}`}>
                (شماره موبایل ده رقمی و بدون صفر وارد شود)
              </span>
            </label>
            <input
              defaultValue={state.mobile}
              maxLength={10}
              type="tel"
              name="mobile"
              className={`form-control rounded-pill mb-3 py-2 ${
                mobileIsValid ? "is-valid" : "is-invalid"
              }`}
              id="mobile"
              placeholder="شماره موبایل"
              onKeyUp={(event) => handleMobileValidation(event)}
            />
            <label htmlFor="password" className="bold500-large mb-2 pe-3">
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
            />
            <button
              type="submit"
              className="btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
            >
              اعمال تغییرات
            </button>
          </form>
        </div>
        <div ref={profile} className="container px-3" dir="rtl">
          <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3">
            <div className="bold-xlarge">پروفایل کاربری</div>
            <Link to="/" state={state}>
              <BackArrow />
            </Link>
          </header>
          <div className="text-center d-flex flex-column justify-content-between align-items-center">
            <div>
              <img
                className="avatar-svg-image"
                src={state.userAvatar}
                alt="آواتار"
              />
            </div>
          </div>
          <hr />
          <div className="mt-4">
            <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
              <span className="royal-large ms-2 has-pointer">نام</span>
              <span className="grey-large-bold500">{state.userFirstName}</span>
            </div>
            <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
              <span className="royal-large ms-2 has-pointer">نام خانوادگی</span>
              <span className="grey-large-bold500">{state.userLastName}</span>
            </div>
            <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
              <span className="royal-large ms-2 has-pointer">شماره تماس</span>
              <span className="grey-large-bold500">{state.mobile}</span>
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
      </>
    )
  );
};

export default Profile;

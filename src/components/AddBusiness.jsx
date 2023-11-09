import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import EditPen from "../assets/svg-icons/EditPen";

const AddBusiness = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const registerBusinessURL = "Register Business URL";
  const registerBusinessHeader = new Headers();
  registerBusinessHeader.append("Authorization", `Bearer ${accessToken}`);
  const registerBusinessFormdata = new FormData();

  const avatar = useRef(null);
  const avatarInput = useRef(null);

  const [businessAvatar, setBusinessAvatar] = useState();
  const [businessName, setBusinessName] = useState();
  const [businessMobile, setBusinessMobile] = useState();
  const [businessAddress, setBusinessAddress] = useState();
  const [businessLocation, setBusinessLocation] = useState();

  const [avatarIsChanged, setAvatarIsChanged] = useState(false);
  const [businessNameIsValid, setBusinessNameIsValid] = useState();
  const [mobileIsValid, setMobileIsValid] = useState();
  const [businessAddressIsValid, setBusinessAddressIsValid] = useState();
  const [locationIsValid, setLocationIsValid] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (businessAvatar) {
      registerBusinessFormdata.append("businessAvatar", businessAvatar);
    }
    if (businessLocation) {
      registerBusinessFormdata.append("businessLocation", businessLocation);
    }
    if (businessName === undefined || businessName === "") {
      setBusinessNameIsValid(false);
    } else {
      registerBusinessFormdata.append("businessName", businessName);
    }
    if (businessMobile === undefined || businessMobile === "") {
      setMobileIsValid(false);
    } else {
      registerBusinessFormdata.append("businessTel", businessMobile);
    }
    if (businessAddress === undefined || businessAddress === "") {
      setBusinessAddressIsValid(false);
    } else {
      registerBusinessFormdata.append("businessAddress", businessAddress);
    }
    const registerBusinessRequestOptions = {
      method: "POST",
      headers: registerBusinessHeader,
      body: registerBusinessFormdata,
      redirect: "follow",
    };

    console.log(businessName);
    console.log(businessAddress);
    console.log(businessMobile);
    console.log(businessLocation);
  };
  const handleAvatarChange = () => {
    const choosenFile = avatarInput.current.files[0];
    if (choosenFile) {
      setBusinessAvatar(choosenFile);
      setAvatarIsChanged(true);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        avatar.current.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(choosenFile);
    }
  };
  const handleBusinessNameValidation = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      setBusinessNameIsValid(true);
      setBusinessName(e.target.value);
    } else {
      setBusinessNameIsValid();
      setBusinessName(e.target.value);
    }
  };
  const handleMobileValidation = (e) => {
    if (e.target.value) {
      setMobileIsValid(true);
      setBusinessMobile(e.target.value);
    } else {
      setMobileIsValid();
      setBusinessMobile(e.target.value);
    }
  };
  const handleBusinessAddressValidations = (e) => {
    if (e.target.value) {
      setBusinessAddressIsValid(true);
      setBusinessAddress(e.target.value);
    } else {
      setBusinessAddressIsValid();
      setBusinessAddress(e.target.value);
    }
  };
  const handleBusinessLocatoinValidation = (e) => {
    if (e.target.value) {
      setLocationIsValid(true);
      setBusinessLocation(e.target.value);
    } else {
      setLocationIsValid();
      setBusinessLocation(e.target.value);
    }
  };
  console.log(businessName);
  return (
    <div className="container px-3" dir="rtl">
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
        <div className="bold-xlarge">ثبت کسب و کار جدید</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <div>
        <form
          className="edit-form mt-5 pb-4"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="text-center d-flex flex-column justify-content-center align-items-center">
            <div>
              <img
                ref={avatar}
                className="avatar-svg-image"
                src="https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg"
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
          <label htmlFor="business-name" className="bold500-large mb-2 pe-3 ">
            {" "}
            نام کسب و کار{" "}
            <span
              className={`text-danger ${
                businessNameIsValid === false ? "" : "d-none"
              }`}
            >
              (ورود نام کسب و کار الزامی است)
            </span>
          </label>
          <input
            type="text"
            name="business-name"
            className={`form-control rounded-pill mb-3 py-2 ${
              businessNameIsValid === false
                ? "is-invalid"
                : businessNameIsValid === true
                ? "is-valid"
                : ""
            }`}
            id="business-name"
            placeholder="نام کسب و کار را وارد کنید"
            onChange={(event) => handleBusinessNameValidation(event)}
          />
          <label htmlFor="mobile" className="bold500-large mb-2 pe-3">
            شماره تماس کسب و کار{" "}
            <span
              className={`text-danger ${
                mobileIsValid === false ? "" : "d-none"
              }`}
            >
              (ورود شماره تماس الزامی است)
            </span>
          </label>
          <input
            maxLength={10}
            type="number"
            name="mobile"
            className={`form-control rounded-pill mb-3 py-2 ${
              mobileIsValid === false
                ? "is-invalid"
                : mobileIsValid === true
                ? "is-valid"
                : ""
            }`}
            id="mobile"
            placeholder="شماره تماس کسب و کار را وارد کنید"
            onChange={(event) => handleMobileValidation(event)}
          />
          <label htmlFor="business-address" className="bold500-large mb-2 pe-3">
            آدرس کسب و کار{" "}
            <span
              className={`text-danger ${
                businessAddressIsValid === false ? "" : "d-none"
              }`}
            >
              (ورود آدرس کسب و کار الزامی است)
            </span>
          </label>
          <input
            type="text"
            name="business-address"
            className={`form-control rounded-pill mb-3 py-2 ${
              businessAddressIsValid === false
                ? "is-invalid"
                : businessAddressIsValid === true
                ? "is-valid"
                : ""
            }`}
            id="business-address"
            placeholder="آدرس کسب و کار را وارد کنید"
            onChange={(event) => handleBusinessAddressValidations(event)}
          />

          <label htmlFor="location" className="bold500-large mb-2 pe-3">
            موقعیت مکانی{" "}
            <span
              className={`text-danger ${locationIsValid ? "d-none" : ""}`}
            ></span>
          </label>
          <input
            onChange={(event) => handleBusinessLocatoinValidation(event)}
            type="text"
            name="location"
            className={`form-control rounded-pill mb-3 py-2`}
            id="location"
            placeholder="موقعیت مکانی را وارد کنید"
          />
          <button
            type="submit"
            className="btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
          >
            ثبت کسب و کار
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;

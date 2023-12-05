import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import EditPen from "../assets/svg-icons/EditPen";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const EditBusiness = () => {
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [businessInfo, setBusinessInfo] = useState();

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

  const getUserData = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/client/get_client", {
        clientID: param.id,
      });
      Loading.remove();
      console.log(response.data.response);
      setBusinessInfo(response.data.response.businessInfo);
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    businessNameIsValid && formdata.append("businessName", businessName);
    businessAddress && formdata.append("address", businessAddress);
    mobileIsValid && formdata.append("phone", businessMobile);
    avatarIsChanged && formdata.append("clientAvatar", businessAvatar);
    businessLocation && formdata.append("location", businessLocation);
    formdata.append("businessID", param.id);

    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post(
        "/client/update_business",
        formdata
      );
      Loading.remove();
      if (response.data.response) {
        Notify.success(response.data.response);
        navigate(`/businessReception/${param.id}`);
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
      Notify.failure("خطا ! لطفا مجددا تلاش کنید");
    }
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

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getUserData();
    }
  }, []);
  return (
    businessInfo && (
      <div className="container px-3 mt-100" dir="rtl">
        <SingleHeader title={"ویرایش کسب و کار"} location={location.state} />
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
                  src={businessInfo.businessAvatar}
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
              defaultValue={businessInfo.businessName}
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
              defaultValue={businessInfo.businessContact}
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
            <label
              htmlFor="business-address"
              className="bold500-large mb-2 pe-3"
            >
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
              defaultValue={businessInfo.businessAddress}
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
              defaultValue={businessInfo.locations}
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
              اعمال تغییرات
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default EditBusiness;

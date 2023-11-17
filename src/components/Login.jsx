import React, { useRef, useState } from "react";
import SignInBanner from "../assets/svg-pics/signInBanner";
import tabChanger from "../util-functions/tabChanger";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import axiosInstanceLogin from "../util-functions/axiosInstanceLogin";

const Login = () => {
  Loading.remove();

  const navigate = useNavigate();
  // -----------------------------
  const form1 = useRef(null);
  const form2 = useRef(null);
  const tabOneRef = useRef(null);
  const tabTwoRef = useRef(null);
  const formOne = useRef(null);
  const formTwo = useRef(null);
  const passwordInput = useRef(null);
  const otpInput = useRef(null);
  const otpBtn = useRef(null);
  const otpSendBtn = useRef(null);
  const cellNumInput = useRef(null);
  // -----------------------------

  // -----------------------------
  const [userInfo, setUserInfo] = useState();
  const [isCellNumExists, setIsCellNumExists] = useState(null);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState();
  const [canLogin, setCanLogin] = useState();
  const [cellNum, setCellNum] = useState({ cellNum: 0 });
  // -----------------------------

  // -----------------------------
  const handleTabChange = (event) => {
    tabChanger(event, tabOneRef, tabTwoRef, formOne, formTwo);
  };
  // -----------------------------
  // -----------------------------
  const handleOTP = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userID", userInfo.userID);
    try {
      Loading.standard("درحال ارسال درخواست");
      const response = await axiosInstanceLogin.post(
        "/user/send_otp",
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Notify.success(`${response.data.response.message}`);
      otpInput.current.classList.remove("disabled");
      otpBtn.current.classList.add("d-none");
      otpBtn.current.setAttribute("disabled", true);
      otpSendBtn.current.classList.remove("d-none");
      Loading.remove();
    } catch (error) {
      console.error(error);
      Notify.failure("خطا در ارسال درخواست !!!");
      Loading.remove();
    }
  };
  // -----------------------------
  // -----------------------------
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (otp) {
      formdata.append("userID", userInfo.userID);
      formdata.append("verificationCode", otp);
    }
    try {
      Loading.standard("در حال ورود");
      const response = await axiosInstanceLogin.post(
        "/user/verify_otp",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data.response.message) {
        Loading.remove();
        Notify.failure(`${response.data.response.message}`);
        otpInput.current.value = "";
      } else {
        window.localStorage.setItem(
          "AccessToken",
          response.data.response.AccessToken
        );
        navigate("/");
        Loading.remove();
      }
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  // -----------------------------
  // -----------------------------
  const handlePassWordSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userID", userInfo.userID);
    formdata.append("userPassword", password);
    try {
      Loading.standard("در حال ورود");
      const response = await axiosInstanceLogin.post(
        "/user/login_password",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data.response.message) {
        Loading.remove();
        Notify.failure(`${response.data.response.message}`);
        passwordInput.current.value = "";
      } else {
        window.localStorage.setItem(
          "AccessToken",
          response.data.response.AccessToken
        );

        navigate("/");
        Loading.remove();
      }
      Loading.remove();
    } catch (error) {
      Notify.failure(`${error.response.data.response.message}`);
      Loading.remove();
      passwordInput.current.value = "";
    }
  };
  // -----------------------------
  // -----------------------------
  const handle2SecondForm = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userMobile", cellNum);
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstanceLogin.post(
        "/user/validate",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      form1.current.classList.toggle("hidden");
      form2.current.classList.toggle("hidden");
      setIsCellNumExists(true);
      setUserInfo(response.data.response.userInfo);
      Loading.remove();
    } catch (error) {
      console.error(error);
      setCanLogin();
      setIsCellNumExists(false);
      Notify.failure("شماره وارد شده موجود نمی باشد!");
      cellNumInput.current.value = "";
      Loading.remove();
    }
  };
  // -----------------------------
  function cellNumberValidation(event) {
    let numCheck = /9[0-9]{9,9}$/;
    if (event.target.value) {
      if (numCheck.test(event.target.value)) {
        // setInputClasses("w-100 rounded-pill py-3 is-valid");
        // setLableClass("is-valid");
        setCanLogin(true);
        setCellNum(event.target.value);
      } else {
        // setInputClasses("w-100 rounded-pill py-3 is-invalid");
        // setLableClass("is-invalid");

        setCanLogin(false);
        setCellNum(event.target.value);
      }
    } else {
      // setInputClasses("w-100 rounded-pill py-3");
      // setLableClass("");

      setCanLogin();
      setCellNum(event.target.value);
    }
  }
  // -----------------------------

  return (
    <div className="">
      <section ref={form1} className="stage-one d-flex justify-content-center">
        <div className="container" dir="rtl">
          <div className="banner text-center d-flex justify-content-center">
            <SignInBanner />
          </div>
          <div className="input p-3">
            <form onSubmit={(event) => handle2SecondForm(event)}>
              <label className="bold500-large pe-3 mb-3">
                شماره تماس خود را وارد کنید{" "}
              </label>
              <input
                ref={cellNumInput}
                type="text"
                maxLength={10}
                className={`form-control rounded-pill  py-3 ${
                  canLogin === false
                    ? "is-invalid"
                    : canLogin === true
                    ? "is-valid"
                    : ""
                }`}
                placeholder="موبایل خود را بدون صفر وارد کنید"
                name="cell-number"
                onKeyUp={(event) => cellNumberValidation(event)}
              />
              <div
                className={`text-danger ${
                  canLogin === false ? "pt-1 pe-4" : "d-none"
                }`}
              >
                (شماره موبایل بدون صفر وارد شود)
              </div>
              <button
                className="btn-royal-bold d-block mt-4 py-3 text-center"
                style={{
                  pointerEvents: canLogin ? "" : "none",
                  color: canLogin ? "" : "var(--blue-royal-light)",
                }}
              >
                ورود
              </button>
            </form>
          </div>
        </div>
      </section>
      <section
        ref={form2}
        className="stage-two d-flex justify-content-center hidden"
      >
        <div className="container text-center pt-5" dir="rtl">
          {isCellNumExists === true && (
            <div className="container mt-5">
              <div className="log-in-avatar text-center d-flex flex-column justify-content-between align-items-center">
                <div className="avatar-svg-image">
                  <img
                    className="avatar-svg-image"
                    src={userInfo?.userAvatar}
                    alt="avatar"
                  />
                </div>
                <span className="bold-xlarge mt-2">
                  {userInfo?.userFirstName} {userInfo?.userLastName}
                </span>
              </div>
              <div className="p-3">
                <div className="log-in-tabs bg-white d-flex justify-content-between align-items-center rounded-pill text-center p-2 gap-2">
                  <span
                    id="disposable-tab"
                    ref={tabOneRef}
                    onClick={(event) => handleTabChange(event)}
                    className="active-tab flex-fill py-2 px-1"
                  >
                    {" "}
                    رمز یکبار مصرف{" "}
                  </span>
                  <span
                    id="password-tab"
                    ref={tabTwoRef}
                    onClick={handleTabChange}
                    className=" flex-fill py-2 px-1"
                  >
                    {" "}
                    رمز عبور{" "}
                  </span>
                </div>
                <form
                  ref={formTwo}
                  onSubmit={(event) => handlePassWordSubmit(event)}
                  className="d-none"
                >
                  <input
                    ref={passwordInput}
                    type="text"
                    name="password"
                    id="password"
                    className="active form-control rounded-pill mt-3 py-3"
                    placeholder="رمز عبور خود را وارد کنید"
                    onKeyUp={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn-royal-bold w-100 mt-3 rounded-pill py-3"
                    type="submit"
                  >
                    ورود
                  </button>
                </form>
                <form
                  ref={formOne}
                  className=""
                  onSubmit={(event) => handleOtpSubmit(event)}
                >
                  <input
                    ref={otpInput}
                    className="disabled form-control rounded-pill mt-3 py-3 px-4 "
                    type="text"
                    placeholder="کد دریافتی را وارد کنید ..."
                    name="disposable-pass"
                    id="disposable-pass-input"
                    onKeyUp={(e) => setOtp(e.target.value)}
                  />
                  <button
                    ref={otpSendBtn}
                    className="d-none btn-royal-bold w-100 mt-3 rounded-pill py-3"
                    id="disposable-pass-sender"
                    type="submit"
                  >
                    ورود
                  </button>
                  <button
                    ref={otpBtn}
                    className="btn-royal-bold w-100 mt-3 rounded-pill py-3"
                    id="disposable-pass-getter"
                    onClick={(event) => handleOTP(event)}
                  >
                    دریافت کد
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Login;

import React, { useRef, useState } from "react";
import SignInBanner from "../assets/svg-pics/signInBanner";
import tabChanger from "../util-functions/tabChanger";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";

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
  const disposableInput = useRef(null);
  const disposableGetter = useRef(null);
  const disposableSender = useRef(null);
  const cellNumInput = useRef(null);
  // -----------------------------

  // -----------------------------
  const [userInfo, setUserInfo] = useState();
  const [isCellNumExists, setIsCellNumExists] = useState(null);
  const [disposablePass, setDisposablePass] = useState("");
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
  async function handleDisposableSMS(e) {
    e.preventDefault();
    Loading.standard("در حال بارگذاری");
    var disposableFormdata = new FormData();
    disposableFormdata.append("userID", `${userInfo.userID}`);
    const options = {
      method: "POST",
      body: disposableFormdata,
      redirect: "follow",
    };
    const disposableResponse = await fetchData(
      process.env.REACT_APP_OTP_REQUEST_URL,
      options
    );

    Loading.remove();
    Notify.success(`${disposableResponse.message}`);
    disposableInput.current.classList.remove("disabled");
    disposableGetter.current.classList.add("d-none");
    disposableGetter.current.setAttribute("disabled", true);
    disposableSender.current.classList.remove("d-none");
  }

  // -----------------------------
  // -----------------------------
  function disposablePassHandler(e) {
    setDisposablePass(e.target.value);
  }
  // -----------------------------
  // -----------------------------
  function passHandler(e) {
    setPassword(e.target.value);
  }
  // -----------------------------
  // -----------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    Loading.standard("در حال بارگذاری");
    if (disposablePass) {
      var finalLoginFormdata = new FormData();
      finalLoginFormdata.append("userID", `${userInfo.userID}`);
      finalLoginFormdata.append("verificationCode", `${disposablePass}`);
      const options = {
        method: "POST",
        body: finalLoginFormdata,
        redirect: "follow",
      };
      const disposableResponse = await fetchData(
        process.env.REACT_APP_OTP_LOGIN_URL,
        options
      );
      if (disposableResponse?.message) {
        Loading.remove();
        Notify.failure(`${disposableResponse.message}`);
        disposableInput.current.value = "";
      } else {
        window.localStorage.setItem(
          "AccessToken",
          disposableResponse.AccessToken
        );
        const state = disposableResponse.userInfo;
        navigate("/", { state });
        Loading.remove();
      }
    } else {
      Loading.remove();
      Notify.info("لطفا رمز دریافتی را وارد کنید");
    }
  }
  // -----------------------------
  // -----------------------------
  async function handlePasswordSubmit(e) {
    e.preventDefault();
    Loading.standard("در حال بارگذاری");
    var finalLoginFormdata = new FormData();
    finalLoginFormdata.append("userID", `${userInfo.userID}`);
    finalLoginFormdata.append("userPassword", `${password}`);
    const options = {
      method: "POST",
      body: finalLoginFormdata,
      redirect: "follow",
    };

    const disposableResponse = await fetchData(
      process.env.REACT_APP_PASSWORD_LOGIN_URL,
      options
    );

    if (disposableResponse?.message) {
      Loading.remove();
      Notify.failure(`${disposableResponse.message}`);
      disposableInput.current.value = "";
    } else {
      window.localStorage.setItem(
        "AccessToken",
        disposableResponse.AccessToken
      );

      navigate("/");
      Loading.remove();
    }
  }
  // -----------------------------
  // -----------------------------
  const handleChangeForm = async (event) => {
    event.preventDefault();
    var getCellFormdata = new FormData();
    getCellFormdata.append("userMobile", `${cellNum}`);
    const options = {
      method: "POST",
      body: getCellFormdata,
      redirect: "follow",
    };
    Loading.standard("در حال بارگذاری");

    const userInfoData = await fetchData(
      process.env.REACT_APP_GET_USER_URL,
      options
    );
    console.log(userInfoData);
    if (userInfoData.userInfo) {
      form1.current.classList.toggle("hidden");
      form2.current.classList.toggle("hidden");
      setIsCellNumExists(true);
      setUserInfo(userInfoData.userInfo);
    } else {
      setIsCellNumExists(false);
      Notify.failure("شماره وارد شده موجود نمی باشد!");
      cellNumInput.current.value = "";
      setCanLogin();
    }
    Loading.remove();
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
  // -----------------------------

  function backBtnHandler() {
    form1.current.classList.toggle("hidden");
    form2.current.classList.toggle("hidden");
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
            <form onSubmit={(event) => handleChangeForm(event)}>
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
          {/* {isCellNumExists === false &&
            Notify.failure("شماره وارد شده موجود نمی باشد!")} */}
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
                  onSubmit={(event) => handlePasswordSubmit(event)}
                  className="d-none"
                >
                  <input
                    ref={passwordInput}
                    type="text"
                    name="password"
                    id="password"
                    className="active form-control rounded-pill mt-3 py-3"
                    placeholder="رمز عبور خود را وارد کنید"
                    onKeyUp={(event) => passHandler(event)}
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
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <input
                    ref={disposableInput}
                    className="disabled form-control rounded-pill mt-3 py-3 px-4 "
                    type="text"
                    placeholder="کد دریافتی را وارد کنید ..."
                    name="disposable-pass"
                    id="disposable-pass-input"
                    onKeyUp={(event) => disposablePassHandler(event)}
                  />
                  <button
                    ref={disposableSender}
                    className="d-none btn-royal-bold w-100 mt-3 rounded-pill py-3"
                    id="disposable-pass-sender"
                    type="submit"
                  >
                    ورود
                  </button>
                  <button
                    ref={disposableGetter}
                    className="btn-royal-bold w-100 mt-3 rounded-pill py-3"
                    id="disposable-pass-getter"
                    onClick={(event) => handleDisposableSMS(event)}
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

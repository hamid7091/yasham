import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import Select from "react-select";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import EditPen from "../assets/svg-icons/EditPen";

const AddUser = () => {
  const accessToken = window.localStorage.getItem("AccessToken");

  const avatar = useRef(null);
  const avatarInput = useRef(null);

  const [rolesList, setRolesList] = useState();
  const [businessList, setBusinessList] = useState();

  const addUserURL = "Add User URL";
  const addUserHeader = new Headers();
  addUserHeader.append("Authorization", `Bearer ${accessToken}`);
  const addUserFormdata = new FormData();

  const getInitialInfoURL = "Get Initial Info URL";
  const getInitialInfoRequestOptions = {
    method: "POST",
    headers: addUserHeader,
    redirect: "follow",
  };

  const mockResponse = {
    mockRolesList: [
      {
        name: "گچ کار",
        id: 1,
      },
      {
        name: "مشتری",
        id: 2,
      },
      {
        name: "سوپروایزر",
        id: 3,
      },
      {
        name: "کارمند",
        id: 4,
      },
      {
        name: "نقاش",
        id: 5,
      },
      {
        name: "پیک",
        id: 6,
      },
      {
        name: "انباردار",
        id: 7,
      },
    ],

    mockBusinessList: [
      { name: "کلینیک یک", id: 1 },
      { name: "کلینیک دو", id: 2 },
      { name: "کلینیک سه", id: 3 },
      { name: "کلینیک چهار", id: 4 },
      { name: "کلینیک پنج", id: 5 },
      { name: "کلینیک شش", id: 6 },
    ],
  };
  const getInitialInfo = async (url, options) => {
    Loading.standard("در حال ایجاد فرم");
    // const response = await fetchData(url, options)
    const response = mockResponse;

    setRolesList(response.mockRolesList);
    setBusinessList(response.mockBusinessList);
    Loading.remove();
  };

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#2f66db" : "#79a3fe",
      backgroundColor: state.isSelected ? "#b8cfff" : "#fff)",
      padding: "8px",
      fontWeight: "bold",
      ":hover": {
        backgroundColor: "#dee7fa",
        color: "var(--blue-royal)",
      },
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      borderRadius: "10rem",
      paddingInline: "8px",
      paddingBlock: "4px",
      border: "none",
      ":hover": {
        border: "2px solid var( --blue-royal)",
      },
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      fontWeight: "bold",
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--gray-very-light)",
      fontWeight: "bold",
      fontSize: "14px",
    }),
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      ":hover": {
        color: "var(--blue-royal-light)",
      },
      backgroundColor: "var(--blue-royal-very-light)",
      padding: "3px",
      marginRight: "5px",
      borderRadius: "6px",
    }),
    clearIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      ":hover": {
        color: "var(--blue-royal-light)",
      },
    }),
    menuList: (defaultStyles) => ({
      ...defaultStyles,
      borderRadius: "8px",
      border: "2px solid var( --blue-royal)",
    }),
    input: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      fontSize: "16px",
    }),
    multiValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      borderRadius: "10px",
      fontWeight: "bold",
      paddingRight: "10px",
    }),
    multiValueRemove: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "var(--blue-royal-light)",
      borderRadius: "50%",
      padding: "2px",
      margin: "5px",
    }),
  };

  const [userAvatar, setUserAvatar] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userRole, setUserRole] = useState();
  const [businessID, setBusinessID] = useState();
  const [userTel, setUserTel] = useState();
  const [password, setPassword] = useState();

  const [avatarIsChanged, setAvatarIsChanged] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState();
  const [lastNameIsValid, setLastNameIsValid] = useState();
  const [userTelIsValid, setUserTelIsValid] = useState();
  const [passwordIsValid, setPasswordIsvalid] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    Loading.standard("در حال ارسال درخواست");

    addUserFormdata.append("firstName", userFirstName);
    addUserFormdata.append("lastName", userLastName);
    addUserFormdata.append("role", userRole.value);
    userRole.value === 2 &&
      addUserFormdata.append("business", businessID.value);
    addUserFormdata.append("mobile", userTel);
    addUserFormdata.append("password", password);

    const addUserRequestOptions = {
      method: "POST",
      headers: addUserHeader,
      body: addUserFormdata,
      redirect: "follow",
    };
    const response = await fetchData(addUserURL, addUserRequestOptions);
    console.log(userFirstName);
    console.log(userLastName);
    console.log(userRole);
    console.log(businessID);
    console.log(userTel);
    console.log(password);
    Loading.remove();
  };

  const listConvertor = (list) => {
    const formatedList = [];
    list.forEach((item) => {
      formatedList.push({ label: item.name, value: item.id });
    });
    return formatedList;
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
  const handleFirstNameValidation = (e) => {
    // console.log(e.target.value);
    if (e.target.value) {
      setFirstNameIsValid(true);
      setUserFirstName(e.target.value);
    } else {
      setFirstNameIsValid();
      setUserFirstName(e.target.value);
    }
  };
  const handleLastNameValidation = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      setLastNameIsValid(true);
      setUserLastName(e.target.value);
    } else {
      setLastNameIsValid();
      setUserLastName(e.target.value);
    }
  };
  const handleMobileValidation = (e) => {
    if (e.target.value) {
      setUserTelIsValid(true);
      setUserTel(e.target.value);
    } else {
      setUserTelIsValid();
      setUserTel(e.target.value);
    }
  };
  const handlePasswordValidation = (e) => {
    const passwordPattern = /^[\w]{8,24}$/;
    if (e.target.value) {
      if (passwordPattern.test(e.target.value)) {
        setPassword(e.target.value);
        setPasswordIsvalid(true);
      } else {
        setPasswordIsvalid(false);
      }
    } else {
      setPasswordIsvalid();
    }
  };

  useEffect(() => {
    getInitialInfo(getInitialInfoURL, getInitialInfoRequestOptions);
  }, []);

  //   console.log(userRole);

  return (
    rolesList && (
      <div className="container px-3" dir="rtl">
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
          <div className="bold-xlarge">ثبت کاربر جدید</div>
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
            <label htmlFor="first-name" className="bold500-large mb-2 pe-3 ">
              {" "}
              نام{" "}
              <span
                className={`text-danger ${
                  firstNameIsValid === false ? "" : "d-none"
                }`}
              >
                (ورود نام الزامی است)
              </span>
            </label>
            <input
              required
              type="text"
              name="first-name"
              className={`form-control rounded-pill mb-3 py-2 ${
                firstNameIsValid === false
                  ? "is-invalid"
                  : firstNameIsValid === true
                  ? "is-valid"
                  : ""
              }`}
              id="first-name"
              placeholder="نام را وارد کنید"
              onChange={(event) => handleFirstNameValidation(event)}
            />
            <label htmlFor="last-name" className="bold500-large mb-2 pe-3">
              نام خانوادگی{" "}
              <span
                className={`text-danger ${
                  lastNameIsValid === false ? "" : "d-none"
                }`}
              >
                (ورود نام خانوادگی الزامی است)
              </span>
            </label>
            <input
              required
              type="text"
              name="last-name"
              className={`form-control rounded-pill mb-3 py-2 ${
                lastNameIsValid === false
                  ? "is-invalid"
                  : lastNameIsValid === true
                  ? "is-valid"
                  : ""
              }`}
              id="last-name"
              placeholder="نام خانوادگی را وارد کنید"
              onChange={(event) => handleLastNameValidation(event)}
            />
            {/* ========================================================= */}

            <label htmlFor="user-role" className="bold500-large mb-2 pe-3">
              نقش
            </label>
            <Select
              required
              id="user-role"
              name="user-role"
              value={userRole}
              onChange={setUserRole}
              options={listConvertor(rolesList)}
              placeholder="انتخاب کنید"
              styles={customStyles}
              isClearable
              // isMulti
              // hideSelectedOptions={false}
            />

            {/* ========================================================= */}

            {userRole?.value === 2 && (
              <>
                <label
                  htmlFor="business"
                  className="bold500-large mb-2 mt-3 pe-3"
                >
                  کسب و کار (مشتری)
                </label>
                <Select
                  required={userRole?.value === 2 ? true : false}
                  id="business"
                  name="business"
                  value={businessID}
                  onChange={setBusinessID}
                  options={listConvertor(businessList)}
                  placeholder="انتخاب کنید"
                  styles={customStyles}
                  isClearable
                  // isMulti
                  // hideSelectedOptions={false}
                />
              </>
            )}

            {/* ========================================================= */}
            <label htmlFor="mobile" className="bold500-large mb-2 mt-3 pe-3">
              شماره تماس{" "}
              <span
                className={`text-danger ${
                  userTelIsValid === false ? "" : "d-none"
                }`}
              >
                (ورود شماره تماس الزامی است)
              </span>
            </label>
            <input
              required
              maxLength={10}
              type="number"
              name="mobile"
              className={`form-control rounded-pill mb-3 py-2 ${
                userTelIsValid === false
                  ? "is-invalid"
                  : userTelIsValid === true
                  ? "is-valid"
                  : ""
              }`}
              id="mobile"
              placeholder="شماره تماس را وارد کنید"
              onChange={(event) => handleMobileValidation(event)}
            />

            <label htmlFor="password" className="bold500-large mb-2 pe-3">
              رمز عبور{" "}
              <span
                className={`text-danger ${
                  passwordIsValid === false ? "" : "d-none"
                }`}
              >
                انتخاب رمز عبور حداقل 8 رقمی الزامی است
              </span>
            </label>
            <input
              required
              onChange={(event) => handlePasswordValidation(event)}
              type="password"
              name="password"
              className={`form-control rounded-pill mb-3 py-2 ${
                passwordIsValid === false
                  ? "is-invalid"
                  : passwordIsValid === true
                  ? "is-valid"
                  : ""
              }`}
              id="password"
              placeholder="رمز عبور را وارد کنید"
            />
            <button
              type="submit"
              className="btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
            >
              ثبت کاربر
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddUser;

import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import EditPen from "../assets/svg-icons/EditPen";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import SingleHeader from "./SingleHeader";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import defImg from "../assets/svg-pics/userDefaultPic.svg";

const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const avatar = useRef(null);
  const avatarInput = useRef(null);

  const [rolesList, setRolesList] = useState();
  const [businessList, setBusinessList] = useState();

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "var(--gray-dark)" : "var(--gray)",
      backgroundColor: state.isSelected ? "var(--gray-ultra-light)" : "#fff)",
      padding: "8px",
      fontWeight: "bold",
      ":not(:last-child)": {
        borderBottom: "2px solid var(--gray-ultra-light)",
      },
      ":hover": {
        color: "#000",
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
        border: "1px solid var( --blue-royal)",
      },
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--gray-dark)",
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
      marginRight: "8px",
      marginLeft: "8px",
      marginBlock: "4px",
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
      borderRadius: "4px",
      paddingInline: "10px",
    }),
    input: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--gray-dark)",
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
    menu: (defaultStyles) => ({
      ...defaultStyles,
      width: "90%",
      marginRight: "5%",
      border: "none",
    }),
    indicatorSeparator: (defaultStyles) => ({
      ...defaultStyles,
      display: "none",
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

  const [userRoles, setUserRoles] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [
    isEmployee,
    isClient,
    isSupervisor,
    isShipping,
    isInventory,
    isPManager,
    isFManager,
    isReception,
  ] = useRoleSetter(userRoles);

  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();

  const getInitInfo = async () => {
    try {
      Loading.standard("در حال ایجاد فرم");
      const response = await axiosInstance.post("/user/roles");

      setRolesList(response.data.roles);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getBusinessList = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/client/client-list");
      setBusinessList(response.data.response.cards);
      console.log(response.data.response);

      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const handleSubmitAxios = async (event) => {
    console.log(selectedDepartment);
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("firstName", userFirstName);
    formdata.append("lastName", userLastName);
    formdata.append("role", userRole.value);
    userRole.value === "client" &&
      formdata.append("business", businessID.value);
    userRole.value === "supervisor" &&
      formdata.append(
        "departmentIDs",
        JSON.stringify(
          selectedDepartment.map((department) => {
            return department.value;
          })
        )
      );
    formdata.append("mobile", userTel);
    formdata.append("userPassword", password);
    avatarIsChanged && formdata.append("userAvatar", userAvatar);

    console.log(Object.fromEntries(formdata));
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post("/user/add_user", formdata);
      console.log(response.data.response);
      Loading.remove();
      if (response.data.response) {
        Notify.success(response.data.response[0]);
        navigate(location.state);
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
      Notify.failure(error.response.data.message);
    }
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      // const response = {
      //   data: {
      //     response: {
      //       userInfo: {
      //         mobile: "9360390099",
      //         userAvatar:
      //           "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //         userCaps: {
      //           اطلاعیه: true,
      //           پروفایل: true,
      //           "لیست سفارشات": true,
      //           "کسب و کارها": true,
      //         },
      //         userFirstName: "حمید",
      //         userID: 123,
      //         userLastName: "مدیر مالی",
      //         userRole: ["financial_manager"],
      //       },
      //     },
      //   },
      // };
      setUserRoles(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };
  const getDepartments = async () => {
    try {
      const response = await axiosInstance.post("/department/get_all");
      console.log(response.data.response.departments);
      setDepartmentList(response.data.response.departments);
    } catch (error) {
      console.error(error);
    }
  };

  const listConvertor = (list, labelPropertyName, valuePropertyName) => {
    const formattedList = [];
    list?.forEach((item) => {
      const { [labelPropertyName]: label, [valuePropertyName]: value } = item;
      formattedList.push({ label, value });
    });
    return formattedList;
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
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getInitInfo();
      getBusinessList();
      getUser();
      getDepartments();
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      !isReception && navigate("/unauthorized");
    }
  }, [isReception]);

  console.log(userRole);

  return (
    rolesList && (
      <div className="container px-3 mt-100" dir="rtl">
        <SingleHeader title={"ثبت کاربر جدید"} location={location.state} />
        <div>
          <form className="edit-form mt-5 pb-4" onSubmit={handleSubmitAxios}>
            <div className="text-center d-flex flex-column justify-content-center align-items-center">
              <div>
                <img
                  ref={avatar}
                  className="avatar-svg-image"
                  src={defImg}
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
              autoComplete="off"
              autoCorrect="off"
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
              autoComplete="off"
              autoCorrect="off"
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
              options={listConvertor(rolesList, "label", "value")}
              placeholder="انتخاب کنید"
              styles={customStyles}
              isClearable
              // isMulti
              // hideSelectedOptions={false}
            />

            {/* ========================================================= */}

            {userRole?.value === "client" && (
              <>
                <label
                  htmlFor="business"
                  className="bold500-large mb-2 mt-3 pe-3"
                >
                  کسب و کار (مشتری)
                </label>
                <Select
                  required={userRole?.value === "client" ? true : false}
                  id="business"
                  name="business"
                  value={businessID}
                  onChange={setBusinessID}
                  options={listConvertor(
                    businessList,
                    "businessName",
                    "businessID"
                  )}
                  placeholder="انتخاب کنید"
                  styles={customStyles}
                  isClearable
                  // isMulti
                  // hideSelectedOptions={false}
                />
              </>
            )}
            {userRole?.value === "supervisor" && (
              <>
                <label
                  htmlFor="business"
                  className="bold500-large mb-2 mt-3 pe-3"
                >
                  دپارتمان مربوطه
                </label>
                <Select
                  required={userRole?.value === "supervisor" ? true : false}
                  id="department"
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  options={departmentList}
                  placeholder="انتخاب کنید"
                  styles={customStyles}
                  isClearable
                  isMulti
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
              autoComplete="off"
              autoCorrect="off"
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

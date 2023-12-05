import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import fetchData from "../util-functions/fetchData";

import Select from "react-select";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import EditPen from "../assets/svg-icons/EditPen";
import useRoleSetter from "../micro-components/useRoleSetter";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";

const EditUser = () => {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const avatar = useRef(null);
  const avatarInput = useRef(null);

  const [rolesList, setRolesList] = useState();
  const [businessList, setBusinessList] = useState();

  const [userAvatar, setUserAvatar] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userRole, setUserRole] = useState();
  const [businessID, setBusinessID] = useState();
  const [userTel, setUserTel] = useState();
  const [password, setPassword] = useState();

  const [avatarIsChanged, setAvatarIsChanged] = useState(false);
  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [lastNameIsValid, setLastNameIsValid] = useState(true);
  const [userTelIsValid, setUserTelIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsvalid] = useState(true);

  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();

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
  const [userInfo, setUserInfo] = useState();

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
  const getInitInfo = async () => {
    try {
      Loading.standard("در حال ایجاد فرم");
      const response = await axiosInstance.post("/user/roles");
      // const response = mockResponse;
      console.log(response.data);
      setRolesList(response.data.roles);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getUserData = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/user/get_user", {
        userID: param.id,
      });
      Loading.remove();
      console.log(response.data.response);

      setUserAvatar(response.data.response.userInfo.userAvatar);
      setUserFirstName(response.data.response.userInfo.userFirstName);
      setUserLastName(response.data.response.userInfo.userLastName);
      setUserTel(response.data.response.userInfo.mobile);
      setUserInfo(response.data.response.userInfo);
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      setUserRoles(response.data.response.userInfo.userRole);
      setIsLoading(false);
      //console.log(response.data.response);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    firstNameIsValid && formdata.append("userFirstName", userFirstName);
    lastNameIsValid && formdata.append("userLastName", userLastName);
    userTelIsValid && formdata.append("mobile", userTel);
    passwordIsValid && password && formdata.append("userPassword", password);
    avatarIsChanged && formdata.append("userAvatar", userAvatar);
    userRole && formdata.append("role", userRole.value);
    userRole.value === "supervisor" &&
      formdata.append(
        "departmentIDs",
        JSON.stringify(
          selectedDepartment.map((department) => {
            return department.value;
          })
        )
      );
    businessID.value && formdata.append("business", businessID.value);
    formdata.append("userID", userInfo.userID);
    console.log(Object.fromEntries(formdata));
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post(
        "/user/update_profile",
        formdata
      );
      console.log(response.data.response);
      Loading.remove();
      if (response.data.response) {
        Notify.success(response.data.response);
        navigate(`/user/${param.id}`);
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
      Notify.failure("خطا ! لطفا مجددا تلاش کنید");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      !isReception && navigate("/unauthorized");
    }
  }, [isReception]);
  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getUserData();
      getUser();
      getBusinessList();
      getInitInfo();
      getDepartments();
    }
  }, []);
  useEffect(() => {
    console.log(rolesList, businessList, userInfo);
    if (rolesList && businessList) {
      console.log("fired");
      setUserRole(roleFinder(userInfo?.userRole, rolesList));
      setBusinessID(businessFinder(userInfo?.businessName, businessList));
    }
  }, [userInfo, rolesList, businessList]);

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
  const roleFinder = (item, list) => {
    let roleObject = {};

    list?.forEach((role, index) => {
      if (role.label === item[0]) {
        roleObject = {
          label: role.label,
          value: role.value,
        };
      }
    });
    return roleObject;
  };
  const businessFinder = (item, list) => {
    let businessObject = {};
    list?.forEach((business, index) => {
      if (business.businessName == item) {
        businessObject = {
          label: business.businessName,
          value: business.businessID,
        };
      }
    });
    return businessObject;
  };

  return (
    userRole &&
    businessID && (
      <div className="container px-3 mt-100" dir="rtl">
        <SingleHeader
          title={"ویرایش اطلاعات کاربر"}
          location={location.state}
        />
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
                  src={userAvatar}
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
              defaultValue={userFirstName}
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
              defaultValue={userLastName}
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
              onChange={(value) => {
                setUserRole(value);
                console.log(value);
              }}
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
                  htmlFor="department"
                  className="bold500-large mb-2 mt-3 pe-3"
                >
                  دپارتمان مربوطه
                </label>
                <Select
                  required={userRole?.value === "supervisor" ? true : false}
                  id="department"
                  value={selectedDepartment}
                  onChange={(value) => {
                    setSelectedDepartment(value);
                    console.log(value);
                  }}
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
              defaultValue={userTel}
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
              defaultValue={password}
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

export default EditUser;

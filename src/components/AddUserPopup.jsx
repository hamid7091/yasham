import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import Select from "react-select";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axiosInstance from "../util-functions/axiosInstance";

const AddUserPopup = ({ isPopupActive, clientID }) => {
  const [selectedUser, setSelectedUser] = useState();
  const [allUsers, setAllUsers] = useState();
  const [reformattedUsers, setReformattedUsers] = useState([]);
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

  const getOrphanUsers = async () => {
    try {
      const response = await axiosInstance.post("/user/orphan_clients");
      console.log(response.data);
      setAllUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const reformatUser = () => {
    allUsers?.forEach((user) => {
      setReformattedUsers((prevUsers) => [
        ...prevUsers,
        {
          label: user.userName,
          value: user.userID,
        },
      ]);
    });
  };

  const handleAddNewUserAxios = async () => {
    console.log(selectedUser.value, clientID);
    const formdata = new FormData();
    formdata.append("userID", selectedUser.value);
    formdata.append("clientID", clientID);
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post(
        "/client/add_employee",
        formdata
      );

      Loading.remove();
      if (response.data.response) {
        Notify.success(response.data.response.response);
        isPopupActive(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
      isPopupActive(false);
      Notify.failure("مشکلی پیش آمده ! مجددا تلاش کنید");
    }
  };

  useEffect(() => {
    getOrphanUsers();
  }, []);
  useEffect(() => {
    reformatUser();
  }, [allUsers]);

  const handleClosePopup = () => {
    isPopupActive(false);
  };
  return (
    <div dir="rtl" className="end-task-popup bg-light rounded-5 px-4 py-4">
      <div className="d-flex justify-content-between align-items-center">
        <p className="bold-xxlarge mb-0">افزودن کاربر جدید</p>
        <span className="has-pointer" onClick={handleClosePopup}>
          <CloseIcon />
        </span>
      </div>
      <hr />
      <div>
        <label htmlFor="userName" className="bold500-large my-3 pe-3">
          کاربر جدید
        </label>
        <Select
          id="userName"
          name="userName"
          value={selectedUser}
          onChange={setSelectedUser}
          options={reformattedUsers}
          placeholder="انتخاب کنید"
          styles={customStyles}
          noOptionsMessage={() => {
            return "کاربری وجود ندارد";
          }}
          isClearable
        />
      </div>
      <button
        className="btn-royal-bold rounded-pill flex-grow-1 py-3 mt-3"
        disabled={selectedUser ? false : true}
        onClick={handleAddNewUserAxios}
      >
        افزودن
      </button>
    </div>
  );
};

export default AddUserPopup;

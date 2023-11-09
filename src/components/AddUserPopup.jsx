import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import Select from "react-select";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const AddUserPopup = ({ isPopupActive }) => {
  const accessToken = window.localStorage.getItem("AccessToken");

  const [selectedUser, setSelectedUser] = useState();
  const [allUsers, setAllUsers] = useState();
  const [reformattedUsers, setReformattedUsers] = useState([]);
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

  const getAllUsersURL = "get Users URL";
  const addNewUserURL = "Add New User URL";
  const getAllUsersHeader = new Headers();
  const addNewUserHeader = new Headers();
  getAllUsersHeader.append("Authorization", `Bearer ${accessToken}`);
  addNewUserHeader.append("Authorization", `Bearer ${accessToken}`);
  const addNewUserFormdata = new FormData();
  addNewUserFormdata.append("userID", selectedUser);
  const getAllUsersRequestOptions = {
    method: "POST",
    headers: getAllUsersHeader,
    redirect: "follow",
  };
  const mockAllUsersData = {
    users: [
      {
        userID: 1,
        userName: "علی قناتی",
      },
      {
        userID: 2,
        userName: "2علی قناتی",
      },
      {
        userID: 3,
        userName: "3علی قناتی",
      },
    ],
  };

  const getAllUsers = async () => {
    // const response = await fetchData(getAllUsersURL,getAllUsersRequestOptions),
    const response = mockAllUsersData;
    setAllUsers(response.users);
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

  const handleAddNewUser = async () => {
    Loading.standard("در حال ارسال درخواست");
    addNewUserFormdata.append("userID", selectedUser.value);
    const addNewUserRequestOptions = {
      method: "POST",
      headers: addNewUserHeader,
      body: addNewUserFormdata,
      redirect: "follow",
    };
    const response = await fetchData(addNewUserURL, addNewUserRequestOptions);
    if (response.success) {
      Loading.remove();
      isPopupActive(false);
      Notify.success("کاربر با موفقیت افزوده شد");
    } else {
      Loading.remove();
      isPopupActive(false);
      Notify.failure("مشکلی پیش آمده ! مجددا تلاش کنید");
    }

    console.log(selectedUser);
  };

  useEffect(() => {
    getAllUsers();
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
          isClearable
          // isMulti
          // hideSelectedOptions={false}
        />
      </div>
      <button
        className="btn-royal-bold rounded-pill flex-grow-1 py-3 mt-3"
        disabled={selectedUser ? false : true}
        onClick={handleAddNewUser}
      >
        افزودن
      </button>
    </div>
  );
};

export default AddUserPopup;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import ReceptionUserCard from "./ReceptionUserCard";
import AddIcon from "../assets/svg-icons/AddIcon";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";
import useRoleSetter from "../micro-components/useRoleSetter";

const UserList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState();
  const [userRole, setUserRole] = useState();
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
  ] = useRoleSetter(userRole);

  const mockAllUsersData = {
    users: [
      {
        userName: "علی قناتی",
        userID: "12",
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      },
      {
        userName: "1علی قناتی",
        userID: "13",
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      },
      {
        userName: "2علی قناتی",
        userID: "14",
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      },
      {
        userName: "3علی قناتی",
        userID: "15",
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      },
      {
        userName: "4علی قناتی",
        userID: "16",
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      },
      {
        userName: "5علی قناتی",
        userID: "17",
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      },
      {
        userName: "6علی قناتی",
        userID: "18",
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      },
      {
        userName: "7علی قناتی",
        userID: "19",
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      },
    ],
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
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsersData = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/user/get_users_list");
      //const response = mockAllUsersData.users;
      console.log(response.data);
      setAllUsers(response.data.response.users);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getUsersData();
      getUser();
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      !isReception && navigate("/unauthorized");
    }
  }, [isReception]);

  const handleRedirect = () => {
    navigate("/addUser", { state: location.pathname });
  };

  return (
    allUsers && (
      <div className="container px-3 mt-100" dir="rtl">
        <SingleHeader title={"کاربران"} location={"/"} />
        {allUsers.map((data, index) => {
          return <ReceptionUserCard data={data} key={index} />;
        })}
        <span
          className="drop-shadow has-pointer fixed-bottom-30"
          onClick={handleRedirect}
        >
          <AddIcon />
        </span>
      </div>
    )
  );
};

export default UserList;

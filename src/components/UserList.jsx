import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import fetchData from "../util-functions/fetchData";
import ReceptionUserCard from "./ReceptionUserCard";
import AddIcon from "../assets/svg-icons/AddIcon";

const UserList = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const getAllUsersURL = "Get All Users URL";
  const getAllUsersHeader = new Headers();
  getAllUsersHeader.append("Authorization", `Bearer ${accessToken}`);
  const getAllUsersRequestOptions = {
    method: "POST",
    headers: getAllUsersHeader,
    redirect: "follow",
  };
  const [allUsers, setAllUsers] = useState();

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

  const getAllUsers = async (url, options) => {
    Loading.standard("در حال دریافت اطلاعات");
    // const response = await fetchData(url, options);
    const response = mockAllUsersData.users;
    setAllUsers(response);
    Loading.remove();
  };

  useEffect(() => {
    getAllUsers(getAllUsersURL, getAllUsersRequestOptions);
  }, []);

  const handleRedirect = () => {
    navigate("/addUser");
  };

  return (
    allUsers && (
      <div className="container px-3" dir="rtl">
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
          <div className="bold-xlarge">کاربران</div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>
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

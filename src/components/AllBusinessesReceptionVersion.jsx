import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import ReceptionBusinessCard from "./ReceptionBusinessCard";
import AddIcon from "../assets/svg-icons/AddIcon";
import useRoleSetter from "../micro-components/useRoleSetter";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";
import Message from "../micro-components/Message";

const AllBusinessesReceptionVersion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [businessesData, setBusinessesData] = useState();

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

  const handleRedirect = () => {
    navigate("/addBusiness", { state: location.pathname });
  };

  const getBusinessList = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/client/client-list");
      setBusinessesData(response.data.response.cards);
      console.log(response.data.response);

      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
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
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getUser();
      getBusinessList();
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      !isReception && navigate("/unauthorized");
    }
  }, [isReception]);

  console.log(businessesData);
  return (
    businessesData && (
      <div className="container px-3 mt-100" dir="rtl">
        <SingleHeader title={"لیست کسب و کارها"} location={"/"} />
        {businessesData.length ? (
          businessesData.map((data, index) => {
            return <ReceptionBusinessCard data={data} key={index} />;
          })
        ) : (
          <Message>کسب و کاری ثبت نشده است</Message>
        )}

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

export default AllBusinessesReceptionVersion;

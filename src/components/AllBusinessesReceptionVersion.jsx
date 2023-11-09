import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import fetchData from "../util-functions/fetchData";
import ReceptionBusinessCard from "./ReceptionBusinessCard";
import AddIcon from "../assets/svg-icons/AddIcon";

const AllBusinessesReceptionVersion = () => {
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("AccessToken");
  const [businessesData, setBusinessesData] = useState();
  const mockResponse = {
    cards: [
      {
        businessAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        businessName: "کلینیک حسن",
        businessID: "1",
        orderCount: 25,
        income: 25000000,
        profit: 15000000,
      },
      {
        businessAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        businessName: "کلینیک حسین",
        businessID: "2",
        orderCount: 20,
        income: 20000000,
        profit: 10000000,
      },
      {
        businessAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        businessName: "کلینیک محمود",
        businessID: "3",
        orderCount: 18,
        income: 19000000,
        profit: 10000000,
      },
      {
        businessAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        businessName: "کلینیک رضا",
        businessID: "4",
        orderCount: 15,
        income: 14000000,
        profit: 10000000,
      },
      {
        businessAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        businessName: "کلینیک حسن",
        businessID: "1",
        orderCount: 25,
        income: 25000000,
        profit: 15000000,
      },
      {
        businessAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        businessName: "کلینیک حسین",
        businessID: "2",
        orderCount: 20,
        income: 20000000,
        profit: 10000000,
      },
      {
        businessAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        businessName: "کلینیک محمود",
        businessID: "3",
        orderCount: 18,
        income: 19000000,
        profit: 10000000,
      },
      {
        businessAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        businessName: "کلینیک رضا",
        businessID: "4",
        orderCount: 15,
        income: 14000000,
        profit: 10000000,
      },
    ],
  };

  const getAllBusinessesURL = "some URL";
  const getAllBusinessesHeader = new Headers();
  getAllBusinessesHeader.append("Authorization", `Bearer ${accessToken}`);
  const getAllBusinessesRequestOptions = {
    method: "POST",
    headers: getAllBusinessesHeader,
    redirect: "follow",
  };
  const getAllBusinesses = async (url, options) => {
    Loading.standard("در حال دریافت اطلاعات");
    // const response = await fetchData(url, options);
    const response = mockResponse.cards;
    setBusinessesData(response);
    console.log(response);
    Loading.remove();
  };
  const handleRedirect = () => {
    navigate("/addBusiness");
  };

  useEffect(() => {
    getAllBusinesses(getAllBusinessesURL, getAllBusinessesRequestOptions);
  }, []);
  console.log(businessesData);
  return (
    businessesData && (
      <div className="container px-3" dir="rtl">
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
          <div className="bold-xlarge">لیست کسب و کارها</div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>
        {businessesData.map((data, index) => {
          return <ReceptionBusinessCard data={data} key={index} />;
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

export default AllBusinessesReceptionVersion;

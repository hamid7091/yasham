import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import fetchData from "../util-functions/fetchData";
import PackageCard from "./PackageCard";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const AllDeliveryTasks = () => {
  const mockPackagesData = {
    userInfo: {
      mobile: "9360390088",
      userAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      userCaps: {
        "لیست کاربران": true,
        "کسب و کارها": true,
        اطلاعیه: true,
        پروفایل: true,
        "وظایف پیک": true,
      },
      userFirstName: "حمید",
      userID: 123,
      userLastName: "منشی نژاد",
      userRole: ["reception"],
    },
    packages: {
      106: {
        clientDetails: {
          clientName: "دمو123",
          clientAddress: "ارومیه مسجد شیخ",
          clientPhone: "0441212121",
          clientAvatar:
            "https://samane.zbbo.net/wp-content/uploads/2023/10/220220152119-150x150.jpg",
        },
        sent: [
          {
            taskID: 436,
            taskType: "Cro-Cobalt Partial",
          },
          {
            taskID: 437,
            taskType: "some shity task",
          },
          {
            taskID: 438,
            taskType: "Implant",
          },
        ],
        receive: [
          {
            taskID: 440,
            taskType: "PMMA",
          },
        ],
      },
      110: {
        clientDetails: {
          clientName: "دمو123",
          clientAddress: "ارومیه مسجد شیخ",
          clientPhone: "0441212121",
          clientAvatar:
            "https://samane.zbbo.net/wp-content/uploads/2023/10/220220152119-150x150.jpg",
        },
        sent: [
          {
            taskID: 436,
            taskType: "Cro-Cobalt Partial",
          },
        ],
        receive: [
          {
            taskID: 440,
            taskType: "PMMA",
          },
        ],
      },
      113: {
        clientDetails: {
          clientName: "دمو123",
          clientAddress: "ارومیه مسجد شیخ",
          clientPhone: "0441212121",
          clientAvatar:
            "https://samane.zbbo.net/wp-content/uploads/2023/10/220220152119-150x150.jpg",
        },
        sent: [
          {
            taskID: 436,
            taskType: "Cro-Cobalt Partial",
          },
        ],
        receive: [
          {
            taskID: 440,
            taskType: "PMMA",
          },
        ],
      },
      116: {
        clientDetails: {
          clientName: "دمو123",
          clientAddress: "ارومیه مسجد شیخ",
          clientPhone: "0441212121",
          clientAvatar:
            "https://samane.zbbo.net/wp-content/uploads/2023/10/220220152119-150x150.jpg",
        },
        sent: [
          {
            taskID: 436,
            taskType: "Cro-Cobalt Partial",
          },
        ],
        receive: [
          {
            taskID: 440,
            taskType: "PMMA",
          },
        ],
      },
      119: {
        clientDetails: {
          clientName: "دمو123",
          clientAddress: "ارومیه مسجد شیخ",
          clientPhone: "0441212121",
          clientAvatar:
            "https://samane.zbbo.net/wp-content/uploads/2023/10/220220152119-150x150.jpg",
        },
        sent: [
          {
            taskID: 436,
            taskType: "Cro-Cobalt Partial",
          },
        ],
        receive: [
          {
            taskID: 440,
            taskType: "PMMA",
          },
        ],
      },
      121: {
        clientDetails: {
          clientName: "دمو123",
          clientAddress: "ارومیه مسجد شیخ",
          clientPhone: "0441212121",
          clientAvatar:
            "https://samane.zbbo.net/wp-content/uploads/2023/10/220220152119-150x150.jpg",
        },
        sent: [
          {
            taskID: 436,
            taskType: "Cro-Cobalt Partial",
          },
        ],
        receive: [
          {
            taskID: 440,
            taskType: "PMMA",
          },
        ],
      },
      132: {
        clientDetails: {
          clientName: "دمو123",
          clientAddress: "ارومیه مسجد شیخ",
          clientPhone: "0441212121",
          clientAvatar:
            "https://samane.zbbo.net/wp-content/uploads/2023/10/220220152119-150x150.jpg",
        },
        sent: [
          {
            taskID: 436,
            taskType: "Cro-Cobalt Partial",
          },
        ],
        receive: [
          {
            taskID: 440,
            taskType: "PMMA",
          },
        ],
      },
    },
  };

  const accessToken = window.localStorage.getItem("AccessToken");

  const [allpackagesData, setAllPackagesData] = useState();
  //   ------------------------------------------------------
  let packagesKeys = {};
  let packagesValues = {};
  let packagesArray = [];

  if (allpackagesData) {
    packagesKeys = Object.keys(allpackagesData);
    packagesValues = Object.values(allpackagesData);
    packagesKeys.forEach((key, index) => {
      packagesArray.push({
        clientID: key,
        packages: packagesValues[index],
      });
    });
  }
  //   ------------------------------------------------------

  const getAllPackagesURL = "some URL";
  const getAllPackagesHeader = new Headers();
  getAllPackagesHeader.append("Authorization", `Bearer ${accessToken}`);
  const getAllPackagesFormdata = new FormData();

  const getAllPackagesRequestOptions = {
    method: "POST",
    headers: getAllPackagesHeader,
    redirect: "follow",
  };
  const getPackagesData = async (url, options) => {
    Loading.standard("در حال دریافت اطلاعات");
    // const response = await fetchData(url, options);
    const response = mockPackagesData;
    setAllPackagesData(mockPackagesData.packages);

    console.log(response);
    Loading.remove();
  };

  useEffect(() => {
    getPackagesData(getAllPackagesURL, getAllPackagesRequestOptions);
  }, []);

  console.log(packagesArray);
  return (
    <div className="container px-3" dir="rtl">
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
        <div className="bold-xlarge">لیست وظایف پیک</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <section>
        {packagesArray.map((pkg, index) => {
          return (
            <PackageCard key={index} packageData={pkg} isFromShipping={true} />
          );
        })}
      </section>
    </div>
  );
};

export default AllDeliveryTasks;

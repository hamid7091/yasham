import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PackageCard from "./PackageCard";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";
import useRoleSetter from "../micro-components/useRoleSetter";
import Message from "../micro-components/Message";

const AllDeliveryTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [allpackagesData, setAllPackagesData] = useState();
  //   ------------------------------------------------------
  const [userRole, setUserRole] = useState();
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
  const [isLoading, setIsLoading] = useState(true);
  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const getPackageList = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/task/all_packages");
      console.log(response.data.response);
      setAllPackagesData(response.data.response.packages);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    }
    getPackageList();
    getUser();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      !isReception && navigate("/unauthorized");
    }
  }, [isReception]);

  return (
    allpackagesData && (
      <div className="container px-3 mt-100" dir="rtl">
        <SingleHeader title={"لیست وظایف پیک"} location={location.state} />
        <section>
          {allpackagesData.length ? (
            allpackagesData.map((pkg, index) => {
              return (
                <PackageCard
                  key={index}
                  packageData={pkg}
                  isFromShipping={true}
                />
              );
            })
          ) : (
            <Message>وظیفه ای ثبت نشده است</Message>
          )}
        </section>
      </div>
    )
  );
};

export default AllDeliveryTasks;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";
import useRoleSetter from "../micro-components/useRoleSetter";

const SingleUser = () => {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  const getUserData = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/user/get_user", {
        userID: param.id,
      });
      Loading.remove();
      console.log(response.data.response);
      setUserInfo(response.data.response.userInfo);
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
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
    }
  }, []);

  const handleRedirect = () => {
    navigate(`/editUser/${param.id}`, { state: location.pathname });
  };
  return (
    userInfo && (
      <div className="container px-3 mt-100" dir="rtl">
        <SingleHeader title={"کاربر"} location={location.state} />
        <section className="d-flex flex-column align-items-center gap-3 mb-5">
          <div>
            <img
              width={120}
              height={120}
              style={{ borderRadius: "50%" }}
              src={userInfo.userAvatar}
              alt=""
            />
          </div>
          <div>
            <span className="bold-xlarge">
              {userInfo.userName} {userInfo.userLastName}
            </span>
          </div>
        </section>
        <section>
          <div className="d-flex align-items-center justify-content-between mb-3 mx-3">
            <span className="bold-xxlarge">اطلاعات کاربر</span>
            <span
              className="grey-thin-bold has-pointer"
              onClick={handleRedirect}
            >
              ویرایش اطلاعات
            </span>
          </div>
          <div>
            <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
              <span className="royal-large">نام</span>
              <span className="grey-large-bold">{userInfo.userFirstName}</span>
            </div>
            <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
              <span className="royal-large">نام خانوادگی</span>
              <span className="grey-large-bold">{userInfo.userLastName}</span>
            </div>
            <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
              <span className="royal-large text-nowrap">نقش</span>
              <span className="grey-large-bold">{userInfo.userRole}</span>
            </div>
            {userInfo.businessName && (
              <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
                <span className="royal-large text-nowrap">کسب و کار</span>
                <span className="grey-large-bold">{userInfo.businessName}</span>
              </div>
            )}
            <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
              <span className="royal-large text-nowrap">شماره تماس</span>
              <span className="grey-large-bold">{userInfo.mobile}</span>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default SingleUser;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const SingleUser = () => {
  const param = useParams();
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("AccessToken");
  const getUserInfoURL = "Get User Info URL";
  const getUserInfoHeader = new Headers();
  getUserInfoHeader.append("Authorization", `Bearer ${accessToken}`);
  const getUserInfoFormdata = new FormData();
  getUserInfoFormdata.append("userID", param.id);
  const getUserInfoRequestOptions = {
    method: "POST",
    headers: getUserInfoHeader,
    body: getUserInfoFormdata,
    redirect: "follow",
  };
  const [userInfo, setUserInfo] = useState();

  const mockUserInfo = {
    userName: "علی",
    userLastName: "قنات محور",
    userRole: "گچ کار",
    userTel: "4433556698",
    businessName: "کلینیک محمود",
    userID: "21",
    userAvatar:
      "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
  };

  const getUserInfo = async (url, options) => {
    Loading.standard("در حال دریافت اطلاعات");
    // const response = await fetchData (url , options)
    const response = mockUserInfo;
    setUserInfo(response);
    Loading.remove();
  };

  useEffect(() => {
    getUserInfo(getUserInfoURL, getUserInfoRequestOptions);
  }, []);

  const handleRedirect = () => {
    navigate(`/editUser/${param.id}`);
  };
  return (
    userInfo && (
      <div className="container px-3" dir="rtl">
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
          <div className="bold-xlarge">کاربر</div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>
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
              <span className="grey-large-bold">{userInfo.userName}</span>
            </div>
            <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
              <span className="royal-large">نام کسب و کار</span>
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
              <span className="grey-large-bold">{userInfo.userTel}</span>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default SingleUser;

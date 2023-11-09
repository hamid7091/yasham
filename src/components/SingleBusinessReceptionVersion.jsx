import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import fetchData from "../util-functions/fetchData";
import BusinessUserCard from "./BusinessUserCard";
import PlusButton from "../assets/svg-icons/PlusButton";
import RemoveUserPopup from "./RemoveUserPopup";
import AddUserPopup from "./AddUserPopup";
import PopupBackground from "./PopupBackground";
import Message from "../micro-components/Message";

const SingleBusinessReceptionVersion = () => {
  const mockBusinessInfoResponse = {
    businessInfo: {
      businessName: "علی دین پرست",
      businessAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      businessContact: "04433443344",
      businessAddress: "یک آدرس مشخص در خیابان معلوم و کوچه مذکور",
      locations: "some shitty link to a shity location",
    },
    statusReport: {
      orderCount: "23",
      income: 25000000,
      profit: 15000000,
      debt: 11000000,
    },
    orders: [
      {
        orderID: "123456",
        patientName: "حمید قهرمانی",
        price: 1500000,
        date: "1402-09-22",
        invoiceID: "22",
        invoiceStatus: "1",
      },
    ],
    invoices: [
      {
        invoiceID: "123456",
        price: 35000000,
        date: "1402-09-12",
        paymentMethod: "نقدی",
        invoiceStatus: "1",
      },
    ],
    usersList: [
      {
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        userName: "محمود احمدی",
        userID: "12",
      },
      {
        userAvatar:
          "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
        userName: "شهرام احمدی",
        userID: "13",
      },
    ],
  };
  const accessToken = window.localStorage.getItem("AccessToken");
  const param = useParams();
  const navigate = useNavigate();

  const [isAddUserPopupActive, setIsAddUserPopupActive] = useState(false);
  const [isRemoveUserPopupActive, setIsRemoveUserPopupActive] = useState(false);

  const [businessInfo, setBusinessInfo] = useState();
  const [businessUsers, setBusinessUsers] = useState();
  const [selectedUserToDelete, setSelectedUserToDelete] = useState();
  const [newReqSent, setNewReqSent] = useState(false);

  const getBusinessInfoURL = "some url";
  const getBusinessInfoHeader = new Headers();
  getBusinessInfoHeader.append("Authorization", `Bearer ${accessToken}`);
  const getBusinessInfoFormdata = new FormData();
  getBusinessInfoFormdata.append("businessID", param.id);
  const getBusinessInfoRequestOptions = {
    method: "POST",
    headers: getBusinessInfoHeader,
    body: getBusinessInfoFormdata,
    redirect: "follow",
  };
  const getBusinessInfo = async (url, options) => {
    Loading.standard("در حال دریافت اطلاعات");
    // const response = await fetchData(url, options);
    const response = mockBusinessInfoResponse;

    setBusinessInfo(response.businessInfo);
    setBusinessUsers(response.usersList);

    console.log(response);
    Loading.remove();
  };
  const handleAddUser = () => {
    setIsAddUserPopupActive(true);
    console.log("clicked");
  };

  const handleRedirect = () => {
    navigate(`/editBusiness/${param.id}`);
  };

  useEffect(() => {
    getBusinessInfo(getBusinessInfoURL, getBusinessInfoRequestOptions);
  }, [newReqSent]);
  return (
    businessInfo && (
      <div className="container px-3" dir="rtl">
        {isRemoveUserPopupActive && (
          <>
            <RemoveUserPopup
              isPopupActive={setIsRemoveUserPopupActive}
              selectedUserToDelete={selectedUserToDelete}
              setNewReqSent={setNewReqSent}
            />
            <PopupBackground isPopupActive={setIsRemoveUserPopupActive} />
          </>
        )}
        {isAddUserPopupActive && (
          <>
            <AddUserPopup isPopupActive={setIsAddUserPopupActive} />
            <PopupBackground isPopupActive={setIsAddUserPopupActive} />
          </>
        )}
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
          <div className="bold-xlarge">عنوان کسب و کار</div>
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
              src={businessInfo.businessAvatar}
              alt=""
            />
          </div>
          <div>
            <span className="bold-xlarge">{businessInfo.businessName}</span>
          </div>
        </section>
        <section>
          <div className="d-flex align-items-center justify-content-between mb-3 mx-3">
            <span className="bold-xxlarge">اطلاعات کسب و کار</span>
            <span
              className="grey-thin-bold has-pointer"
              onClick={handleRedirect}
            >
              ویرایش اطلاعات
            </span>
          </div>
          <div>
            <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
              <span className="royal-large">نام کسب و کار</span>
              <span className="grey-large-bold">
                {businessInfo.businessName}
              </span>
            </div>
            <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
              <span className="royal-large">شماره تماس کسب و کار</span>
              <span className="grey-large-bold">
                {businessInfo.businessContact}
              </span>
            </div>
            <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
              <span className="royal-large text-nowrap">آدرس کسب و کار</span>
              <span className="grey-large-bold">
                {businessInfo.businessAddress}
              </span>
            </div>
            <div className="bg-white rounded-pill p-4 d-flex align-items-start gap-2 mb-3">
              <span className="royal-large text-nowrap">موقعیت مکانی</span>
              <span className="grey-large-bold">{businessInfo.locations}</span>
            </div>
          </div>
        </section>
        <hr />
        <section>
          <div className="px-3 mb-3">
            <span className="bold-xxlarge ">لیست کاربران</span>
          </div>
          <div>
            {businessUsers ? (
              businessUsers.map((user, index) => {
                return (
                  <BusinessUserCard
                    user={user}
                    key={index}
                    setIsRemoveUserPopupActive={setIsRemoveUserPopupActive}
                    setSelectedUserToDelete={setSelectedUserToDelete}
                  />
                );
              })
            ) : (
              <Message>هیچ کاربری وجود ندارد !</Message>
            )}
          </div>
        </section>
        <div
          className="bg-white rounded-pill p-2 d-inline-block border-royal-2 my-3 has-pointer"
          onClick={handleAddUser}
        >
          <PlusButton />
          <span className="bold-large me-3 ms-1">افزودن کاربر جدید</span>
        </div>
      </div>
    )
  );
};

export default SingleBusinessReceptionVersion;

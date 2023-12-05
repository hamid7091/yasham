import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import BusinessUserCard from "./BusinessUserCard";
import PlusButton from "../assets/svg-icons/PlusButton";
import RemoveUserPopup from "./RemoveUserPopup";
import AddUserPopup from "./AddUserPopup";
import PopupBackground from "./PopupBackground";
import Message from "../micro-components/Message";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";

const SingleBusinessReceptionVersion = () => {
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAddUserPopupActive, setIsAddUserPopupActive] = useState(false);
  const [isRemoveUserPopupActive, setIsRemoveUserPopupActive] = useState(false);

  const [businessInfo, setBusinessInfo] = useState();
  const [businessUsers, setBusinessUsers] = useState();
  const [selectedUserToDelete, setSelectedUserToDelete] = useState();
  const [newReqSent, setNewReqSent] = useState(false);

  const getUserData = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/client/get_client", {
        clientID: param.id,
      });
      Loading.remove();
      console.log(response.data.response);
      setBusinessInfo(response.data.response.businessInfo);
      setBusinessUsers(response.data.response.usersList);
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  const handleAddUser = () => {
    setIsAddUserPopupActive(true);
    console.log("clicked");
  };

  const handleRedirect = () => {
    navigate(`/editBusiness/${param.id}`, { state: location.pathname });
  };

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getUserData();
    }
  }, [newReqSent]);

  return (
    businessInfo && (
      <div className="container px-3 mt-100" dir="rtl">
        {isRemoveUserPopupActive && (
          <>
            <RemoveUserPopup
              isPopupActive={setIsRemoveUserPopupActive}
              selectedUserToDelete={selectedUserToDelete}
              setNewReqSent={setNewReqSent}
              clientID={param.id}
            />
            <PopupBackground isPopupActive={setIsRemoveUserPopupActive} />
          </>
        )}
        {isAddUserPopupActive && (
          <>
            <AddUserPopup
              isPopupActive={setIsAddUserPopupActive}
              clientID={param.id}
            />
            <PopupBackground isPopupActive={setIsAddUserPopupActive} />
          </>
        )}
        <SingleHeader title={"عنوان کسب و کار"} location={location.state} />

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

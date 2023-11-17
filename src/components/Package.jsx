import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import LocationIcon from "../assets/svg-icons/LocationIcon";
import PackagesSentIcon from "../assets/svg-icons/PackagesSentIcon";
import GreenDot from "../assets/svg-icons/GreenDot";
import Message from "../micro-components/Message";
import PackageRecieveIcon from "../assets/svg-icons/PackageRecieveIcon";
import YellowDot from "../assets/svg-icons/YellowDot";
import EndTaskPopup from "./EndTaskPopup";
import PopupBackground from "./PopupBackground";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const Package = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [taskIDs, setTaskIDs] = useState([]);

  const [isEndTaskPopupActive, setIsEndTaskPopupActive] = useState(false);

  const sentPackages = state.packages?.sent;
  const recievePackages = state.packages?.receive;

  // ===========================================================
  const endTaskURL = "https://samane.zbbo.net/api/v1/task/end_package";
  const endTaskHeader = new Headers();
  endTaskHeader.append("Authorization", `Bearer ${accessToken}`);
  const endTaskFormdata = new FormData();
  endTaskFormdata.append("taskIDs", JSON.stringify(taskIDs));
  const endTaskRequestOptions = {
    method: "POST",
    headers: endTaskHeader,
    body: endTaskFormdata,
    redirect: "follow",
  };

  const handleEndTask = async () => {
    Loading.standard("در حال ارسال درخواست");
    const response = await fetchData(endTaskURL, endTaskRequestOptions);
    console.log(response);
    if (response.success) {
      Loading.remove();
      Notify.success("وظیفه با موفقیت به اتمام رسید");
      navigate("/");
    } else {
      Loading.remove();
      Notify.failure("خطایی پیش آمده ! لطفا مجددا تلاش کنید");
    }
  };

  useEffect(() => {
    if (sentPackages) {
      console.log("sent");
      sentPackages.forEach((pkg) => {
        setTaskIDs((prevPkgIds) => [...prevPkgIds, pkg.taskID]);
      });
    }
    if (recievePackages) {
      console.log("receive");
      recievePackages.forEach((pkg) => {
        setTaskIDs((prevPkgIds) => [...prevPkgIds, pkg.taskID]);
      });
    }
  }, []);

  console.log(taskIDs);
  return (
    <div className="container px-4" dir="rtl">
      {isEndTaskPopupActive && (
        <>
          <EndTaskPopup
            setIsEndTaskPopupActive={setIsEndTaskPopupActive}
            handleEndTask={handleEndTask}
          />
          <PopupBackground isPopupActive={setIsEndTaskPopupActive} />
        </>
      )}
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3 mb-4">
        <div className="bold-xlarge"></div>
        <Link to={"/"}>
          <BackArrow />
        </Link>
      </header>
      <section className="mt-5">
        <div className="deliverer-card-wrapper text-center bg-white rounded-5 drop-shadow px-3 pt-4 pb-3 position-relative">
          <div className="doc-avatar  position-absolute">
            <img
              className="rounded-circle"
              width={"120px"}
              src={state.packages.clientDetails.clientAvatar}
              alt=""
            />
          </div>
          <p className="bold-xxlarge mt-5 mb-1">
            {state.packages.clientDetails.clientName}
          </p>
          <hr className="message-separator-ulgrey" />
          <p className="bold500-default">
            <LocationIcon />
            {state.packages.clientDetails.clientAddress}
          </p>
          <hr className="message-separator-ulgrey" />
          <a
            href={`tel:+98${state.packages.clientDetails.clientPhone}`}
            className="btn-royal-bold form-control py-3 mt-4 mb-3"
          >
            تماس با پزشک
          </a>
        </div>
        <div className="packages mt-4 shipping-cards-container">
          <p className="bold-xxlarge me-4">مرسوله های ارسالی</p>
          {sentPackages ? (
            <div className="sent-packages mb-3">
              <ul className="sent-list px-0">
                <li className="sent-head-li d-flex align-items-center">
                  <PackagesSentIcon />
                  <span className="flex-grow-1 white-large-bold me-3">
                    ارسالی ها
                  </span>
                  <span className="white-default-bold500">
                    {sentPackages ? sentPackages.length : 0} عدد
                  </span>
                </li>
                {sentPackages.map((pkg, index) => {
                  return (
                    <li key={index}>
                      <GreenDot />
                      <span className="me-2">{pkg.taskType}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <Message>مرسوله ارسالی وجود ندارد</Message>
          )}
          <p className="bold-xxlarge me-4 pt-4">مرسوله های دریافتی</p>
          {recievePackages ? (
            <div className="recieved-packages mb-3">
              <ul className="sent-list px-0">
                <li className="recieved-head-li d-flex align-items-center">
                  <PackageRecieveIcon />
                  <span className="flex-grow-1 white-large-bold me-3">
                    دریافتی ها
                  </span>
                  <span className="white-default-bold500">
                    {recievePackages ? recievePackages.length : 0} عدد
                  </span>
                </li>
                {recievePackages.map((pkg, index) => {
                  return (
                    <li key={index}>
                      <YellowDot />
                      <span className="me-2">{pkg.taskType}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <Message>مرسوله دریافتی وجود ندارد</Message>
          )}
        </div>
        <div className="footer-container fixed-bottom bottom-0 px-4 py-3 single-footer-bg">
          <button
            className="w-100 btn-royal-bold py-3"
            onClick={() => {
              setIsEndTaskPopupActive(true);
            }}
          >
            تحویل سفارش
          </button>
        </div>
      </section>
    </div>
  );
};

export default Package;

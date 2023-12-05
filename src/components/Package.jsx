import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LocationIcon from "../assets/svg-icons/LocationIcon";
import PackagesSentIcon from "../assets/svg-icons/PackagesSentIcon";
import GreenDot from "../assets/svg-icons/GreenDot";
import Message from "../micro-components/Message";
import PackageRecieveIcon from "../assets/svg-icons/PackageRecieveIcon";
import YellowDot from "../assets/svg-icons/YellowDot";
import EndTaskPopup from "./EndTaskPopup";
import PopupBackground from "./PopupBackground";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "../components/SingleHeader";
import ErrorPage from "./ErrorPage";
import useAuth from "../micro-components/useAuth";

const Package = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();

  const [taskIDs, setTaskIDs] = useState([]);
  const [isEndTaskPopupActive, setIsEndTaskPopupActive] = useState(false);
  const [sentPackages, setSentPackages] = useState();
  const [receivedPackages, setReceivedPackages] = useState();
  const [clientDetail, setClientDetail] = useState();
  const [receivedPackagesArray, setReceivedPackagesArray] = useState();
  const [sentPackagesArray, setSentPackagesArray] = useState();

  const {
    isError,
    errorItself,
    isLoading,
    isShipping,
    hasAccess,
    isClient,
    isReady,
    setErrorItself,
    setIsError,
  } = useAuth(["shipping", "reception"]);

  // ===========================================================

  const getPackageData = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/task/get_package", {
        clientID: param.id,
      });

      Loading.remove();
      setClientDetail(response.data.response.clientDetail);
      setSentPackages(response.data.response.packages.sent);
      setReceivedPackages(response.data.response.packages.received);
    } catch (error) {
      console.error(error);
      setErrorItself(error);
      setIsError(true);
      Loading.remove();
    }
  };
  const handleTaskEnd = async () => {
    const formdata = new FormData();
    formdata.append("taskIDs", JSON.stringify(taskIDs));
    console.log(Object.fromEntries(formdata));
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post("/task/end_package", formdata);
      Loading.remove();
      if (response.data.response.success) {
        Notify.success("درخواست شما با موفقیت انجام شده");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorItself(error);
      setIsError(true);
      Loading.remove();
      Notify.failure("خطا ! مجددا تلاش کنید");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getPackageData();
    }
  }, []);

  useEffect(() => {
    if (sentPackages && receivedPackages) {
      const rarray = [];
      const sarray = [];
      receivedPackages?.taskType &&
        receivedPackages?.taskType.forEach((task, index) => {
          setTaskIDs((prevTaskIds) => [
            ...prevTaskIds,
            receivedPackages.taskID[index],
          ]);
          rarray.push({
            taskType: task,
            taskID: receivedPackages.taskID[index],
          });
        });
      sentPackages?.taskType &&
        sentPackages?.taskType.forEach((task, index) => {
          setTaskIDs((prevTaskIds) => [
            ...prevTaskIds,
            sentPackages.taskID[index],
          ]);
          sarray.push({
            taskType: task,
            taskID: sentPackages.taskID[index],
          });
        });

      setReceivedPackagesArray(rarray);
      setSentPackagesArray(sarray);
    }
  }, [sentPackages, receivedPackages]);

  useEffect(() => {
    isReady && !isLoading && !hasAccess && navigate("/unauthorized");
  }, [isLoading, isReady]);

  return !isLoading ? (
    !isError ? (
      clientDetail && (
        <div className="container px-3 mt-150" dir="rtl">
          {isEndTaskPopupActive && (
            <>
              <EndTaskPopup
                setIsEndTaskPopupActive={setIsEndTaskPopupActive}
                handleEndTask={handleTaskEnd}
                isClient={isClient}
                isShipping={isShipping}
              />
              <PopupBackground isPopupActive={setIsEndTaskPopupActive} />
            </>
          )}
          <SingleHeader title={""} location={location.state} />
          <section className="mt-5">
            <div className="deliverer-card-wrapper text-center bg-white rounded-5 drop-shadow px-3 pt-4 pb-3 position-relative">
              <div className="doc-avatar position-absolute">
                <img
                  className="rounded-circle"
                  width={"120px"}
                  src={clientDetail.clientAvatar}
                  alt=""
                />
              </div>
              <p className="bold-xxlarge mt-5 mb-1">
                {clientDetail.clientName}
              </p>
              <hr className="message-separator-ulgrey" />
              <p className="bold500-default">
                <LocationIcon />
                {clientDetail.address}
              </p>
              <hr className="message-separator-ulgrey" />
              <a
                href={`tel:+98${clientDetail.contact}`}
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
                        {sentPackagesArray ? sentPackagesArray.length : 0} عدد
                      </span>
                    </li>
                    {sentPackagesArray?.map((pkg, index) => {
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
              {receivedPackages ? (
                <div className="recieved-packages mb-3">
                  <ul className="sent-list px-0">
                    <li className="recieved-head-li d-flex align-items-center">
                      <PackageRecieveIcon />
                      <span className="flex-grow-1 white-large-bold me-3">
                        دریافتی ها
                      </span>
                      <span className="white-default-bold500">
                        {receivedPackagesArray
                          ? receivedPackagesArray.length
                          : 0}{" "}
                        عدد
                      </span>
                    </li>
                    {receivedPackagesArray?.map((pkg, index) => {
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
            {isShipping && (
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
            )}
          </section>
        </div>
      )
    ) : (
      <ErrorPage error={errorItself} />
    )
  ) : (
    Loading.standard("در حال دریافت اطلاعات")
  );
};

export default Package;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useDate from "../micro-components/useDate2";
import ClientAssignedCard from "./ClientAssignedCard";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import SingleHeader from "./SingleHeader";
import ChangePriceModal from "./ChangePriceModal";
import CancelOrderPopup from "./CancelOrderPopup";
import PopupBackground from "./PopupBackground";

const SingleOrder = () => {
  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();
  console.log(location.state);
  const [orderData, setOrderData] = useState();
  const [tasks, setTasks] = useState([]);
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

  const [isPriceModalActive, setIsPriceModalActive] = useState(false);
  const [isCancelModalActive, setIsCancelModalActive] = useState(false);

  const date = useDate(orderData?.date);

  const getOrderAxios = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/order/get_order", {
        orderID: param.id,
      });
      setOrderData(response.data.response.details);
      setTasks(response.data.response?.details?.tasks);
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
  const handleRedirect = (id) => {
    if (id.invoiceID != 0) {
      navigate(`/invoice/${id.invoiceID}`);
    } else {
      navigate("/checkout", { state: id });
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("login");
    } else {
      getOrderAxios();
      getUser();
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      (isShipping || isEmployee || isSupervisor || isInventory) &&
        navigate("/unauthorized");
    }
  }, [isShipping, isEmployee, isSupervisor, isInventory]);

  return (
    orderData && (
      <div className="container px-3 mt-100" dir="rtl">
        {isPriceModalActive && (
          <>
            <ChangePriceModal
              order={orderData}
              setisModalActive={setIsPriceModalActive}
            />
            <PopupBackground
              isPopupActive={setIsPriceModalActive}
              handleStartDateChange={() => {}}
              handleEndDateChange={() => {}}
              setStatusField={() => {}}
            />
          </>
        )}
        {isCancelModalActive && (
          <>
            <CancelOrderPopup
              orderID={param.id}
              setisModalActive={setIsCancelModalActive}
              canceling={"سفارش"}
            />
            <PopupBackground
              isPopupActive={setIsCancelModalActive}
              handleStartDateChange={() => {}}
              handleEndDateChange={() => {}}
              setStatusField={() => {}}
            />
          </>
        )}
        <SingleHeader
          title={`شماره سفارش ${param.id}`}
          location={location.state}
        />
        <section className="my-4">
          <div className="bg-white rounded-5 py-4 px-4">
            <div className=" d-flex align-items-center gap-4">
              <div className="d-flex flex-column gap-3">
                <span className="royal-large ms-3">نام بیمار</span>
                <span className="royal-large ms-3">سن بیمار</span>
                <span className="royal-large ms-3">تاریخ</span>
                {!isPManager && <span className="royal-large ms-3">مبلغ</span>}
              </div>
              <div className="d-flex flex-column gap-3">
                <span className="bold500-default">
                  {orderData.patientName !== " " ? (
                    orderData.patientName
                  ) : (
                    <span className="bold500-default pb-1">
                      نام بیمار وارد نشده است
                    </span>
                  )}
                </span>
                <span className="bold500-default pb-0">
                  {orderData?.patientAge}
                </span>
                <span className="bold500-default pb-0">{date}</span>
                {!isPManager && (
                  <span className="bold500-default pb-0">
                    {orderData?.price.toLocaleString()} تومان
                  </span>
                )}
              </div>
            </div>
            {!isPManager && (
              <>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="ms-4 royal-large">وضعیت پرداخت</span>
                  {orderData?.invoiceStatus == 3 && (
                    <div className={`lroyal-default-bold py-2 px-3 badge-done`}>
                      <span>پرداخت شده</span>
                    </div>
                  )}
                  {(orderData?.invoiceStatus == 1 ||
                    (orderData?.price != 0 &&
                      orderData?.invoiceStatus == 0)) && (
                    <div
                      className={`lroyal-default-bold py-2 px-3 badge-in-process`}
                    >
                      <span>در انتظار پرداخت</span>
                    </div>
                  )}
                  {orderData?.invoiceStatus == 0 && orderData?.price == 0 && (
                    <div
                      className={`lroyal-default-bold py-2 px-3 badge-waiting`}
                    >
                      <span>در انتظار قیمت گذاری</span>
                    </div>
                  )}
                </div>
                {isClient && (
                  <div className="d-flex mt-3">
                    {orderData?.invoiceStatus == 3 && (
                      <span
                        className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer`}
                        onClick={() => {
                          navigate(`/invoice/${orderData.invoiceID}`);
                        }}
                      >
                        مشاهده فاکتور
                      </span>
                    )}
                    {orderData.invoiceStatus == 1 && (
                      <span
                        className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer`}
                        onClick={() => handleRedirect(orderData)}
                      >
                        مشاهده فاکتور
                      </span>
                    )}

                    {orderData.invoiceStatus == 0 && orderData.price != 0 && (
                      <span
                        className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer`}
                        onClick={() => handleRedirect(orderData)}
                      >
                        ایجاد فاکتور
                      </span>
                    )}
                    {/* {(orderData?.invoiceStatus == 1 ||
                      (orderData?.price !== 0 &&
                        orderData?.invoiceStatus === null)) && (
                      <span
                        className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer`}
                        onClick={() => handleRedirect(orderData)}
                      >
                        پرداخت
                      </span>
                    )} */}
                    {orderData?.price == 0 && (
                      <span
                        className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer disabled`}
                      >
                        پرداخت
                      </span>
                    )}
                  </div>
                )}
                {isFManager && (
                  <div className="d-flex mt-3">
                    {orderData?.invoiceStatus == 3 && (
                      <span
                        className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer`}
                        onClick={() => {
                          navigate(`/invoice/${orderData.invoiceID}`);
                        }}
                      >
                        مشاهده فاکتور
                      </span>
                    )}
                    {(orderData?.invoiceStatus == 1 ||
                      (orderData?.price !== 0 &&
                        orderData?.invoiceStatus === 0)) && (
                      <div className="flex-grow-1 d-flex flex-column align-items-center">
                        <span
                          onClick={() => setIsPriceModalActive(true)}
                          className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer mb-3`}
                        >
                          اصلاح قیمت
                        </span>
                        {/* <span
                          className={`btn-red-bold w-100 rounded-pill flex-grow-1 text-center py-3 has-pointer `}
                          onClick={() => setIsCancelModalActive(true)}
                        >
                          لغو سفارش
                        </span> */}
                      </div>
                    )}
                    {orderData?.price == 0 && (
                      <div className="flex-grow-1 d-flex flex-column align-items-center">
                        <span
                          onClick={() => setIsPriceModalActive(true)}
                          className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer mb-3`}
                        >
                          اصلاح قیمت
                        </span>
                        {/* <span
                          className={`btn-red-bold w-100 rounded-pill flex-grow-1 text-center py-3 has-pointer `}
                          onClick={() => setIsCancelModalActive(true)}
                        >
                          لغو سفارش
                        </span> */}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        <hr />
        <p className="bold-xlarge mb-0 mt-4 mb-2 me-2">جزئیات سفارش</p>
        <section>
          {tasks.map((task, index) => {
            return <ClientAssignedCard order={task} key={index} />;
          })}
        </section>
      </div>
    )
  );
};

export default SingleOrder;

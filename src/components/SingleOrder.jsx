import React, { useEffect, useState } from "react";
import BackArrow from "../assets/svg-icons/BackArrow";
import SingleOrderIcon from "../assets/svg-icons/SingleOrderIcon";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchData from "../util-functions/fetchData";
import useDate from "../micro-components/useDate2";
import ClientAssignedCard from "./ClientAssignedCard";

const SingleOrder = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [orderData, setOrderData] = useState();
  const [tasks, setTasks] = useState([]);
  const date = useDate(orderData?.date);
  const accessToken = window.localStorage.getItem("AccessToken");
  const singleOrderURL = "https://samane.zbbo.net/api/v1/order/get_order";
  const singleOrderHeader = new Headers();
  singleOrderHeader.append("Authorization", `Bearer ${accessToken}`);
  const singleOrderFormdata = new FormData();
  singleOrderFormdata.append("orderID", param.id);
  const singleOrderOptions = {
    method: "POST",
    headers: singleOrderHeader,
    body: singleOrderFormdata,
    redirect: "follow",
  };

  async function getOrder(url, options) {
    const response = await fetchData(url, options);
    console.log(response);
    setOrderData(response.details);
    setTasks(response?.details?.tasks);
  }

  useEffect(() => {
    getOrder(singleOrderURL, singleOrderOptions);
  }, []);

  const handleRedirect = (id) => {
    if (id.invoiceID != 0) {
      navigate(`/invoice/${id.invoiceID}`);
    } else {
      navigate("/checkout", { state: id });
    }
  };

  console.log(orderData);
  console.log(orderData?.patientName == " ");
  console.log(tasks);
  console.log(param.id);
  return (
    orderData && (
      <div className="container px-4" dir="rtl">
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3">
          <div className="bold-xlarge">
            <span className="ms-2">{/* <SingleOrderIcon /> */}</span>
            شماره سفارش {param.id}
          </div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>
        <section>
          <div className="bg-white rounded-5 py-4 px-4">
            <div className=" d-flex align-items-center gap-4">
              <div className="d-flex flex-column gap-3">
                <span className="royal-large ms-3">نام بیمار</span>
                <span className="royal-large ms-3">سن بیمار</span>
                <span className="royal-large ms-3">تاریخ</span>
                <span className="royal-large ms-3">مبلغ</span>
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
                <span className="bold500-default pb-0">
                  {orderData?.price.toLocaleString()} تومان
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <span className="ms-4 royal-large">وضعیت پرداخت</span>
              {orderData?.invoiceStatus == 3 && (
                <div className={`lroyal-default-bold py-2 px-3 badge-done`}>
                  <span>پرداخت شده</span>
                </div>
              )}
              {(orderData?.invoiceStatus == 1 ||
                (orderData?.price !== 0 &&
                  orderData?.invoiceStatus === null)) && (
                <div
                  className={`lroyal-default-bold py-2 px-3 badge-in-process`}
                >
                  <span>در انتظار پرداخت</span>
                </div>
              )}
              {orderData?.invoiceStatus == 0 && orderData?.price == 0 && (
                <div className={`lroyal-default-bold py-2 px-3 badge-waiting`}>
                  <span>در انتظار قیمت گذاری</span>
                </div>
              )}
            </div>
            <div className="d-flex mt-3">
              {orderData?.invoiceStatus == 3 && (
                <span
                  className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer`}
                >
                  مشاهده فاکتور
                </span>
              )}
              {(orderData?.invoiceStatus == 1 ||
                (orderData?.price !== 0 &&
                  orderData?.invoiceStatus === null)) && (
                <span
                  className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer`}
                  onClick={() => handleRedirect(orderData)}
                >
                  پرداخت
                </span>
              )}
              {orderData?.price == 0 && (
                <span
                  className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer disabled`}
                >
                  پرداخت
                </span>
              )}
            </div>
          </div>
        </section>
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

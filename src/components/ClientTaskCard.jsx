import React, { useEffect, useRef } from "react";
import ClientTaskCardUserIcon from "../assets/svg-icons/ClientTaskCardUserIcon";
import GrayCalander from "../assets/svg-icons/GrayCalander";
import Calendar20 from "../assets/svg-icons/Calendar20";
import useDate from "../micro-components/useDate2";
import WalletIcon from "../assets/svg-icons/WalletIcon";
import OrderListIcon from "../assets/svg-icons/OrderListIcon";
import { Link, useNavigate } from "react-router-dom";

const ClientTaskCard = ({ order, isSingle, isDirect }) => {
  const newDate = useDate(order.date);
  const navigate = useNavigate();

  const handleRedirect = (id) => {
    if (id.invoiceID != 0) {
      navigate(`/invoice/${id.invoiceID}`);
    } else {
      console.log("lets create invoice");
      navigate("/checkout", { state: id });
    }
  };

  return (
    <>
      <div className="drop-shadow mt-3 p-4 rounded-5 bg-white">
        <Link to={`/order/${order.orderID}`}>
          <div className="">
            <OrderListIcon />
            <span className="me-2 grey-large-bold ">
              شماره سفارش {order.orderID}
            </span>
          </div>
          <hr />
          <div className="">
            <div className="d-flex align-items-center justify-content-between">
              <div className=" royal-default-bold my-2">
                <span className="ms-2">نام بیمار </span>
                <span className="grey-default-bold500">
                  {order.patientName || order.patientFullName}
                </span>
              </div>
              <div className=" royal-default-bold my-2">
                <span className="ms-2">تاریخ</span>
                <span className="grey-default-bold500">{newDate}</span>
              </div>
            </div>
            {isDirect && (
              <div className="d-flex align-items-center justify-content-between">
                <div className="royal-default-bold my-2">
                  <span className="ms-2">مبلغ</span>
                  <span className="grey-default-bold500">
                    {order.price?.toLocaleString() ||
                      order.orderPrice?.toLocaleString()}{" "}
                    تومان
                  </span>
                </div>
                {order.invoiceStatus == 3 && (
                  <div
                    className={`lroyal-default-bold my-2 py-2 px-3 badge-done`}
                  >
                    <span>پرداخت شده</span>
                  </div>
                )}
                {(order.invoiceStatus == 1 ||
                  (order.price != 0 && order.invoiceStatus === null)) && (
                  <div
                    className={`lroyal-default-bold my-3 py-2 px-3 badge-in-process`}
                  >
                    <span>در انتظار پرداخت</span>
                  </div>
                )}
                {((order.invoiceStatus == null &&
                  !isSingle &&
                  order.price == 0) ||
                  (order.status == 0 && order.price == 0)) && (
                  <div
                    className={`lroyal-default-bold my-3 py-2 px-3 badge-waiting`}
                  >
                    <span>در انتظار قیمت گذاری</span>
                  </div>
                )}
                {(order.invoiceStatus == 2 || order.status == 2) && (
                  <div
                    className={`lroyal-default-bold my-3 py-2 px-3 badge-canceled`}
                  >
                    <span>لغو شده</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <hr />
        </Link>
        <div className="d-flex">
          {isDirect && <hr />}
          {!isSingle && order.invoiceStatus === "3" && isDirect && (
            <span
              className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer`}
            >
              مشاهده فاکتور
            </span>
          )}
          {!isSingle &&
            isDirect &&
            (order.invoiceStatus === "1" ||
              (order.invoiceStatus === null && order.price !== 0)) && (
              <span
                className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer`}
                onClick={() => handleRedirect(order)}
              >
                پرداخت
              </span>
            )}
          {!isSingle && order.price == 0 && isDirect && (
            <span
              className={`btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer disabled`}
            >
              پرداخت
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientTaskCard;

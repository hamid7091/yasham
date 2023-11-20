import React from "react";
import useDate from "../micro-components/useDate2";
import InvoiceCardDollarIcon from "../assets/svg-icons/InvoiceCardDollarIcon";
import LeftArrow from "../assets/svg-icons/LeftArrow";
import { Link, useLocation } from "react-router-dom";

const InvoiceCard = (factor) => {
  const location = useLocation();
  const newDate = useDate(factor.factor.date);
  return (
    <div className="bg-white rounded-4 p-4 mb-3 d-flex flex-column">
      <div>
        <InvoiceCardDollarIcon />
        <span className="grey-large-bold me-2">
          شماره فاکتور {factor.factor.invoiceID}
        </span>
      </div>
      <hr />
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="my-3">
            <span className="royal-default-bold ms-2">مبلغ</span>
            <span className="grey-default-bold500">
              {factor.factor.price.toLocaleString()} تومان
            </span>
          </div>
          <div className="my-3">
            <span className="royal-default-bold ms-2">تاریخ</span>
            <span className="grey-default-bold500">{newDate}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="my-3">
            <span className="royal-default-bold ms-2">روش پرداخت</span>
            <span className="grey-default-bold500">{factor.factor.type}</span>
          </div>
          <div className="my-3">
            {factor.factor.status === 3 && (
              <span className="lroyal-default-bold my-3 py-2 px-3 badge-done">
                پرداخت شده
              </span>
            )}
            {factor.factor.status === 2 && (
              <span className="lroyal-default-bold my-3 py-2 px-3 badge-canceled">
                لغو شده
              </span>
            )}
            {factor.factor.status === 1 && (
              <span className="lroyal-default-bold my-3 py-2 px-3 badge-in-process">
                در انتظار پرداخت
              </span>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center has-pointer">
        <Link
          to={`/invoice/${factor.factor.invoiceID}`}
          state={location.pathname}
        >
          <span className="royal-large-bold ms-2">مشاهده جزئیات</span>
          <span>
            <LeftArrow />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default InvoiceCard;

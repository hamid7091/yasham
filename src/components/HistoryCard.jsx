import React from "react";
import OrderListIcon from "../assets/svg-icons/OrderListIcon";
import ReplyIcon from "../assets/svg-icons/ReplyIcon";
import useDate from "../micro-components/useDate";

const HistoryCard = ({ order }) => {
  const singleOrder = order;
  const date = useDate(order.date);
  return (
    <div className="history-card">
      <div className="mb-3 drop-shadow p-3 bg-white rounded-5">
        <div className="card-head d-flex align-items-center px-2">
          <OrderListIcon />
          <p className="mb-0 flex-grow-1 mx-3 bold-large">
            {singleOrder.taskType}
          </p>
          <span className="has-pointer">
            <ReplyIcon />
          </span>
        </div>
        <div className="card-info tborder-ulgrey row mt-3 mb-2 mx-3 pt-3">
          <p className="col-6 text-center mb-3 py-2">
            <span className="lroyal-default-thin ms-2">نام بیمار</span>
            <span className="grey-thin-bold">{singleOrder.patientName}</span>
          </p>
          <p className="col-6 text-center mb-3 py-2">
            <span className="lroyal-default-thin ms-2"> تاریخ</span>
            <span className="grey-thin-bold">{date}</span>
          </p>
          <p className="col-6 text-center mb-3 py-2">
            <span className="lroyal-default-thin ms-2"> کد پیگیری</span>
            <span className="grey-thin-bold">{singleOrder.orderID}</span>
          </p>
          {order.status === "active" && (
            <div className="badge-in-process col-6 py-2 mb-3">در حال انجام</div>
          )}
          {order.status === "done" && (
            <div className="badge-done col-6 py-2 mb-3">انجام شده </div>
          )}
          {order.status === "canceled" && (
            <div className="badge-canceled col-6 py-2 mb-3"> لغوشده </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;

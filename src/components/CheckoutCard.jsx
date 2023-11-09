import React from "react";
import PlusButton from "../assets/svg-icons/PlusButton";
import MinusButton from "../assets/svg-icons/MinusButton";
import useDate from "../micro-components/useDate2";
import MinusButtonInactive from "../assets/svg-icons/MinusButtonInactive";
import PlusButtonInactive from "../assets/svg-icons/PlusButtonInactive";
import Tick from "../assets/svg-icons/Tick";

const CheckoutCard = ({
  data,
  handleAddOrderToCard,
  handleRemoveOrderFromCart,
  isOrderAdded,
}) => {
  const newDate = useDate(data.date);
  return (
    <div
      className={`drop-shadow bg-white p-3 rounded-4 mb-3 ${
        isOrderAdded(data) ? "lborder-tealgreen-8" : "lborder-royal-8"
      }`}
      // style={
      //   isOrderAdded(data)
      //     ? {
      //         background:
      //           "linear-gradient(90deg, rgba(0,140,114,1) 0%, rgba(255,255,255,1) 27%)",
      //         backgroundColor: "rgb(0,140,114)",
      //       }
      //     : {}
      // }
    >
      <div className="d-flex align-items-center gap-3 ">
        <div className="d-flex flex-column">
          <div
            className={`d-flex flex-column gap-4 ${
              isOrderAdded(data) ? "d-none" : ""
            }`}
          >
            <span
              onClick={() => handleAddOrderToCard(data)}
              className="has-pointer"
            >
              <PlusButton />
            </span>
            <span className="">
              <MinusButtonInactive />
            </span>
          </div>
          <div
            className={`d-flex flex-column gap-4 ${
              isOrderAdded(data) ? "" : "d-none"
            }`}
          >
            <span className="">
              <PlusButtonInactive />
            </span>
            <span
              onClick={() => handleRemoveOrderFromCart(data)}
              className="has-pointer"
            >
              <MinusButton />
            </span>
          </div>
        </div>
        <div>
          <div className="bold-default mb-3">
            شماره سفارش {data.orderID}{" "}
            {isOrderAdded(data) && <span>(انتخاب شده)</span>}
            {isOrderAdded(data) && <Tick />}
          </div>
          <div className="d-flex gap-3">
            <div className="d-flex flex-column bold-default">
              <span>نام بیمار</span>
              <span>تاریخ</span>
              <span>مبلغ</span>
            </div>
            <div className="d-flex flex-column grey-default-bold500">
              <span>{data.patientName || data.patientFullName}</span>
              <span>{newDate}</span>
              <span>
                {data.price?.toLocaleString() ||
                  data.orderPrice?.toLocaleString()}{" "}
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;

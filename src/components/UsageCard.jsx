import React from "react";
import UsageIcon from "../assets/svg-icons/UsageIcon";
import useDate from "../micro-components/useDate2";

const UsageCard = ({ data, unit }) => {
  console.log(data);
  const date = useDate(data.usageDate);

  const showExtraInfo = (event) => {
    const cardWrapper = event.currentTarget;
    const parentArray = Array.from(cardWrapper.parentElement.children);

    if (cardWrapper.classList.contains("show-extra-info")) {
      cardWrapper.classList.remove("show-extra-info");
    } else {
      cardWrapper.classList.add("show-extra-info");
      parentArray.forEach((child) => {
        if (cardWrapper != child) {
          child.classList.remove("show-extra-info");
        }
      });
    }
  };
  return (
    <div
      className="bg-white rounded-5 drop-shadow py-3 mt-3 timeline-task-wrapper has-pointer"
      onClick={showExtraInfo}
    >
      <div className="d-flex align-items-center gap-2 px-3">
        <span>
          <UsageIcon />
        </span>
        <span className="bold-xlarge">{data.usageAmount}</span>
        <span className="flex-grow-1 thin-default">{unit}</span>
        <span className="grey-default-thin">{date}</span>
      </div>
      <div className="timeline-card-extra-info">
        <hr className="w-100" />
        <div className="d-flex justify-content-between bold-large px-4">
          <span>کد انبار</span>
          <span>{data.inventoryID}</span>
        </div>
        <div className="d-flex justify-content-between bold-large px-4">
          <span>از بابت شماره سفارش</span>
          <span>{data.orderID}</span>
        </div>
        <div className="d-flex justify-content-between bold-large px-4">
          <span>توسط</span>
          <span>{data.operator}</span>
        </div>
      </div>
    </div>
  );
};

export default UsageCard;

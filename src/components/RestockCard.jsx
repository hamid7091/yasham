import React from "react";
import RestockIcon from "../assets/svg-icons/RestockIcon";
import useDate from "../micro-components/useDate2";

const RestockCard = ({ data, unit }) => {
  const date = useDate(data.restockDate);

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
          <RestockIcon />
        </span>
        <span className="bold-xlarge">
          {(+data.restockAmount).toLocaleString()}
        </span>
        <span className="flex-grow-1 thin-default">{data.amountUnit}</span>
        <span className="grey-default-thin">{date}</span>
      </div>
      <div className="timeline-card-extra-info">
        <hr className="w-100" />
        <div className="d-flex justify-content-between bold-large px-4">
          <span>کد انبار</span>
          <span>{data.inventoryID}</span>
        </div>
        <div className="d-flex justify-content-between bold-large px-4">
          <span>قیمت کل</span>
          <span>{(+data.restockCost).toLocaleString()} تومان</span>
        </div>
      </div>
    </div>
  );
};

export default RestockCard;

import React from "react";
import BackIcon from "../assets/svg-icons/BackIcon";
import OrderListIcon30 from "../assets/svg-icons/OrderListIcon30";
import IncomeIcon from "../assets/svg-icons/IncomeIcon";
import ProfitIcon from "../assets/svg-icons/ProfitIcon";
import { useLocation, useNavigate } from "react-router-dom";
const BusinessCard = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/business/${data.businessID}`, { state: location.pathname });
  };
  return (
    <div
      className="bg-white rounded-5 p-4 mt-2 mb-4 has-pointer"
      onClick={handleNavigate}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <span>
            <img
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
              src={data.businessAvatar}
              alt=""
            />
          </span>
          <span className="grey-xlarge-bold">{data.businessName}</span>
        </div>
        <div>
          <BackIcon />
        </div>
      </div>
      <hr />
      <div>
        <span className="">
          <span>
            <OrderListIcon30 />
          </span>
          <span className="grey-default-thin me-2">{data.orderCount} عدد</span>
        </span>
        <span className=" me-3">
          <span>
            <IncomeIcon />
          </span>
          <span className="grey-default-thin me-2">
            {data.income / 1000000} میلیون
          </span>
        </span>
        <span className=" me-3">
          <span>
            <ProfitIcon />
          </span>
          <span className="grey-default-thin me-2">
            {data.profit / 1000000} میلیون
          </span>
        </span>
      </div>
    </div>
  );
};

export default BusinessCard;

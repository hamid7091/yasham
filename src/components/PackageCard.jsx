import React from "react";
import GreenUpArrow from "../assets/svg-icons/GreenUpArrow";
import { Link, useLocation } from "react-router-dom";
import BlueDownArrow from "../assets/svg-icons/BlueDownArrow";
import BackIcon from "../assets/svg-icons/BackIcon";

const PackageCard = ({ packageData, isFromShipping }) => {
  const sentPackages = packageData?.sent_count;
  const recievePackages = packageData?.receive_count;

  const location = useLocation();

  return (
    <Link
      className="has-pointer py-5"
      to={`/package/${packageData.client_id}`}
      state={location.pathname}
    >
      <div className="bg-white rounded-5 p-4 mb-3">
        <div className="delivery-card-head d-flex align-items-center mb-3">
          <div className="d-flex align-items-center flex-grow-1">
            <img
              className="shipping-card-avatar"
              src={packageData.clientAvatar}
              alt=""
            />
            <p className="grey-large-bold500 mb-0 me-3">
              {packageData.clientName}
            </p>
          </div>
          <BackIcon />
        </div>
        <hr />
        <div className="delivery-card-body d-flex justify-content-between">
          <div className="sent">
            <span className="badge-sm-green d-flex align-items-center justify-content-between gap-2">
              <GreenUpArrow />
              <span>{isFromShipping && "ارسالی‌ها"}</span>
              <span className="grey-default-bold500">
                {sentPackages ? sentPackages : 0}
              </span>
            </span>
          </div>
          <div className="recieved">
            <span className="badge-sm-yellow d-flex gap-1 align-items-center">
              <BlueDownArrow />
              <span>{isFromShipping && "دریافتی‌ها"}</span>
              <span className="grey-default-bold500">
                {recievePackages ? recievePackages : 0}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;

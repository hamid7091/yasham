import React from "react";
import GreenUpArrow from "../assets/svg-icons/GreenUpArrow";
import YellowArrowUp from "../assets/svg-icons/YellowArrowUp";
import { Link } from "react-router-dom";
import BlueDownArrow from "../assets/svg-icons/BlueDownArrow";
import BackIcon from "../assets/svg-icons/BackIcon";

const PackageCard = ({ packageData, isFromShipping }) => {
  console.log(packageData);
  const sentPackages = packageData.packages?.sent;
  const recievePackages = packageData.packages?.receive;

  console.log(sentPackages);

  return (
    <Link
      className="has-pointer py-5"
      to={`/package/${packageData.clientID}`}
      state={packageData}
    >
      <div className="bg-white rounded-5 p-4 mb-3">
        <div className="delivery-card-head d-flex align-items-center mb-3">
          <div className="d-flex align-items-center flex-grow-1">
            <img
              className="shipping-card-avatar"
              src={packageData.packages.clientDetails.clientAvatar}
              alt=""
            />
            <p className="grey-large-bold500 mb-0 me-3">
              {packageData.packages.clientDetails.clientName}
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
                {sentPackages ? sentPackages.length : 0}
              </span>
            </span>
          </div>
          <div className="recieved">
            <span className="badge-sm-yellow d-flex gap-1 align-items-center">
              <BlueDownArrow />
              <span>{isFromShipping && "دریافتی‌ها"}</span>
              <span className="grey-default-bold500">
                {recievePackages ? recievePackages.length : 0}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;

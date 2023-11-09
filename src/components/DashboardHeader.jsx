import React from "react";
import BellIcon from "../assets/svg-icons/BellIcon";
import { Link } from "react-router-dom";

const DashboardHeader = ({ user, userRole }) => {
  const state = user;
  return (
    <div className="position-sticky top-0 px-3" style={{ zIndex: 5 }}>
      <header
        dir="rtl"
        className="d-flex bg-default rounded-bottom-5 align-items-center py-3 mt-2"
      >
        <div>
          <Link to="/profile" state={{ user: user, userRole: userRole }}>
            <img className="header-avatar" src={state?.userAvatar} alt="" />
          </Link>
        </div>
        <div className="flex-grow-1 d-flex flex-column align-items-start">
          <Link
            to="/profile"
            state={{ user: user, userRole: userRole }}
            className="bold-large mb-1 me-3"
          >
            {state?.userFirstName} {state?.userLastName}
          </Link>
        </div>
        <div className="bell-icon has-pointer position-relative tooltip-container">
          <BellIcon />
          <span className="tooltip-text">بزودی</span>
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;

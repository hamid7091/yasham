import React from "react";
import { Link } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";

const SingleHeader = ({ title, location }) => {
  return (
    <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2">
      <div className="bold-xlarge">{title}</div>
      <Link to={location ? location : "/"}>
        <BackArrow />
      </Link>
    </header>
  );
};

export default SingleHeader;

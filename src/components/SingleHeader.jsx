import React from "react";
import { Link } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";

const SingleHeader = ({ title, location }) => {
  return (
    <header
      className="d-flex bg-default align-items-center justify-content-between fixed-top top-0 p-3"
      style={{ zIndex: 5, maxWidth: "var(--general-width)", margin: "0 auto" }}
    >
      <div className="bold-xlarge">{title}</div>
      <Link to={location ? location : "/"}>
        <BackArrow />
      </Link>
    </header>
  );
};

export default SingleHeader;

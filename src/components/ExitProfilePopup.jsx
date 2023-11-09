import React from "react";
import ExitProfileBanner from "../assets/svg-pics/ExitProfileBanner";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import { useNavigate } from "react-router-dom";

const ExitProfilePopup = ({ isPopupActive }) => {
  const navigate = useNavigate();
  const handleClosePopup = () => {
    isPopupActive(false);
  };
  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <div className="exit-profile-popup bg-default rounded-5 p-4 show">
        <div className="exit-profile-popup-head position-relative">
          <div className="exit-profil-banner text-center mb-3">
            <ExitProfileBanner />
          </div>
          <a
            className="popup-close-btn has-pointer position-absolute top-0 start-0"
            onClick={handleClosePopup}
          >
            <CloseIcon />
          </a>
        </div>
        <div className="exit-profile-popup-taxt text-center">
          <p className="bold-xxlarge">خروج</p>
          <p className="lgrey-large-bold500">آیا از خروج خود مطمئن هستید؟</p>
        </div>
        <div className="d-flex justify-content-center gap-3 align-items-center">
          <button className="btn-green-bold" onClick={handleLogout}>
            بله
          </button>
          <button
            className="popup-close-btn btn-lgrey-bold"
            onClick={handleClosePopup}
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitProfilePopup;

import React from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";

const EndTaskPopup = ({ setIsEndTaskPopupActive, handleEndTask }) => {
  const handleClosePopup = () => {
    setIsEndTaskPopupActive(false);
  };

  const handleEndTheTask = () => {
    handleEndTask();
    setIsEndTaskPopupActive(false);
  };
  return (
    <div className="end-task-popup bg-light rounded-5 p-4">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <p className="bold-xxlarge mb-0">تحویل تسک</p>
        <span onClick={handleClosePopup} className=" has-pointer">
          <CloseIcon />
        </span>
      </div>
      <div className="tborder-vlroyal mt-2 pt-3 px-3">
        <h2 className="bold500-large mb-3">آیا از اتمام تسک اطمینان دارید ؟</h2>
        <div className="d-flex gap-2">
          <button className="btn-royal-bold py-3" onClick={handleEndTheTask}>
            اتمام
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndTaskPopup;

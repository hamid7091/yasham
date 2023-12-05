import React, { useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";

const EndTaskPopup = ({
  setIsEndTaskPopupActive,
  handleEndTask,
  isClient,
  isShipping,
}) => {
  const [commentContent, setCommentContent] = useState("");

  const handleClosePopup = () => {
    setIsEndTaskPopupActive(false);
  };
  const handleCommentKeyup = (event) => {
    setCommentContent(event.target.value);
  };
  const handleEndTheTask = () => {
    handleEndTask();
    setIsEndTaskPopupActive(false);
  };
  return (
    <div className="end-task-popup bg-light rounded-5 p-4">
      <div className="d-flex justify-content-between align-items-center pb-2">
        <p className="bold-xxlarge mb-0">تحویل تسک</p>
        <span onClick={handleClosePopup} className=" has-pointer">
          <CloseIcon />
        </span>
      </div>
      <hr />
      <div className="mt-2">
        {isClient && (
          <div className="">
            <p className="bold500-default my-3">
              <label htmlFor="message-text">کامنت خود را بنویسید</label>
            </p>
            <textarea
              onKeyUp={handleCommentKeyup}
              className="form-control border-0 mb-3"
              name=""
              id="message-text"
              rows="7"
              placeholder="کامنت خود را بنویسید"
            ></textarea>
          </div>
        )}
        {isShipping && (
          <p className="bold500-default my-3">
            <label htmlFor="message-text">
              آیا از اتمام این وظیفه اطمینان دارید ؟
            </label>
          </p>
        )}
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

import React, { useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import fetchData from "../util-functions/fetchData";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";

const CommentsPopup = ({
  setIsCommentPopupActive,
  setCommentsData,
  taskID,
}) => {
  const [commentContent, setCommentContent] = useState("");

  const handleClosePopup = () => {
    setIsCommentPopupActive(false);
  };
  const handleCommentKeyup = (event) => {
    setCommentContent(event.target.value);
  };

  const handleComment = async () => {
    const formdata = new FormData();
    formdata.append("taskID", taskID);
    formdata.append("commentContent", commentContent);
    try {
      Loading.standard("درحال ارسال نظر شما");
      const response = await axiosInstance.post(
        "/task/comment_insert",
        formdata
      );
      if (response.data.response.success) {
        Loading.remove();
        Notify.success("نظر شما با موفقیت ارسال شد");
        setIsCommentPopupActive(false);
        setCommentsData(response.data.response.Comments);
      } else {
        Loading.remove();
        Notify.failure("خطا ! لطفا مجددا تلاش کنید");
      }
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  return (
    <div className="message-popup bg-default rounded-5 p-4">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <p className="bold-xxlarge">ثبت نظر</p>
        <span className="has-pointer" onClick={handleClosePopup}>
          <CloseIcon />
        </span>
      </div>
      <div className="tborder-vlroyal">
        <p className="bold500-default px-3 mb-1 mt-3">
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
      <div className="d-flex justify-content-center">
        <button
          onClick={handleComment}
          className="btn-royal-bold border-0 flex-grow-1 rounded-pill py-3 mx-3"
          style={
            commentContent
              ? { pointerEvents: "" }
              : { pointerEvents: "none", color: "var(--blue-royal-very-light)" }
          }
        >
          ارسال نظر
        </button>
      </div>
    </div>
  );
};

export default CommentsPopup;

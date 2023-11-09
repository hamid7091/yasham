import React, { useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import fetchData from "../util-functions/fetchData";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const CommentsPopup = ({
  setIsCommentPopupActive,
  setCommentsData,
  taskID,
}) => {
  const [commentContent, setCommentContent] = useState("");
  const sendCommentURL = "https://samane.zbbo.net/api/v1/task/comment_insert";
  const accessToken = window.localStorage.getItem("AccessToken");
  const sendCommentFromdata = new FormData();
  const sendCommentHeader = new Headers();

  const handleClosePopup = () => {
    setIsCommentPopupActive(false);
  };
  const handleCommentKeyup = (event) => {
    setCommentContent(event.target.value);
  };

  const hanldeSendNewComment = async () => {
    if (commentContent) {
      Loading.standard("درحال ارسال نظر شما");
      sendCommentHeader.append("Authorization", `Bearer ${accessToken}`);
      sendCommentFromdata.append("taskID", taskID);
      sendCommentFromdata.append("commentContent", commentContent);

      const sendCommentRequestOptions = {
        method: "POST",
        headers: sendCommentHeader,
        body: sendCommentFromdata,
        redirect: "follow",
      };
      const response = await fetchData(
        sendCommentURL,
        sendCommentRequestOptions
      );
      if (response.success) {
        Loading.remove();
        Notify.success("نظر شما با موفقیت ارسال شد");
        setIsCommentPopupActive(false);
        setCommentsData(response.Comments);
      } else {
        Loading.remove();
        Notify.failure("خطا ! لطفا مجددا تلاش کنید");
      }
    } else {
      Notify.failure("فیلد کامنت خالی است", {
        width: "200px",
        failure: {
          notiflixIconColor: "#fff",
        },
      });
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
          onClick={hanldeSendNewComment}
          className="btn-royal-bold border-0 flex-grow-1 rounded-pill py-3 mx-3"
        >
          ارسال نظر
        </button>
      </div>
    </div>
  );
};

export default CommentsPopup;

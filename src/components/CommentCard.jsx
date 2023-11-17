import React from "react";
import useDate from "../micro-components/useDate2";
import ReplyIcon from "../assets/svg-icons/ReplyIcon";

const CommentCard = ({ comment }) => {
  const date = useDate(comment.date);
  return (
    <div>
      <div
        className={` rounded-4 px-4 pt-1 pb-4 mb-3 drop-shadow ${
          comment.isMe ? "bg-default" : "bg-white"
        }`}
      >
        <div className="message-head mb-3">
          <div className="sender-info-wrapper d-flex align-items-center position-absolute bottom-0 end-0">
            <div>
              <img
                className="header-avatar ms-3"
                src={comment.userAvatar}
                alt="avatar"
              />
            </div>
            <div className="sender-info me-2">
              <p className="bold-xlarge mb-0">{comment.userFullName}</p>
              <p className="thin-default-gl mb-0 d-flex gap-2">
                <span className="thin-default-gl mb-0">{date}</span>
              </p>
            </div>
          </div>
          <span className="position-absolute top-0 start-0 has-pointer">
            <ReplyIcon />
          </span>
        </div>
        <div className="message-body thin-default">{comment.content}</div>
      </div>
    </div>
  );
};

export default CommentCard;

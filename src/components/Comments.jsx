import React, { useState } from "react";
import Message from "../micro-components/Message";
import GrayCalander from "../assets/svg-icons/GrayCalander";
import ReplyIcon from "../assets/svg-icons/ReplyIcon";
import moment from "moment-jalaali";

const Comments = ({ commentsData }) => {
  const [commentData, setCommentData] = useState(commentsData);
  moment.loadPersian();

  return commentsData.length > 0 ? (
    <div className="single-task-container">
      <p className="bold-xxlarge px-3 mt-3">پیام های شما</p>
      {commentsData.map((comment, i) => {
        const preFormatedDate = comment.date;
        const formatedDate = moment(preFormatedDate, "jYYYY-jM-jD");
        const year = formatedDate.format("jYYYY");
        const month = formatedDate.format("jMMMM");
        const day = formatedDate.format("jD");

        const date = `${day} ${month} ${year}`;
        return (
          <div key={i}>
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
                      {/* <span>
                        <GrayCalander />
                      </span> */}
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
            {/* <hr className="message-separator" /> */}
          </div>
        );
      })}
    </div>
  ) : (
    <Message>در حال حاضر پیامی وجود ندارد</Message>
  );
};

export default Comments;

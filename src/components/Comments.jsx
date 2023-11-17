import React from "react";
import Message from "../micro-components/Message";
import CommentCard from "./CommentCard";

const Comments = ({ commentsData }) => {
  return commentsData.length > 0 ? (
    <div className="single-task-container mt-4">
      {commentsData.map((comment, i) => {
        return <CommentCard key={i} comment={comment} />;
      })}
    </div>
  ) : (
    <Message>در حال حاضر پیامی وجود ندارد</Message>
  );
};

export default Comments;

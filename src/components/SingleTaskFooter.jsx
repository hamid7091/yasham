import React from "react";
import CommentIcon from "../assets/svg-icons/CommentIcon";
import { useNavigate } from "react-router-dom";

const SingleTaskFooter = ({
  userInfo,
  isTaskStarted,
  isAssignedToMe,
  setIsCommentPopupActive,
  setIsAssignPopupActive,
  handleStartTask,
  taskID,
}) => {
  const navigate = useNavigate();

  var isSupervisor = false;
  userInfo.Role.forEach((role) => {
    if (
      role == "administrator" ||
      role == "supervisor" ||
      role == "supper_administrator"
    ) {
      isSupervisor = true;
    }
  });

  const handleCommentPopup = () => {
    setIsCommentPopupActive(true);
  };
  const handleAssignPopup = () => {
    setIsAssignPopupActive(true);
  };
  const handleEndTaskPopup = () => {
    navigate(`/endTask/${taskID}`);
  };

  console.log(isAssignedToMe);
  return (
    <div>
      <footer className="footer-container px-4 py-3 fixed-bottom bottom-0 d-flex justify-content-between align-items-center single-footer-bg">
        {isAssignedToMe && !isTaskStarted && (
          <>
            {" "}
            <div
              className="footer-comment-btn ms-3 has-pointer"
              onClick={handleCommentPopup}
            >
              <CommentIcon />
            </div>
            <button
              className="task-ender btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
              onClick={handleStartTask}
            >
              شروع تسک
            </button>{" "}
          </>
        )}
        {isAssignedToMe && isTaskStarted && (
          <>
            {" "}
            <div
              className="footer-comment-btn ms-3 has-pointer"
              onClick={handleCommentPopup}
            >
              <CommentIcon />
            </div>
            <button
              className="task-ender btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
              onClick={handleEndTaskPopup}
            >
              اتمام تسک
            </button>{" "}
          </>
        )}
        {isSupervisor && !isTaskStarted && !isAssignedToMe && (
          <>
            {" "}
            <div
              className="footer-comment-btn ms-3 has-pointer"
              onClick={handleCommentPopup}
            >
              <CommentIcon />
            </div>
            <button
              className="task-ender btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
              onClick={handleAssignPopup}
            >
              اساین
            </button>{" "}
          </>
        )}
        {!isAssignedToMe && !isSupervisor && (
          <>
            <div
              className="footer-comment-btn ms-3 has-pointer"
              onClick={handleCommentPopup}
            >
              <CommentIcon />
            </div>
          </>
        )}
      </footer>
    </div>
  );
};

export default SingleTaskFooter;

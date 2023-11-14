import React from "react";
import CommentIcon from "../assets/svg-icons/CommentIcon";
import { useNavigate } from "react-router-dom";
import useRoleSetter from "../micro-components/useRoleSetter";

const SingleTaskFooter = ({
  userInfo,
  isTaskStarted,
  isAssignedToMe,
  setIsCommentPopupActive,
  setIsAssignPopupActive,
  setIsEndTaskPoupActive,
  handleStartTask,
  taskID,
}) => {
  const navigate = useNavigate();

  const [
    isEmployee,
    isClient,
    isSupervisor,
    isShipping,
    isInventory,
    isPManager,
    isFManager,
    isReception,
  ] = useRoleSetter(userInfo.Role);

  const handleCommentPopup = () => {
    setIsCommentPopupActive(true);
  };
  const handleAssignPopup = () => {
    setIsAssignPopupActive(true);
  };
  const handleEndTaskPopup = () => {
    !isClient && navigate(`/endTask/${taskID}`);
    isClient && setIsEndTaskPoupActive(true);
  };

  console.log(userInfo);
  return (
    <div>
      <footer className="footer-container px-4 py-3 fixed-bottom bottom-0 d-flex justify-content-between align-items-center single-footer-bg">
        <div
          className="footer-comment-btn ms-3 has-pointer"
          onClick={handleCommentPopup}
        >
          <CommentIcon />
        </div>
        {isAssignedToMe && !isTaskStarted && (
          <button
            className="task-ender btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
            onClick={handleStartTask}
          >
            شروع تسک
          </button>
        )}
        {isAssignedToMe && isTaskStarted && (
          <button
            className="task-ender btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
            onClick={handleEndTaskPopup}
          >
            اتمام تسک
          </button>
        )}
        {isSupervisor && !isTaskStarted && !isAssignedToMe && (
          <button
            className="task-ender btn-royal-bold rounded-pill flex-grow-1 text-center py-3 has-pointer"
            onClick={handleAssignPopup}
          >
            اساین
          </button>
        )}
      </footer>
    </div>
  );
};

export default SingleTaskFooter;

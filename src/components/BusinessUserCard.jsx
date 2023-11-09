import React from "react";
import DeleteMiniBtn from "../assets/svg-icons/DeleteMiniBtn";

const BusinessUserCard = ({
  user,
  setIsRemoveUserPopupActive,
  setSelectedUserToDelete,
}) => {
  const handleUserDeleteProcess = (user) => {
    setIsRemoveUserPopupActive(true);
    setSelectedUserToDelete(user.userID);
    console.log(user);
  };
  return (
    <div className="mb-3 bg-white rounded-pill py-2 px-3 d-flex align-items-center">
      <span className="flex-grow-1">
        <span className="ms-2">
          <img
            src={user.userAvatar}
            width={60}
            height={60}
            style={{ borderRadius: "50%" }}
            alt=""
          />
        </span>
        <span className="bold-large">{user.userName}</span>
      </span>
      <span>
        <span
          className=" has-pointer"
          onClick={() => handleUserDeleteProcess(user)}
        >
          <DeleteMiniBtn />
        </span>
      </span>
    </div>
  );
};

export default BusinessUserCard;

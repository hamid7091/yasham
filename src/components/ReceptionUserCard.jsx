import React from "react";
import BackIcon from "../assets/svg-icons/BackIcon";
import { useNavigate } from "react-router-dom";
const ReceptionUserCard = ({ data }) => {
  console.log(data);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/user/${data.userID}`);
  };
  return (
    <div
      className="bg-white rounded-5 p-4 mt-2 mb-4 has-pointer"
      onClick={handleNavigate}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <span>
            <img
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
              src={data.userAvatar}
              alt=""
            />
          </span>
          <span className="grey-xlarge-bold">{data.userName}</span>
        </div>
        <div>
          <BackIcon />
        </div>
      </div>
    </div>
  );
};

export default ReceptionUserCard;

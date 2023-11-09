import React from "react";
import BackIcon from "../assets/svg-icons/BackIcon";
import GreenUpArrow from "../assets/svg-icons/GreenUpArrow";
import BlueDownArrow from "../assets/svg-icons/BlueDownArrow";

const EmployeeCard = ({ employee }) => {
  return (
    <div className="bg-white mb-3 rounded-5 p-4">
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center flex-grow-1">
          <img
            className="shipping-card-avatar"
            src={employee.employeeAvatar}
            alt=""
          />
          <span className="grey-large-bold500 mb-0 me-3">
            {employee.employeeName}
          </span>
        </div>
        <BackIcon />
      </div>
      <hr />
      <div className="delivery-card-body d-flex gap-3">
        <div className="sent">
          <span className="badge-sm-green-iconless d-flex gap-1 align-items-center">
            <span className="pe-2 ps-3">انجام شده</span>
            <span className="grey-default-bold500">{employee.doneTasks}</span>
          </span>
        </div>
        <div className="recieved">
          <span className="badge-sm-royal d-flex gap-2 align-items-center">
            <span className="pe-2 ps-3">واگذاری شده</span>
            <span className="grey-default-bold500">
              {employee.assignedTasks}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;

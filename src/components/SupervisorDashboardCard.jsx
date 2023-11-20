import React from "react";
import FlagRoyal30 from "../assets/svg-icons/FlagRoyal30";
import BackIcon from "../assets/svg-icons/BackIcon";
import { Link, useLocation } from "react-router-dom";

const SupervisorDashboardCard = ({ data }) => {
  const location = useLocation();
  return (
    <Link to={`/group/${data.departmentID}`} state={location.pathname}>
      <div className="bg-white rounded-5 p-3 mb-3 drop-shadow">
        <div className="d-flex justify-content-between align-items-center">
          <span>
            <span className="ms-2">
              <FlagRoyal30 />
            </span>
            <span className="grey-large-bold500">
              بخش {data.departmentName}
            </span>
          </span>
          <span className="">
            <BackIcon />
          </span>
        </div>
        <hr />
        <div className="d-flex gap-2">
          <span className="badge-sm-royal d-flex gap-2 align-items-center">
            <span>کل</span>
            <span>
              {parseInt(data.orphanTasksNum) + parseInt(data.assignedTasksNum)}
            </span>
          </span>
          <span className="badge-sm-royal d-flex gap-2 align-items-center">
            <span>در انتظار</span>
            <span>{data.orphanTasksNum}</span>
          </span>
          <span className="badge-sm-royal d-flex gap-2 align-items-center">
            <span>در حال انجام</span>
            <span>{data.assignedTasksNum}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SupervisorDashboardCard;

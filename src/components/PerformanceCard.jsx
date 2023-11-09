import React from "react";
import ClientTaskCardUserIcon from "../assets/svg-icons/ClientTaskCardUserIcon";
import ProfileIcon30 from "../assets/svg-icons/ProfileIcon30";
import ClientIcon from "../assets/svg-icons/ClientIcon";
import StartTimer from "../assets/svg-icons/StartTimer";
import EndTimer from "../assets/svg-icons/EndTimer";
import FlagIcon from "../assets/svg-icons/FlagIcon";

const PerformanceCard = ({ data }) => {
  // console.log(data);
  return (
    <div>
      <div className="posted-card drop-shadow mb-3 p-4 rounded-5">
        <div className="pe-3 rborder-green-thick">
          <h5 className="bold-xlarge pb-2">{data.taskType}</h5>
          <h5 className="lgrey-default-thin row">
            <div className="col-6 mb-2">
              <ProfileIcon30 />
              <span className="grey-default-thin me-2">
                {data.patientFullName}
              </span>
            </div>
            <div className="col-6 mb-2 text-start">
              <ClientIcon />
              <span className="grey-default-thin me-2">{data.clientName}</span>
            </div>
            <div className="col-6 mb-2 ">
              <StartTimer />
              <span className="grey-default-thin me-2">{data.start_time}</span>
            </div>
            <div className="col-6 mb-2 text-start">
              <EndTimer />
              <span className="grey-default-thin me-2">
                {data.complete_time ? data.complete_time : "-"}
              </span>
            </div>
          </h5>
          <hr className="message-separator-ulgrey-dashed" />
          <div className="my-2">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <FlagIcon />
                <span className="grey-default-thin me-2">{data.stepName}</span>
              </div>
              <div
                className={`py-2 px-3 ${
                  data.payStatus === "تسویه نشده"
                    ? "badge-canceled"
                    : "badge-done"
                }`}
              >
                {data.payStatus}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;

import React from "react";

import SingleTaskNotepad from "../assets/svg-icons/SingleTaskNotepad";
import SingleTaskCalendar from "../assets/svg-icons/SingleTaskCalendar";
import SingleTaskReceipt from "../assets/svg-icons/SingleTaskReceipt";
import TaskTypeIcon from "../assets/svg-icons/TaskTypeIcon";
import PatientNameIcon from "../assets/svg-icons/PatientNameIcon";
import PatientAgeIcon from "../assets/svg-icons/PatientAgeIcon";

const Overall = ({ overAllData }) => {
  console.log(overAllData);
  const toothColor = overAllData.toothColor;
  return (
    <div className="single-task-container">
      <div className=" text-center mt-5">
        <img
          className="single-task-avatar rounded-circle"
          src={overAllData.clientAvatar}
          alt=""
        />
        <h6 className="bold-large mt-3">{overAllData.clientName}</h6>
      </div>
      <div>
        <h5 className="bold-xxlarge pe-4 my-3 pt-3">جزئیات سفارش</h5>
        <div className="d-flex align-items-center bg-white rounded-pill p-2 drop-shadow gap-2 mt-2">
          <SingleTaskNotepad />
          <span className="royal-large">
            نوع سرویس:{" "}
            <span className="bold500-large">{overAllData.service}</span>
          </span>
        </div>
        <div className="d-flex align-items-center bg-white rounded-pill p-2 drop-shadow gap-2 mt-2">
          <TaskTypeIcon />
          <span className="royal-large">
            نوع وظیفه:{" "}
            <span className="bold500-large">{overAllData.taskType}</span>
          </span>
        </div>
        <div className="d-flex align-items-center bg-white rounded-pill p-2 drop-shadow gap-2 mt-2">
          <PatientNameIcon />
          <span className="royal-large">
            نام بیمار :{" "}
            <span className="bold500-large">
              {overAllData.patientFirstname} {overAllData.patientLastname}
            </span>
          </span>
        </div>
        <div className="d-flex align-items-center bg-white rounded-pill p-2 drop-shadow gap-2 mt-2">
          <PatientAgeIcon />
          <span className="royal-large">
            سن بیمار :{" "}
            <span className="bold500-large">{overAllData.patientAge}</span>
          </span>
        </div>

        {/* task deadline info currently disable */}
        {/* <div className="d-flex align-items-center bg-white rounded-pill p-2 drop-shadow gap-2 mt-2">
          <SingleTaskCalendar />
          <span className="royal-large">
            {" "}
            مدت زمان انجام این مرحله: {overAllData.deadline}
          </span>
        </div> */}

        <div className="d-flex align-items-center bg-white rounded-pill p-2 drop-shadow gap-2 mt-2">
          <SingleTaskReceipt />
          <span className="royal-large">
            {" "}
            شماره سفارش:{" "}
            <span className="bold500-large">{overAllData.orderNumber}</span>
          </span>
        </div>
        <div className="bg-white rounded-5 p-1 mt-3 drop-shadow">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>شماره دندان</th>
                  <th>رنگ دندان</th>
                </tr>
              </thead>
              <tbody>
                {toothColor.map((color, i) => {
                  return (
                    <tr key={i} className="">
                      <td>
                        {Array.isArray(overAllData.toothNumber[i]) &&
                          overAllData.toothNumber[i].map((num, i) => {
                            return <span key={i}>{num} </span>;
                          })}
                      </td>
                      <td>{color}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {overAllData.description && (
          <div className="bg-white rounded-5 p-3 mt-3 drop-shadow thin-default">
            {overAllData.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overall;

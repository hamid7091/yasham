import React from "react";
import useDate from "../micro-components/useDate2";
import StartTimer from "../assets/svg-icons/StartTimer";
import EndTimer from "../assets/svg-icons/EndTimer";

const TimelineCard = ({
  step,
  currentStepIndex,
  activityIDs,
  getClass,
  index,
  assignedUser,
  isClient,
}) => {
  const completeDate = useDate(step.endDate);
  const startDate = useDate(step.startDate);

  const showExtraInfo = (event) => {
    const cardWrapper = event.currentTarget;
    const parentArray = Array.from(cardWrapper.parentElement.children);

    if (cardWrapper.classList.contains("show-extra-info")) {
      cardWrapper.classList.remove("show-extra-info");
    } else {
      cardWrapper.classList.add("show-extra-info");
      parentArray.forEach((child) => {
        if (cardWrapper != child) {
          child.classList.remove("show-extra-info");
        }
      });
    }
  };
  return (
    <div
      className={`timeline-task-wrapper has-pointer d-flex align-items-center gap-2 ${getClass(
        index,
        currentStepIndex
      )}`}
      onClick={index <= currentStepIndex ? showExtraInfo : undefined}
    >
      <div className="dot"></div>
      <div className="flex-grow-1 timeline-task">
        <div className="pe-4">
          {index < currentStepIndex && (
            <h5 className=" mb-2">
              مرحله <span className="dgrey-thin-bold">{step.name}</span>{" "}
              {!isClient && (
                <>
                  توسط{" "}
                  <span className="dgrey-thin-bold">
                    {step.user ? step.user : "اعلام نشده"}{" "}
                  </span>
                </>
              )}
              در تاریخ{" "}
              <span className="dgrey-thin-bold">
                {step.endDate ? completeDate : "اعلام نشده"}
              </span>{" "}
              انجام شد
            </h5>
          )}
          {index == currentStepIndex &&
            (assignedUser ? (
              <h5 className="mb-2">
                مرحله <span className="dgrey-thin-bold">{step.name}</span>{" "}
                {!isClient && (
                  <>
                    توسط{" "}
                    <span className="dgrey-thin-bold">{assignedUser} </span>
                  </>
                )}
                درحال انجام است
              </h5>
            ) : (
              <h5 className="mb-2">
                مرحله <span className="dgrey-thin-bold">{step.name}</span> در
                انتظار اساین شدن است
              </h5>
            ))}
          {index > currentStepIndex && (
            <h5>
              مرحله <span className="dgrey-thin-bold">{step.name}</span>{" "}
              درانتظار انجام است
            </h5>
          )}

          <div className="timeline-card-extra-info align-items-center ">
            <div className="thin-default">
              <span className="ms-2">
                <StartTimer />
              </span>
              {activityIDs.map((id, i) => {
                if (id == step.id) {
                  return startDate;
                } else {
                  return "";
                }
              })}
            </div>
            <div className="thin-default">
              <span className="ms-2">
                <EndTimer />
              </span>
              {activityIDs.map((id, i) => {
                if (id == step.id) {
                  return completeDate;
                } else {
                  return "";
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;

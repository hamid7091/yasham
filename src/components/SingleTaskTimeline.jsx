import React, { useEffect, useRef, useState } from "react";
import TimelineCard from "./TimelineCard";

const SingleTaskTimeline = ({ timelineData, assignedUser, userRole }) => {
  const lineBarRef = useRef(null);
  let progressbar = require("progressbar.js");

  console.log(timelineData);
  const percentage = timelineData.taskProgressPercentage;
  const [currentStepIndex, setCurrentStepIndex] = useState();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    let lineBar = new progressbar.Line(lineBarRef.current, {
      strokeWidth: 1,
      easing: "easeInOut",
      duration: 1400,
      color: "#FFC700",
      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: { width: "100%", height: "8px" },
      text: {
        style: {
          // Text color.
          // Default: same as stroke color (options.color)
          color: "#999",
          position: "absolute",
          left: 0,
          top: 0,
          padding: 0,
          margin: 0,
          transform: null,
        },
        autoStyleContainer: false,
      },
      from: { color: "#FFC700" },
      to: { color: "#02A676" },
      step: (state, lbar) => {
        lbar.setText(Math.round(lbar.value() * 100) + " %");
        lbar.path.setAttribute("stroke", state.color);
      },
    });
    lineBar.animate(percentage / 100);
    return () => {
      if (lineBar) {
        lineBar.destroy();
      }
    };
  }, [lineBarRef]);

  const steps = timelineData.totalSteps;
  const currentStepId = timelineData.currentStep.id;
  const lastStepID =
    timelineData.totalSteps[timelineData.totalSteps.length - 1].id;
  const activity = timelineData.activity;
  const activityIDs = Object.keys(timelineData.activity);

  useEffect(() => {
    steps.forEach((step, index) => {
      if (step.id == currentStepId) {
        setCurrentStepIndex(index);
      }
      activityIDs.forEach((id) => {
        if (id == step.id) {
          step.user = activity[id].user;
          step.startDate = activity[id].start;
          step.endDate = activity[id].complete;
        }
      });
    });
    userRole.forEach((role) => {
      if (role === "client") {
        setIsClient(true);
      }
    });
  }, []);
  const getClass = (index, currentStep, isTaskDone) => {
    if (index < currentStep || isTaskDone) {
      return "finished";
    } else if (index == currentStep) {
      return " current-step";
    } else {
      return "";
    }
  };

  return (
    <div className="single-task-container">
      <div className="progress-bar-container my-4">
        <div
          ref={lineBarRef}
          id="line-progress-bar"
          className="line-progress-bar"
        >
          <p className="mb-1 vlroyal-default-thin">
            در مرحله {timelineData.currentStep.name}
          </p>
        </div>
      </div>
      <div className="p-3">
        <div className="timeline-cards-container">
          {steps.map((step, i) => {
            return (
              <TimelineCard
                assignedUser={assignedUser}
                step={step}
                key={i}
                currentStepIndex={currentStepIndex}
                activityIDs={activityIDs}
                getClass={getClass}
                index={i}
                isClient={isClient}
                lastStepID={lastStepID}
                currentStepId={currentStepId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleTaskTimeline;

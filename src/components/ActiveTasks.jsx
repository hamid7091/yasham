import React, { useEffect, useRef } from "react";
import useDate from "../micro-components/useDate2";
import { Link, useLocation } from "react-router-dom";
import CalendarActiveTask from "../assets/svg-icons/CalendarActiveTask";

const ActiveTasks = (taskInfo) => {
  var ProgressBar = require("progressbar.js");
  const location = useLocation();
  const percentage = taskInfo.taskInfo.percentage;
  const progressBarRef = useRef(null);
  const date = useDate(taskInfo.taskInfo.date);

  useEffect(() => {
    let circle;
    if (progressBarRef.current) {
      circle = new ProgressBar.Circle(progressBarRef.current, {
        strokeWidth: 8,
        easing: "easeInOut",
        duration: 1500,
        color: "#fff",
        trailColor: "#79A3FE",
        trailWidth: 4,
        svgStyle: {
          zIndex: "-1",
        },
        step: (state, lbar) => {
          lbar.setText(Math.round(lbar.value() * 100) + " %");
        },
      });
      circle.animate(percentage / 100);
    }
    return () => {
      if (circle) {
        circle.destroy();
      }
    };
  }, [progressBarRef]);

  return (
    <Link to={`/task/${taskInfo.taskInfo.taskID}`} state={location.pathname}>
      <div className="position-relative drown bg-royal rounded-5 pt-4 pb-2 px-4 mb-2">
        <div className="dborder-dashed-vlroyal d-flex justify-content-between align-items-center">
          <div className="pe-1">
            <h5 className="white-xlarge-bold pb-2 mb-0">
              {taskInfo.taskInfo.taskType}
            </h5>
            <h5 className="vlroyal-large-thin mb-4">
              {taskInfo.taskInfo.client}
            </h5>
          </div>
          <div className="circle-progres-bar">
            <div
              id="progress-bar1"
              className="progress-bar ps-1"
              ref={progressBarRef}
            ></div>
          </div>
        </div>
        <div className="d-flex align-items-center my-3">
          <span>
            <CalendarActiveTask />
          </span>
          <h5 className="white-default-thin flex-grow-1 mb-0 px-2">{date}</h5>

          <h5 className="border-lroyal royal-default-bold500 bg-vlroyal rounded-pill py-2 px-3 mb-0">
            {taskInfo.taskInfo.step}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default ActiveTasks;

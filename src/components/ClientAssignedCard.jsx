import React, { useEffect, useRef } from "react";
import BackIcon from "../assets/svg-icons/BackIcon";
import { Link, useLocation } from "react-router-dom";
import useDate from "../micro-components/useDate2";
import ProfileIcon from "../assets/svg-icons/ProfileIcon";
import ClientIcon from "../assets/svg-icons/ClientIcon";
import Calendar30 from "../assets/svg-icons/Calendar30";

const ClientAssignedCard = ({ order }) => {
  const date = useDate(order.date);
  const location = useLocation();
  const lineBarRef = useRef(null);
  let lineProgressbar = require("progressbar.js");
  useEffect(() => {
    let lineBar = new lineProgressbar.Line(lineBarRef.current, {
      strokeWidth: 1,
      easing: "easeInOut",
      duration: 1400,
      color: "#FFC700",
      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: { width: "100%", height: "8px" },
      text: {
        style: {
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
      from: { color: "#2f66db" },
      to: { color: "#2f66db" },
      step: (state, lbar) => {
        lbar.setText(Math.round(lbar.value() * 100) + " %");
        lbar.path.setAttribute("stroke", state.color);
      },
    });
    lineBar.animate(order.percentage / 100);
    return () => {
      if (lineBar) {
        lineBar.destroy();
      }
    };
  }, [lineBarRef]);

  return (
    <Link
      className="has-pointer py-5"
      to={`/task/${order.taskID}`}
      state={location.pathname}
    >
      <div className="posted-card drop-shadow mb-3 p-4 rounded-5">
        <div className="">
          <div className="d-flex align-items-start justify-content-between">
            <div>
              <h5 className="grey-large-bold pb-2">
                <ProfileIcon />
                {order.patientFullName}
              </h5>
              <h5 className="lgrey-default-thin d-flex align-items-center gap-2">
                <ClientIcon />
                <span>{order.client} </span>
                <Calendar30 />
                <span>{date}</span>
              </h5>
            </div>
            <div className="">
              <BackIcon />
            </div>
          </div>
          <hr className="message-separator-ulgrey mt-2" />
          <div className="progress-bar-container my-2">
            <div
              ref={lineBarRef}
              id="card2-line-progress-bar"
              className="card-line-progress-bar"
            >
              <p className="mb-1 vlroyal-default-thin">در مرحله {order.step}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClientAssignedCard;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/universal-styles.css";
import "./styles/styles-svg.css";
import "./styles/styles-btn.css";
import "./styles/styles-form.css";
import "./styles/styles-tabs.css";
import "./styles/styles-box.css";
import "./styles/styles-popup.css";
import "./styles/styles-table.css";
import "./styles/styles-timeline.css";
import "./styles/styles-badge.css";

Loading.init({
  fontFamily: "Vazir FD",
  backgroundColor: "rgba(0,0,0,0.9)",
  svgColor: "var(--blue-royal)",
});
Notify.init({
  position: "center-top",
  borderRadius: "5rem",
  fontFamily: "Vazir FD",
  fontSize: "14px",
  rtl: "true",
  width: "",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

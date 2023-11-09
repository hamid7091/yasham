import React from "react";
import DashboardIcon from "../assets/svg-icons/DashboardIcon";
import FilledDashboardIcon from "../assets/svg-icons/FilledDashboardIcon";
import MenuIcon from "../assets/svg-icons/MenuIcon";
import FilledMenuIcon from "../assets/svg-icons/FilledMenuIcon";
import InventoryIcon from "../assets/svg-icons/InventoryIcon";
import InventoryIconFilled from "../assets/svg-icons/InventoryIconFilled";
import { footerChanger } from "../util-functions/tabChanger";

const InventoryFooter = ({ setLocation }) => {
  return (
    <div dir="rtl" className="footer-container fixed-bottom bottom-0 bg-light">
      <footer className="footer-tabs-wrapper d-flex p-3 justify-content-around bg-white align-items-center drop-shadow">
        <div
          className="p-2 has-pointer d-flex align-items-center"
          onClick={(event) => footerChanger(event, setLocation)}
          id="menu"
        >
          <MenuIcon className="" />
          <FilledMenuIcon className="d-none" />
          <span className="d-none"></span>
        </div>
        <div
          className=" py-1 px-3 has-pointer d-flex align-items-center"
          onClick={(event) => footerChanger(event, setLocation)}
          id="second"
        >
          <InventoryIconFilled className="" />
          <InventoryIcon className="d-none" />
          <span className="d-none me-1">انبار</span>
        </div>
        <div
          className="active-footer-tab py-1 px-3 has-pointer d-flex align-items-center"
          onClick={(event) => footerChanger(event, setLocation)}
          id="first"
        >
          <DashboardIcon className="d-none" />
          <FilledDashboardIcon className="" />
          <span className="me-1">داشبورد</span>
        </div>
      </footer>
    </div>
  );
};

export default InventoryFooter;

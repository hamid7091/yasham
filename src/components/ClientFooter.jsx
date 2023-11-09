import React, { useRef, useState } from "react";
import PlusIcon from "../assets/svg-icons/PlusIcon";
import FooterWallet from "../assets/svg-icons/FooterWallet";
import FilledFooterWallet from "../assets/svg-icons/FilledFooterWallet";
import { Link } from "react-router-dom";
import OrderRegister from "./OrderRegister";

import { footerChanger } from "../util-functions/tabChanger";
import MenuIcon from "../assets/svg-icons/MenuIcon";
import FilledMenuIcon from "../assets/svg-icons/FilledMenuIcon";
import Notepad from "../assets/svg-icons/Notepad";
import FilledNotepad from "../assets/svg-icons/FilledNotepad";
import DashboardIcon from "../assets/svg-icons/DashboardIcon";
import FilledDashboardIcon from "../assets/svg-icons/FilledDashboardIcon";
import OrderIcon from "../assets/svg-icons/OrderIcon";
import OrderIconFilled from "../assets/svg-icons/OrderIconFilled";

const ClientFooter = ({ setLocation }) => {
  return (
    <div dir="rtl" className="footer-container fixed-bottom bottom-0 bg-light">
      <footer className="footer-tabs-wrapper d-flex p-3 justify-content-around bg-white align-items-center drop-shadow">
        <div
          className="p-2 has-pointer d-flex align-items-center"
          onClick={(event) => footerChanger(event, setLocation)}
        >
          <span className="">
            <MenuIcon className="" />
          </span>
          <span className="d-none">
            <FilledMenuIcon />
          </span>
          <span className="d-none"></span>
        </div>
        <div
          className=" py-1 px-3 has-pointer d-flex align-items-center"
          id="second"
          onClick={(event) => footerChanger(event, setLocation)}
        >
          <span className="">
            <OrderIcon className="" />
          </span>
          <span className="d-none">
            <OrderIconFilled />
          </span>
          <span className="d-none">لیست سفارشات</span>
        </div>
        <div
          className="active-footer-tab py-1 px-3 has-pointer d-flex align-items-center"
          onClick={(event) => footerChanger(event, setLocation)}
        >
          <DashboardIcon className="d-none" />
          <FilledDashboardIcon className="" />
          <span className="">داشبورد</span>
        </div>
      </footer>
    </div>
  );
};

export default ClientFooter;

import React from "react";
import AddUserIcon from "../assets/svg-icons/AddUserIcon";
import MyTasksIcon from "../assets/svg-icons/MyTasksIcon";
import RegisterOrderIcon from "../assets/svg-icons/RegisterOrderIcon";
import NotifIcon from "../assets/svg-icons/NotifIcon";
import ProfileIcon from "../assets/svg-icons/ProfileIcon";
import MenuClipboardIcon from "../assets/svg-icons/MenuClipboardIcon";
import HeadphoneIcon from "../assets/svg-icons/HeadphoneIcon";
import OrdersIcon from "../assets/svg-icons/OrdersIcon";
import MenuWalletIcon from "../assets/svg-icons/MenuWalletIcon";
import MenuFinancialIcon from "../assets/svg-icons/MenuFinancialIcon";
import WalletTickedIcon from "../assets/svg-icons/WalletTickedIcon";
import BusinessIcon from "../assets/svg-icons/BusinessIcon";
import AddStockIcon from "../assets/svg-icons/AddStockIcon";
import RechargeStockIcon from "../assets/svg-icons/RechargeStockIcon";
import InventoryManagementIcon from "../assets/svg-icons/InventoryManagementIcon";
import ReturnIcon from "../assets/svg-icons/ReturnIcon";
import LikeIcon from "../assets/svg-icons/LikeIcon";
import { useLocation, useNavigate } from "react-router-dom";
import NotepadFilled from "../assets/svg-icons/NotepadFilled";
import ClipboardFilled from "../assets/svg-icons/ClipboardFilled";
import OrderListIcon30 from "../assets/svg-icons/OrderListIcon30";
import AllEmployeeIcon from "../assets/svg-icons/AllEmployeeIcon";
import AllBusinessesIcon from "../assets/svg-icons/AllBusinessesIcon";
import UsersActionIcon from "../assets/svg-icons/UsersActionsIcon";
import ShippingActionIcon from "../assets/svg-icons/ShippingActionIcon";

const ActionMenuCard = ({
  cap,
  userInfo,
  serviceType,
  clientsList,
  isSupervisor,
  userRole,
  businessInfo,
  universalUnits,
}) => {
  console.log(serviceType);
  console.log(clientsList);
  console.log(isSupervisor);
  console.log(businessInfo);
  console.log(userRole);
  const location = useLocation();

  const navigate = useNavigate();

  const redirect = (event) => {
    const target = Array.from(event.currentTarget.children)[1].innerHTML;

    if (target === "پروفایل") {
      navigate("/profile", { state: { user: userInfo, userRole: userRole } });
    }
    if (target === "ثبت سفارش") {
      navigate("/registerOrder", {
        state: {
          serviceType,
          clientsList,
          isSupervisor,
        },
      });
    }
    if (target === "کارکرد") {
      navigate("/performance", { state: location.pathname });
    }
    if (target === "کسب و کار") {
      navigate("/businessInfo", { state: { businessInfo: businessInfo } });
    }
    if (target === "فاکتور") {
      navigate("/invoices");
    }
    if (target === "تسویه حساب") {
      navigate("/checkout");
    }
    if (target === "تسک من") {
      navigate("/myTasks");
    }
    if (target === "آیتم جدید") {
      navigate("/addNewStockItem", { state: universalUnits });
    }
    if (target === "مرجوعی") {
      //navigate("/returnItem");
    }
    if (target === "انبارگردانی") {
      // navigate("/inventoryHandling");
    }
    if (target === "لیست سفارشات") {
      navigate("/orderList", { state: location.pathname });
    }
    if (target === "گزارش وظایف") {
      navigate("/taskReport");
    }
    if (target === "گزارش کارکرد") {
      navigate("/performanceReport");
    }
    if (target === "لیست کارمندان") {
      navigate("/allEmployees", { state: location.pathname });
    }
    if (target === "کسب و کارها" && userRole[0] === "financial_manager") {
      navigate("/allBusinesses");
    }
    if (target === "کسب و کارها" && userRole[0] === "reception") {
      navigate("/allBusinessesReception");
    }
    if (target === "وظایف پیک") {
      navigate("/allDeliveryTasks");
    }
    if (target === "لیست کاربران") {
      navigate("/userList");
    }
  };

  return (
    <div className="action-menu-card has-pointer" onClick={redirect}>
      <span>
        {cap === "ایجاد کارمند" && <AddUserIcon />}
        {cap === "تسک من" && <MyTasksIcon />}
        {cap === "ثبت سفارش" && <RegisterOrderIcon />}
        {cap === "اطلاعیه" && <NotifIcon />}
        {cap === "پروفایل" && <ProfileIcon />}
        {cap === "کارکرد" && <MenuClipboardIcon />}
        {cap === "پشتیبانی" && <HeadphoneIcon />}
        {cap === "تسویه حساب" && <WalletTickedIcon />}
        {cap === "امور مالی" && <MenuWalletIcon />}
        {cap === "فاکتور" && <MenuFinancialIcon />}
        {cap === "کسب و کار" && <BusinessIcon />}
        {cap === "آیتم جدید" && <AddStockIcon />}
        {cap === "مرجوعی" && <ReturnIcon />}
        {cap === "انبارگردانی" && <InventoryManagementIcon />}
        {cap === "رضایتمندی" && <LikeIcon />}
        {cap === "گزارش وظایف" && <NotepadFilled />}
        {cap === "گزارش کارکرد" && <ClipboardFilled />}
        {cap === "لیست سفارشات" && <OrderListIcon30 />}
        {cap === "لیست کارمندان" && <AllEmployeeIcon />}
        {cap === "کسب و کارها" && <AllBusinessesIcon />}
        {cap === "لیست کاربران" && <UsersActionIcon />}
        {cap === "وظایف پیک" && <ShippingActionIcon />}
      </span>
      <span>{cap}</span>
    </div>
  );
};

export default ActionMenuCard;

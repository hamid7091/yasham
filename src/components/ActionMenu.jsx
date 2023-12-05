import React, { useMemo } from "react";
import ActionMenuCard from "./ActionMenuCard";

const ActionMenu = ({ userRole, userInfo, businessInfo }) => {
  //   ------------------------------------------------------

  const memorizedCaps = useMemo(() => {
    const capsKeys = Object.keys(userInfo.userCaps);
    const caps = [];
    capsKeys.forEach((cap) => {
      cap === "اطلاعیه" && caps.push(cap);
      cap === "پروفایل" && caps.push(cap);
      cap === "کارکرد" && caps.push(cap);
      cap === "ثبت سفارش" && caps.push(cap);
      cap === "ایجاد کارمند" && caps.push(cap);
      cap === "تسک من" && caps.push(cap);
      cap === "پشتیبانی" && caps.push(cap);
      cap === "تسویه حساب" && caps.push(cap);
      cap === "امور مالی" && caps.push(cap);
      cap === "فاکتور" && caps.push(cap);
      cap === "کسب و کار" && caps.push(cap);
      cap === "آیتم جدید" && caps.push(cap);
      cap === "انبارگردانی" && caps.push(cap);
      cap === "مرجوعی" && caps.push(cap);
      cap === "رضایتمندی" && caps.push(cap);
      cap === "گزارش وظایف" && caps.push(cap);
      cap === "گزارش کارکرد" && caps.push(cap);
      cap === "لیست سفارشات" && caps.push(cap);
      cap === "لیست کارمندان" && caps.push(cap);
      cap === "کسب و کارها" && caps.push(cap);
      cap === "لیست کاربران" && caps.push(cap);
      cap === "وظایف پیک" && caps.push(cap);
    });
    return caps;
  }, [userInfo]);

  return (
    <div className="menu-cards-container px-3 mt-4 pb-100">
      {memorizedCaps.map((cap, index) => {
        return (
          <ActionMenuCard
            key={index}
            cap={cap}
            businessInfo={businessInfo}
            userRole={userRole}
          />
        );
      })}
    </div>
  );
};

export default ActionMenu;

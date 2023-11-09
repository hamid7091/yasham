import React, { useEffect, useState } from "react";
import ActionMenuCard from "./ActionMenuCard";

const ActionMenu = ({
  userRole,
  userInfo,
  serviceType,
  clientsList,
  businessInfo,
  universalUnits,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [isInventory, setIsInventory] = useState(false);
  const [isPManager, setIsPManager] = useState(false);
  const [isFManager, setIsFManager] = useState(false);
  const [isReception, setIsReception] = useState(false);

  //   ------------------------------------------------------
  const capsKeys = Object.keys(userInfo.userCaps);
  console.log(capsKeys);
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

  useEffect(() => {
    userRole.forEach((role) => {
      if (role === "shipping") {
        setIsShipping(true);
      } else if (role === "client") {
        setIsClient(true);
      } else if (role === "employee") {
        setIsEmployee(true);
      } else if (
        role === "administrator" ||
        role === "supervisor" ||
        role === "supper_administrator"
      ) {
        setIsSupervisor(true);
      } else if (role === "inventory_manager") {
        setIsInventory(true);
      } else if (role === "project_manager") {
        setIsPManager(true);
      } else if (role === "financial_manager") {
        setIsFManager(true);
      } else if (role === "reception") {
        setIsReception(true);
      }
    });
  }, []);

  return (
    <div className="menu-cards-container px-3 mt-4">
      {isClient && (
        <>
          {caps.map((cap, index) => {
            return (
              <ActionMenuCard
                key={index}
                cap={cap}
                userInfo={userInfo}
                serviceType={serviceType}
                userRole={userRole}
                businessInfo={businessInfo}
              />
            );
          })}
        </>
      )}
      {isEmployee && !isSupervisor && (
        <>
          {caps.map((cap, index) => {
            return (
              <ActionMenuCard
                key={index}
                cap={cap}
                userInfo={userInfo}
                clientsList={clientsList}
                userRole={userRole}
              />
            );
          })}
        </>
      )}
      {isSupervisor && isEmployee && (
        <>
          {caps.map((cap, index) => {
            return (
              <ActionMenuCard
                key={index}
                cap={cap}
                userInfo={userInfo}
                serviceType={serviceType}
                clientsList={clientsList}
                isSupervisor={isSupervisor}
                userRole={userRole}
              />
            );
          })}
        </>
      )}
      {isSupervisor && !isEmployee && (
        <>
          {caps.map((cap, index) => {
            return (
              <ActionMenuCard
                key={index}
                cap={cap}
                userInfo={userInfo}
                serviceType={serviceType}
                clientsList={clientsList}
                isSupervisor={isSupervisor}
                userRole={userRole}
              />
            );
          })}
        </>
      )}
      {isShipping && (
        <>
          {caps.map((cap, index) => {
            return (
              <ActionMenuCard
                key={index}
                cap={cap}
                userInfo={userInfo}
                serviceType={serviceType}
                userRole={userRole}
                businessInfo={businessInfo}
              />
            );
          })}
        </>
      )}
      {isInventory && (
        <>
          {caps.map((cap, index) => {
            return (
              <ActionMenuCard
                key={index}
                cap={cap}
                userInfo={userInfo}
                serviceType={serviceType}
                userRole={userRole}
                businessInfo={businessInfo}
                universalUnits={universalUnits}
              />
            );
          })}
        </>
      )}
      {isPManager && (
        <>
          {caps.map((cap, index) => {
            return (
              <ActionMenuCard
                key={index}
                cap={cap}
                userInfo={userInfo}
                serviceType={serviceType}
                userRole={userRole}
                businessInfo={businessInfo}
                universalUnits={universalUnits}
              />
            );
          })}
        </>
      )}
      {isFManager && (
        <>
          {caps.map((cap, index) => {
            return (
              <ActionMenuCard
                key={index}
                cap={cap}
                userInfo={userInfo}
                serviceType={serviceType}
                userRole={userRole}
                businessInfo={businessInfo}
                universalUnits={universalUnits}
              />
            );
          })}
        </>
      )}
      {isReception && (
        <>
          {caps.map((cap, index) => {
            return (
              <ActionMenuCard
                key={index}
                cap={cap}
                userInfo={userInfo}
                serviceType={serviceType}
                userRole={userRole}
                businessInfo={businessInfo}
                universalUnits={universalUnits}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ActionMenu;

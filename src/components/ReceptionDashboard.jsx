import React from "react";
import ClientTaskCard from "./ClientTaskCard";
import PackageCard from "./PackageCard";
import { useNavigate } from "react-router-dom";
import Message from "../micro-components/Message";

const ReceptionDashboard = ({ dailyOrders, recentOrders, packageData }) => {
  const naviagte = useNavigate();
  console.log(dailyOrders);
  console.log(recentOrders);
  console.log(packageData);
  const handleNavigation = () => {
    const second = document.getElementById("second");
    second.click();
  };
  const handleRedirect = () => {
    naviagte("/allDeliveryTasks");
  };
  return (
    dailyOrders && (
      <div className="container px-3 mb-100" dir="rtl">
        <section>
          <div className="bg-white rounded-5 p-4 d-flex align-items-center justify-content-center dborder-thick-royal">
            <span className="grey-xxlarge-bold ms-2">سفارشات امروز: </span>
            <span className="bold-xxlarge">
              {dailyOrders?.count.order_count}
            </span>
          </div>
        </section>
        <hr />
        <section>
          <div className="d-flex align-items-center justify-content-between px-2">
            <span className="bold-xlarge">لیست سفارشات جدید</span>
            <span
              className="grey-thin-bold has-pointer"
              onClick={handleNavigation}
            >
              مشاهده همه
            </span>
          </div>
          {recentOrders ? (
            recentOrders?.map((order, index) => {
              return (
                <ClientTaskCard
                  order={order}
                  key={index}
                  loadedFrom={"dashboard"}
                  isClient={false}
                  isFManager={true}
                />
              );
            })
          ) : (
            <Message>سفارشی ثبت نشده است</Message>
          )}
        </section>
        <hr />
        <section>
          <div className="d-flex align-items-center justify-content-between px-2 mb-3">
            <span className="bold-xlarge">لیست وظایف پیک</span>
            <span
              className="grey-thin-bold has-pointer"
              onClick={handleRedirect}
            >
              مشاهده همه
            </span>
          </div>
          {packageData.length ? (
            packageData?.map((pkg, index) => {
              return (
                <PackageCard
                  key={index}
                  packageData={pkg}
                  isFromShipping={true}
                />
              );
            })
          ) : (
            <Message>وظیفه ای ثبت نشده است</Message>
          )}
        </section>
      </div>
    )
  );
};

export default ReceptionDashboard;

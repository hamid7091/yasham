import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import OrderList from "./OrderList";
import Invoices from "./Invoices";

const SingleBusiness = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const params = useParams();
  console.log(params.id);

  const [businessInfo, setBusinessInfo] = useState();
  const [tabLocation, setTabLocation] = useState("orders");

  const mockBusinessInfoResponse = {
    businessInfo: {
      businessName: "علی دین پرست",
      businessAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      businessContact: "04433443344",
      businessAddress: "یک آدرس مشخص در خیابان معلوم و کوچه مذکور",
      locations: "some shitty link to a shity location",
    },
    statusReport: {
      orderCount: "23",
      income: 25000000,
      profit: 15000000,
      debt: 11000000,
    },
    orders: [
      {
        orderID: "123456",
        patientName: "حمید قهرمانی",
        price: 1500000,
        date: "1402-09-22",
        invoiceID: "22",
        invoiceStatus: "1",
      },
    ],
    invoices: [
      {
        invoiceID: "123456",
        price: 35000000,
        date: "1402-09-12",
        paymentMethod: "نقدی",
        invoiceStatus: "1",
      },
    ],
  };

  const getBusinessInfoURL = "some url";
  const getBusinessInfoHeader = new Headers();
  getBusinessInfoHeader.append("Authorization", `Bearer ${accessToken}`);
  const getBusinessInfoFormdata = new FormData();
  getBusinessInfoFormdata.append("businessID", params.id);
  const getBusinessInfoRequestOptions = {
    method: "POST",
    headers: getBusinessInfoHeader,
    body: getBusinessInfoFormdata,
    redirect: "follow",
  };

  const getBusinessInfo = async (url, options) => {
    Loading.standard("در حال در یافت اطلاعات");
    const response = await fetchData(url, options);
    setBusinessInfo(mockBusinessInfoResponse);
    Loading.remove();
  };
  const handleTabChange = (event) => {
    const orders = document.getElementById("orders");
    const invoices = document.getElementById("invoices");
    const info = document.getElementById("info");
    const selected = event.currentTarget;
    console.log(orders.id);
    console.log(invoices.id);
    console.log(info.id);
    console.log(selected.id);
    switch (selected.id) {
      case "orders":
        setTabLocation(selected.id);
        orders.classList.add("active-tab");
        invoices.classList.remove("active-tab");
        info.classList.remove("active-tab");
        break;

      case "invoices":
        setTabLocation(selected.id);
        orders.classList.remove("active-tab");
        invoices.classList.add("active-tab");
        info.classList.remove("active-tab");
        break;
      case "info":
        setTabLocation(selected.id);
        orders.classList.remove("active-tab");
        invoices.classList.remove("active-tab");
        info.classList.add("active-tab");
        break;
    }
  };

  useEffect(() => {
    getBusinessInfo(getBusinessInfoURL, getBusinessInfoRequestOptions);
  }, []);

  return (
    businessInfo && (
      <div className="container px-3" dir="rtl">
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
          <div className="bold-xlarge">عنوان کسب و کار</div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>
        <section className="d-flex flex-column align-items-center gap-3">
          <div>
            <img
              width={120}
              height={120}
              style={{ borderRadius: "50%" }}
              src={businessInfo.businessInfo.businessAvatar}
              alt=""
            />
          </div>
          <div>
            <span className="bold-xlarge">
              {businessInfo.businessInfo.businessName}
            </span>
          </div>
        </section>
        <section className="mb-3 mt-5">
          <div className="bg-white rounded-5 p-3">
            <div className="bold-xlarge p-3">
              <span>گزارش وضعیت</span>
            </div>
            <table className="task-report-table">
              <thead>
                <tr>
                  <th className="royal-default-bold500">تعداد سفارشات</th>
                  <th className="bg-ulgrey grey-default-bold500">
                    {businessInfo.statusReport.orderCount} عدد
                  </th>
                </tr>
                <tr>
                  <th className="royal-default-bold500">درآمد</th>
                  <th className="bg-ulgrey grey-default-bold500">
                    {businessInfo.statusReport.income / 1000000} میلیون
                  </th>
                </tr>
                <tr>
                  <th className="royal-default-bold500">سود</th>
                  <th className="bg-ulgrey grey-default-bold500">
                    {businessInfo.statusReport.profit / 1000000} میلیون
                  </th>
                </tr>
                <tr>
                  <th className="royal-default-bold500">بدهی</th>
                  <th className="bg-ulgrey grey-default-bold500">
                    {businessInfo.statusReport.debt / 1000000} میلیون
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </section>
        <section>
          <div className="log-in-tabs bg-white d-flex justify-content-between align-items-center rounded-pill text-center p-2 mx-2 my-2 drop-shadow">
            <span
              className="active-tab flex-fill py-2 px-1 has-pointer"
              id="orders"
              onClick={(event) => handleTabChange(event)}
            >
              سفارشات
            </span>
            <span
              className="flex-fill py-2 px-1 has-pointer"
              id="invoices"
              onClick={(event) => handleTabChange(event)}
            >
              فاکتورها
            </span>
            <span
              className="flex-fill py-2 px-1 has-pointer"
              id="info"
              onClick={(event) => handleTabChange(event)}
            >
              اطلاعات
            </span>
          </div>
          {tabLocation === "orders" && (
            <OrderList isDirect={true} fromSingleBusiness={true} />
          )}
          {tabLocation === "invoices" && <Invoices fromSingleBusiness={true} />}
        </section>
      </div>
    )
  );
};

export default SingleBusiness;

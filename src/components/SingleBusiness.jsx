import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import SingleHeader from "./SingleHeader";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import ClientTaskCard from "./ClientTaskCard";
import InvoiceCard from "./InvoiceCard";
import Message from "../micro-components/Message";

const SingleBusiness = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(params.id);

  const [businessInfo, setBusinessInfo] = useState();
  const [tabLocation, setTabLocation] = useState("orders");

  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState();

  const [orders, setOrders] = useState();
  const [invoices, setInvoice] = useState();

  const [
    isEmployee,
    isClient,
    isSupervisor,
    isShipping,
    isInventory,
    isPManager,
    isFManager,
    isReception,
  ] = useRoleSetter(userRole);

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
        orderID: "239",
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
      {
        invoiceID: 12,
        price: 8857642,
        date: "1402-7-16",
        type: null,
        status: 1,
      },
    ],
  };

  const getBusinessData = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/client/get_client", {
        clientID: params.id,
      });
      setBusinessInfo(response.data.response);
      setOrders(response.data.response.orders);
      setInvoice(response.data.response.invoices);

      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      // const response = {
      //   data: {
      //     response: {
      //       userInfo: {
      //         mobile: "9360390099",
      //         userAvatar:
      //           "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //         userCaps: {
      //           اطلاعیه: true,
      //           پروفایل: true,
      //           "لیست سفارشات": true,
      //           "کسب و کارها": true,
      //         },
      //         userFirstName: "حمید",
      //         userID: 123,
      //         userLastName: "مدیر مالی",
      //         userRole: ["financial_manager"],
      //       },
      //     },
      //   },
      // };
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (event) => {
    const orders = document.getElementById("orders");
    const invoices = document.getElementById("invoices");
    const info = document.getElementById("info");
    const selected = event.currentTarget;
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
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getBusinessData();
      getUser();
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      !isFManager && navigate("/unauthorized");
    }
  }, [isFManager]);

  return (
    businessInfo && (
      <div className="container px-3 mt-100" dir="rtl">
        <SingleHeader title={"عنوان کسب و کار"} location={location.state} />
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
            <div className="pb-3">
              {orders.map((order, index) => {
                return (
                  <ClientTaskCard
                    key={index}
                    order={order}
                    isClient={isClient}
                    isFManager={isFManager}
                    loadedFrom={"single"}
                  />
                );
              })}
            </div>
          )}
          {tabLocation === "invoices" && (
            <div className="pt-2 pb-3">
              {invoices ? (
                invoices.map((invoice, index) => {
                  return <InvoiceCard key={index} factor={invoice} />;
                })
              ) : (
                <Message>در حال حاظر فاکتوری صادر نشده</Message>
              )}
            </div>
          )}
          {tabLocation === "info" && (
            <div className="pt-2 pb-3">
              <div>
                <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow">
                  <span className="royal-large ms-2">نام کسب و کار</span>
                  <span className="grey-large-bold500">
                    {businessInfo.businessInfo.businessName}
                  </span>
                </div>
                <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
                  <span className="royal-large ms-2">شماره تماس کسب و کار</span>
                  <span className="grey-large-bold500">
                    {businessInfo.businessInfo.businessContact}
                  </span>
                </div>
                <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
                  <span className="royal-large ms-2">آدرس کسب و کار</span>
                  <span className="grey-large-bold500">
                    {businessInfo.businessInfo.businessAddress}
                  </span>
                </div>
                <div className="d-flex align-items-center bg-white rounded-pill p-4 drop-shadow mt-4">
                  <span className="royal-large ms-2">موقعیت مکانی</span>
                  <span className="grey-large-bold500">
                    {businessInfo.businessInfo.locations}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    )
  );
};

export default SingleBusiness;

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import InvoiceSuccessIcon from "../assets/svg-icons/InvoiceSuccessIcon";
import InvoiceSinglePendingIcon from "../assets/svg-icons/InvoiceSinglePendingIcon";
import InvoiceSingleFailIcon from "../assets/svg-icons/InvoiceSingleFailIcon";
import useDate from "../micro-components/useDate2";
import ClientTaskCard from "./ClientTaskCard";
import { Loading } from "notiflix";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import SingleHeader from "./SingleHeader";

const SingleInvoice = () => {
  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();

  const [invoiceData, setInvoiceData] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState();
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
  // const [isPortalReceived, setIsPortalReceived] = useState(false);
  // const [portalAddress, setPortalAddress] = useState();
  const isSingle = true;
  // -----------------------------------------------------------------------

  // -----------------------------------------------------------------------

  // -----------------------------------------------------------------------

  const getUser = async () => {
    try {
      //const response = await axiosInstance.post("/user/check_access_token");
      const response = {
        data: {
          response: {
            userInfo: {
              mobile: "9360390099",
              userAvatar:
                "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
              userCaps: {
                اطلاعیه: true,
                پروفایل: true,
                "لیست سفارشات": true,
                "کسب و کارها": true,
              },
              userFirstName: "حمید",
              userID: 123,
              userLastName: "مدیر مالی",
              userRole: ["financial_manager"],
            },
          },
        },
      };
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };
  const getInvoiceAxios = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post(
        "/invoice/get_invoice",
        {
          invoiceID: param.id,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data.response);
      setInvoiceData(response.data.response.invoice);
      setCards(response.data.response?.cards);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const handleRedirectToInvoiceUpdate = () => {
    navigate(`/invoiceUpdate/${param.id}`, {
      state: { idata: invoiceData, cards: cards },
    });
  };
  useEffect(() => {
    getInvoiceAxios();
    getUser();
  }, []);

  const paymentDate = useDate(invoiceData.paymentDate);
  const createDate = useDate(invoiceData.createDate);

  const handlePaymentInitAxios = async () => {
    const formdata = new FormData();
    formdata.append("invoiceID", param.id);
    formdata.append("callbackUrl", "http://localhost:3000/invoice_result/");
    try {
      Loading.standard("در حال اتصال");
      const response = await axiosInstance.post("/payment/init", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.response);
      window.location.href = response.data.response;
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  // useEffect(() => {
  //   isPortalReceived && navigate(portalAddress);
  // }, [isPortalReceived, portalAddress]);

  useEffect(() => {
    if (!isLoading) {
      !isFManager && !isClient && navigate("/unauthorized");
    }
  }, [isFManager, isClient]);

  return (
    <div className="container px-4" dir="rtl">
      <SingleHeader
        title={`شماره فاکتور ${param.id}`}
        location={location.state}
      />
      <section>
        {invoiceData.invoiceStatus === 3 && (
          <section>
            <div
              className="bg-white rounded-5 py-4 px-5 d-flex flex-column align-items-center"
              style={{ borderBottom: "12px solid var(--green-teal)" }}
            >
              <div>
                <InvoiceSuccessIcon />
              </div>
              <div className="greenTeal-xlarge-bold mb-3">پرداخت موفق</div>
              <div className="grey-default-thin text-center mb-3">
                فاکتور به شماره <span>{invoiceData.id}</span> به مبلغ{" "}
                <span>{invoiceData.price?.toLocaleString()}</span> تومان در
                تاریخ <span>{paymentDate}</span> بصورت{" "}
                <span>{invoiceData.paymentType}</span> پرداخت شده است
              </div>
              <div className="grey-default-thin d-flex align-items-center gap-4">
                <div className="d-flex flex-column">
                  <span style={{ whiteSpace: "nowrap" }}>کد پیگیری بانکی</span>
                  <span>روش پرداخت</span>
                </div>
                <div className="d-flex flex-column">
                  <span>{invoiceData.transactionID}</span>
                  <span>{invoiceData.paymentType}</span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3">
              <span className="btn-royal-bold rounded-pill flex-grow-1 py-3 text-center has-pointer">
                دریافت فایل PDF
              </span>
            </div>
          </section>
        )}
        {invoiceData.invoiceStatus === 1 && (
          <section>
            <div
              className="bg-white rounded-5 py-4 px-5 d-flex flex-column align-items-center"
              style={{ borderBottom: "12px solid var(--yellow)" }}
            >
              <div>
                <InvoiceSinglePendingIcon />
              </div>
              <div className="yellow-xlarge-bold mb-3">در انتظار پرداخت</div>
              <div className="grey-default-thin text-center mb-3">
                فاکتور به شماره <span>{param.id}</span> به مبلغ{" "}
                <span>{invoiceData.price?.toLocaleString()}</span> تومان در
                انتظار پرداخت می باشد
              </div>
            </div>
            {isClient && (
              <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3">
                <span
                  className="btn-royal-bold rounded-pill flex-grow-1 py-3 text-center has-pointer"
                  onClick={handlePaymentInitAxios}
                >
                  پرداخت ({invoiceData.price?.toLocaleString()} تومان)
                </span>
              </div>
            )}
          </section>
        )}
        {invoiceData.invoiceStatus === 2 && (
          <section>
            <div
              className="bg-white rounded-5 py-4 px-5 d-flex flex-column align-items-center"
              style={{ borderBottom: "12px solid var(--red)" }}
            >
              <div>
                <InvoiceSingleFailIcon />
              </div>
              <div className="red-xlarge-bold mb-3">لغو شده</div>
              <div className="grey-default-thin text-center mb-3">
                فاکتور به شماره <span>{param.id}</span> به تاریخ{" "}
                <span>{createDate}</span> لغو شده است
              </div>
            </div>
          </section>
        )}
      </section>
      <hr />
      <div className="pe-2">
        <span className="grey-xlarge-bold">لیست سفارشات این فاکتور</span>
        {invoiceData.invoiceStatus === 1 && (
          <span
            className="grey-thin-bold float-start has-pointer"
            onClick={handleRedirectToInvoiceUpdate}
          >
            ویرایش فاکتور
          </span>
        )}
      </div>
      <section className="pb-4">
        {cards &&
          cards.map((card, index) => {
            return (
              <ClientTaskCard
                order={card}
                isClient={isClient}
                key={index}
                loadedFrom={"invoiceList"}
                isFManager={isFManager}
              />
            );
          })}
      </section>
    </div>
  );
};

export default SingleInvoice;

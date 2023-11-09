import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import InvoiceSuccessIcon from "../assets/svg-icons/InvoiceSuccessIcon";
import InvoiceSinglePendingIcon from "../assets/svg-icons/InvoiceSinglePendingIcon";
import InvoiceSingleFailIcon from "../assets/svg-icons/InvoiceSingleFailIcon";
import fetchData from "../util-functions/fetchData";
import useDate from "../micro-components/useDate2";
import ClientTaskCard from "./ClientTaskCard";
import { Loading } from "notiflix";

const SingleInvoice = () => {
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("AccessToken");
  const param = useParams();
  console.log(param);
  const [invoiceData, setInvoiceData] = useState([]);
  const [cards, setCards] = useState([]);
  const [isPortalReceived, setIsPortalReceived] = useState(false);
  const [portalAddress, setPortalAddress] = useState();
  const isSingle = true;
  // -----------------------------------------------------------------------
  const InvoiceSingleURL = "https://samane.zbbo.net/api/v1/invoice/get_invoice";
  const InvoiceSingleHeader = new Headers();
  InvoiceSingleHeader.append("Authorization", `Bearer ${accessToken}`);
  const InvoiceSingleFormdata = new FormData();
  InvoiceSingleFormdata.append("invoiceID", param.id);
  const InvoiceSingleRequestOptions = {
    method: "POST",
    headers: InvoiceSingleHeader,
    body: InvoiceSingleFormdata,
    redirect: "follow",
  };
  // -----------------------------------------------------------------------
  const paymentPortalURL = "https://samane.zbbo.net/api/v1/payment/init";
  const callbackURL = `http://localhost:3000/invoice_result/`;
  const paymentFormdata = new FormData();
  paymentFormdata.append("invoiceID", param.id);
  paymentFormdata.append("callbackUrl", callbackURL);
  const paymentRequestOptions = {
    method: "POST",
    headers: InvoiceSingleHeader,
    body: paymentFormdata,
    redirect: "follow",
  };
  // -----------------------------------------------------------------------

  async function getInvoice(url, options) {
    const response = await fetchData(url, options);
    console.log(response);
    setInvoiceData(response.invoice);
    setCards(response?.cards);
  }
  const handleRedirectToInvoiceUpdate = () => {
    navigate(`/invoiceUpdate/${param.id}`, {
      state: { idata: invoiceData, cards: cards },
    });
  };

  useEffect(() => {
    getInvoice(InvoiceSingleURL, InvoiceSingleRequestOptions);
  }, []);

  const paymentDate = useDate(invoiceData.paymentDate);
  const createDate = useDate(invoiceData.createDate);

  const handlePaymentInit = async () => {
    Loading.standard("در حال اتصال به درگاه پرداخت");
    const response = await fetchData(paymentPortalURL, paymentRequestOptions);
    Loading.remove();
    console.log(response);
    console.log(response.message);
    Loading.remove();
    window.location.href = response;
  };
  useEffect(() => {
    isPortalReceived && navigate(portalAddress);
  }, [isPortalReceived, portalAddress]);

  // console.log(invoiceData);
  // console.log(cards);
  return (
    <div className="container px-4" dir="rtl">
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3 mb-4">
        <div className="bold-xlarge">شماره فاکتور {param.id}</div>
        <Link to="/invoices">
          <BackArrow />
        </Link>
      </header>
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
            <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3">
              <span
                className="btn-royal-bold rounded-pill flex-grow-1 py-3 text-center has-pointer"
                onClick={handlePaymentInit}
              >
                پرداخت ({invoiceData.price?.toLocaleString()} تومان)
              </span>
            </div>
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
        {invoiceData.status === 1 && (
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
              <ClientTaskCard order={card} isSingle={isSingle} key={index} />
            );
          })}
      </section>
    </div>
  );
};

export default SingleInvoice;

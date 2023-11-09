import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import fetchData from "../util-functions/fetchData";
import InvoiceSuccessIcon from "../assets/svg-icons/InvoiceSuccessIcon";

const CallBackPayment = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const [invoiceID, setInvoiceID] = useState();
  const href = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  // const id = urlParams.get("invoiceID");
  const auth = urlParams.get("Authority");
  const stat = urlParams.get("Status");
  const [responseCame, setResponseCame] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const verifyURL = "https://samane.zbbo.net/api/v1/payment/verify";
  const verifyHeader = new Headers();
  verifyHeader.append("Authorization", `Bearer ${accessToken}`);
  const verifyFormdata = new FormData();
  // verifyFormdata.append("invoiceID", id);
  verifyFormdata.append("authority", auth);
  const verifyRequestOptions = {
    method: "POST",
    headers: verifyHeader,
    body: verifyFormdata,
    redirect: "follow",
  };

  const verifyTransaction = async () => {
    const response = await fetchData(verifyURL, verifyRequestOptions);
    console.log(response);
    setInvoiceID(response.invoiceID);
    // setResponseCame(true);
    // navigate(`invoice/${invoiceID}`);
  };
  //   const param = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  // useEffect(() => {
  //   verifyTransaction();
  // }, []);

  useEffect(() => {
    console.log("fired");

    verifyTransaction();
    if (countdown === 0 || responseCame === true) {
      console.log("fired2");
      window.location.href = `http://localhost:3000/invoice/${invoiceID}`;

      // navigate(`invoice/${invoiceID}`);
    }
  }, [countdown, responseCame]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log(href);
  // console.log(id);
  console.log(auth);
  console.log(responseCame);
  console.log(invoiceID);

  return (
    <div className="container px-2 pt-5" dir="rtl">
      {/* <div>{id}</div>
      <div>{auth}</div>
      <div>{stat}</div> */}
      {stat === "OK" && (
        <section>
          <div
            //d-flex flex-column align-items-center
            className="bg-white rounded-5 py-4 px-5 "
            style={{ borderBottom: "12px solid var(--green-teal)" }}
          >
            <div className="text-center">
              <InvoiceSuccessIcon />
            </div>
            <div className="greenTeal-xlarge-bold mb-3 text-center">
              پرداخت شما با موفقیت انجام شد
            </div>
            <div className="bold-xlarge mb-3 text-center">
              تا انتقال به سایت پذیرنده {countdown}
            </div>
            <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3">
              <span
                className="btn-green-bold rounded-pill flex-grow-1 py-3 text-center has-pointer"
                onClick={() => {
                  setResponseCame(true);
                }}
              >
                انتقال به وبسایت
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CallBackPayment;

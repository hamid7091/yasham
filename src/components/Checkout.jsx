import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import CheckoutCard from "./CheckoutCard";
import useCart from "../micro-components/useCart";
import fetchData from "../util-functions/fetchData";
import Message from "../micro-components/Message";

const Checkout = () => {
  const state = useLocation();
  console.log(state.state);
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("AccessToken");
  const [checkoutData, setCheckoutData] = useState([]);
  const [receivedInvoiceID, setReceivedInvoiceID] = useState();
  const [isCheckoutSubmitted, setIsCheckoutSubmitted] = useState(false);

  const checkoutDataHeader = new Headers();
  checkoutDataHeader.append("Authorization", `Bearer ${accessToken}`);
  const checkoutURL = "https://samane.zbbo.net/api/v1/order/checkout";
  const handleCheckoutURL = "https://samane.zbbo.net/api/v1/invoice/create";
  const checkoutRequestOptions = {
    method: "POST",
    headers: checkoutDataHeader,
    redirect: "follow",
  };

  // const mock2 = [
  //   {
  //     orderID: 225,
  //     patientName: "علي عليزاده",
  //     date: "1402-4-19",
  //     price: 6580000,
  //   },
  //   {
  //     orderID: 221,
  //     patientName: "رضا رضازاده",
  //     date: "1402-4-19",
  //     price: 925000,
  //   },
  //   {
  //     orderID: 135,
  //     patientName: " ",
  //     date: "1401-9-5",
  //     price: 6580000,
  //   },
  // ];

  // const checkoutMockData = [
  //   {
  //     orderID: 1,
  //     patientName: "محمود احمدینژاد",
  //     date: "1402-06-25",
  //     price: 2500000,
  //   },
  //   {
  //     orderID: 2,
  //     patientName: "حمید قهرمانی",
  //     date: "1402-06-25",
  //     price: 3500000,
  //   },
  //   {
  //     orderID: 3,
  //     patientName: "علی قناتی",
  //     date: "1402-06-25",
  //     price: 4500000,
  //   },
  //   {
  //     orderID: 4,
  //     patientName: "بهراد طاهری نیا",
  //     date: "1402-06-25",
  //     price: 5500000,
  //   },
  //   {
  //     orderID: 5,
  //     patientName: "آراز استادی",
  //     date: "1402-06-25",
  //     price: 6600000,
  //   },
  //   {
  //     orderID: 6,
  //     patientName: "تارا سهرابی",
  //     date: "1402-06-25",
  //     price: 7700000,
  //   },
  //   {
  //     orderID: 7,
  //     patientName: "رضا رضایی",
  //     date: "1402-06-25",
  //     price: 880000,
  //   },
  // ];
  const { selectedOrdersIDs, totalPrice, addToCart, removeFromCart, isInCart } =
    useCart(checkoutData);

  useEffect(() => {
    if (state.state) {
      addToCart(state.state);
    }
  }, []);

  const handleAddOrderToCard = (order) => {
    addToCart(order);
  };
  const handleRemoveOrderFromCart = (order) => {
    removeFromCart(order);
  };
  const isOrderAdded = (order) => {
    return isInCart(order);
  };

  async function getCheckoutData(url, options) {
    const response = await fetchData(url, options);
    console.log(response);
    setCheckoutData(response.cards);
  }
  useEffect(() => {
    getCheckoutData(checkoutURL, checkoutRequestOptions);
  }, []);

  const handleCheckout = async () => {
    const handleCheckoutFormdata = new FormData();
    handleCheckoutFormdata.append(
      "orderIDs",
      JSON.stringify(selectedOrdersIDs)
    );
    const handleCheckoutRequestOptions = {
      method: "POST",
      headers: checkoutDataHeader,
      body: handleCheckoutFormdata,
      redirect: "follow",
    };
    const response = await fetchData(
      handleCheckoutURL,
      handleCheckoutRequestOptions
    );
    // console.log(response);
    // console.log(selectedOrdersIDs);
    // console.log(totalPrice);
    setReceivedInvoiceID(response.invoiceID);
    setIsCheckoutSubmitted(true);
  };
  useEffect(() => {
    console.log("fired");
    if (isCheckoutSubmitted) {
      console.log(receivedInvoiceID);
      navigate(`/invoice/${receivedInvoiceID}`);
    }
  }, [isCheckoutSubmitted]);
  return (
    <div className="container px-4" dir="rtl">
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3 mb-3">
        <div className="bold-xlarge">تسویه حساب</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <div className="mb-100">
        {checkoutData.length > 0 ? (
          checkoutData.map((data, index) => {
            return (
              <CheckoutCard
                data={data}
                key={index}
                handleAddOrderToCard={handleAddOrderToCard}
                handleRemoveOrderFromCart={handleRemoveOrderFromCart}
                isOrderAdded={isOrderAdded}
              />
            );
          })
        ) : (
          <Message>سفارش تمام شده برای نمایش وجود ندارد</Message>
        )}
      </div>
      <footer className="footer-container fixed-bottom bottom-0 bg-light">
        <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3">
          <span
            className="btn-royal-bold rounded-pill flex-grow-1 py-3 text-center has-pointer"
            onClick={handleCheckout}
            style={
              selectedOrdersIDs.length > 0
                ? {}
                : { pointerEvents: "none", color: "var(--blue-royal-light)" }
            }
          >
            تسویه حساب
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;

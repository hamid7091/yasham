import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import CheckoutCard from "./CheckoutCard";
import useCart from "../micro-components/useCart";
import Message from "../micro-components/Message";
import axiosInstance from "../util-functions/axiosInstance";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import useRoleSetter from "../micro-components/useRoleSetter";
import Unauthorized from "./Unauthorized";

const Checkout = () => {
  const state = useLocation();
  console.log(state.state);
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState([]);
  const [receivedInvoiceID, setReceivedInvoiceID] = useState();
  const [isCheckoutSubmitted, setIsCheckoutSubmitted] = useState(false);
  const [userRole, setUserRole] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  const { selectedOrdersIDs, totalPrice, addToCart, removeFromCart, isInCart } =
    useCart(checkoutData);
  useEffect(() => {
    console.log(isClient);
    console.log("ue1");
    if (!isLoading) {
      !isClient && navigate("/unauthorized");
    }
  }, [isClient]);
  useEffect(() => {
    console.log("ue2");
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

  const getCheckoutDataAxios = async () => {
    try {
      Loading.standard("در حاب دریافت اطلاعات");
      const response = await axiosInstance.post("/order/checkout");
      setCheckoutData(response.data.response.cards);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log("ue3");
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getCheckoutDataAxios();
      getUser();
    }
  }, []);

  const handleCheckoutAxios = async () => {
    const formdata = new FormData();
    formdata.append("orderIDs", JSON.stringify(selectedOrdersIDs));
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post("/invoice/create", formdata);
      setReceivedInvoiceID(response.data.response.invoiceID);
      setIsCheckoutSubmitted(true);
      Loading.remove();
    } catch (error) {
      console.error(error``);
      Loading.remove();
    }
  };
  useEffect(() => {
    console.log("ue4");
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
            onClick={handleCheckoutAxios}
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

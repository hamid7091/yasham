import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutCard from "./CheckoutCard";
import useCart from "../micro-components/useCart";
import Message from "../micro-components/Message";
import axiosInstance from "../util-functions/axiosInstance";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import useRoleSetter from "../micro-components/useRoleSetter";
import SingleHeader from "./SingleHeader";

const Checkout = () => {
  const state = useLocation();

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
    if (!isLoading) {
      !isClient && navigate("/unauthorized");
    }
  }, [isClient]);
  useEffect(() => {
    if (state.state) {
      addToCart(state.state);
    }
  }, []);

  const handleOrderAction = (order, action) => {
    if (action === "add") {
      addToCart(order);
    } else if (action === "remove") {
      removeFromCart(order);
    }
  };

  // =============================
  const memoizedIsOrderAdded = useMemo(() => {
    const isOrderAddedMemo = (order) => {
      return isInCart(order);
    };
    return isOrderAddedMemo;
  }, [isInCart]);
  // ==============================
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
    if (isCheckoutSubmitted) {
      console.log(receivedInvoiceID);
      navigate(`/invoice/${receivedInvoiceID}`);
    }
  }, [isCheckoutSubmitted]);

  return (
    <div className="container px-4" dir="rtl">
      <SingleHeader title={"تسویه حساب"} location={"/"} />
      <div className="mb-100">
        {checkoutData.length > 0 ? (
          checkoutData.map((data, index) => {
            return (
              <CheckoutCard
                data={data}
                key={index}
                handleAddOrderToCard={(order) =>
                  handleOrderAction(order, "add")
                }
                handleRemoveOrderFromCart={(order) =>
                  handleOrderAction(order, "remove")
                }
                isOrderAdded={memoizedIsOrderAdded}
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

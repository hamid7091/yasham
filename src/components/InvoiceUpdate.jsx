import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import fetchData from "../util-functions/fetchData";
import useCart from "../micro-components/useCart";
import BackArrow from "../assets/svg-icons/BackArrow";
import CheckoutCard from "./CheckoutCard";
import Message from "../micro-components/Message";
import { Loading } from "notiflix";

const InvoiceUpdate = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const param = useParams();
  const state = useLocation();
  console.log(param.id);
  console.log(state);

  const [allCheckoutData, setAllCheckoutData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [isUpdateSubmitted, setIsUpdateSubmitted] = useState(false);
  const { selectedOrdersIDs, totalPrice, addToCart, removeFromCart, isInCart } =
    useCart(allCheckoutData);

  //   ================================================================
  const editURL = "https://samane.zbbo.net/api/v1/invoice/edit";
  const editHeader = new Headers();
  editHeader.append("Authorization", `Bearer ${accessToken}`);
  const editFormdata = new FormData();
  editFormdata.append("invoiceID", param.id);
  const editRequestOptions = {
    method: "POST",
    headers: editHeader,
    body: editFormdata,
    redirect: "follow",
  };
  //   ================================================================
  const getEditData = async () => {
    const response = await fetchData(editURL, editRequestOptions);
    setAllCheckoutData(response.noInvoices);
    setAllCheckoutData((prevData) => [...prevData, ...response.cards]);
    setSelectedData(response.cards);
  };
  //   ================================================================
  useEffect(() => {
    getEditData();
  }, []);
  //   ================================================================
  const handleAddOrderToCard = (order) => {
    addToCart(order);
  };
  const handleRemoveOrderFromCart = (order) => {
    removeFromCart(order);
  };
  const isOrderAdded = (order) => {
    return isInCart(order);
  };
  //   ================================================================

  const updateInvoiceURL = "https://samane.zbbo.net/api/v1/invoice/update";
  const updateInvoiceFormdata = new FormData();
  updateInvoiceFormdata.append("invoiceID", param.id);
  updateInvoiceFormdata.append("orderIDs", JSON.stringify(selectedOrdersIDs));
  const updateInvoiceRequestOptions = {
    method: "POST",
    headers: editHeader,
    body: updateInvoiceFormdata,
    redirect: "follow",
  };

  const handleUpdateInvoice = async () => {
    Loading.standard("در حال ارسال درخواست");
    const response = await fetchData(
      updateInvoiceURL,
      updateInvoiceRequestOptions
    );
    console.log(response);
    setIsUpdateSubmitted(true);
    Loading.remove();
  };

  console.log(allCheckoutData);
  console.log(selectedData);
  useEffect(() => {
    selectedData.forEach((order) => {
      addToCart(order);
    });
  }, [selectedData]);
  useEffect(() => {
    isUpdateSubmitted && navigate(`/invoice/${param.id}`);
  }, [isUpdateSubmitted]);

  return (
    <div className="container px-4" dir="rtl">
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3 mb-3">
        <div className="bold-xlarge">ویرایش فاکتور</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <div className="mb-100">
        {allCheckoutData.length > 0 ? (
          allCheckoutData.map((data, index) => {
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
            onClick={handleUpdateInvoice}
            style={
              selectedOrdersIDs.length > 0
                ? {}
                : { pointerEvents: "none", color: "var(--blue-royal-light)" }
            }
          >
            به روز رسانی فاکتور
          </span>
        </div>
      </footer>
    </div>
  );
};

export default InvoiceUpdate;

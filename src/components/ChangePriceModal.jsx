import React, { useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axiosInstance from "../util-functions/axiosInstance";
import { useNavigate } from "react-router-dom";

const ChangePriceModal = ({ order, setisModalActive }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState();

  const handleClosePopup = () => {
    setisModalActive(false);
  };
  const handlePriceInputChange = (event) => {
    setPrice(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("price", price);
    formdata.append("orderID", order.id);
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post("order/update-price", formdata);
      Loading.remove();
      if (response.data.response.success) {
        setisModalActive(false);
        Notify.success(response.data.response.success);
        navigate("/orderList");
      }
    } catch (error) {
      console.error(error);
      setisModalActive(false);
      Notify.failure("خطا ! لطفا مجددا تلاش کنید");
      Loading.remove();
    }
  };

  return (
    <div dir="rtl" className="end-task-popup bg-light rounded-5 px-4 py-4">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <p className="bold-xxlarge mb-0">قیمت جدید</p>
        <span className="has-pointer" onClick={handleClosePopup}>
          <CloseIcon />
        </span>
      </div>
      <hr />
      <div className="mt-2 px-1">
        <form onSubmit={handleSubmit} className="edit-form form-group">
          <label htmlFor="price-input" className="bold500-large mb-3 me-3">
            قیمت جدید (تومان)
          </label>
          <input
            type="text"
            id="userLastName"
            className="form-control rounded-pill mb-3 py-3 border-0"
            placeholder="قیمت جدید را وارد کنید"
            onKeyUp={(event) => handlePriceInputChange(event)}
          />
          <button
            className="btn-royal-bold rounded-pill flex-grow-1 py-3 mt-3"
            disabled={price ? false : true}
          >
            ثبت قیمت جدید
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePriceModal;

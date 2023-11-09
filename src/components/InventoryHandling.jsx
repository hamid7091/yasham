import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import Select from "react-select";

const InventoryHandling = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#2f66db" : "#79a3fe",
      backgroundColor: state.isSelected ? "#b8cfff" : "#fff)",
      padding: "8px",
      fontWeight: "bold",
      ":hover": {
        backgroundColor: "#dee7fa",
        color: "var(--blue-royal)",
      },
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      borderRadius: "10rem",
      paddingInline: "8px",
      paddingBlock: "4px",
      border: "none",
      ":hover": {
        border: "2px solid var( --blue-royal)",
      },
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      fontWeight: "bold",
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--gray-very-light)",
      fontWeight: "bold",
      fontSize: "14px",
    }),
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      ":hover": {
        color: "var(--blue-royal-light)",
      },
      backgroundColor: "var(--blue-royal-very-light)",
      padding: "3px",
      marginRight: "5px",
      borderRadius: "6px",
    }),
    clearIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      ":hover": {
        color: "var(--blue-royal-light)",
      },
    }),
    menuList: (defaultStyles) => ({
      ...defaultStyles,
      borderRadius: "8px",
    }),
    input: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      fontSize: "16px",
    }),
    multiValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--blue-royal)",
      borderRadius: "10px",
      fontWeight: "bold",
      paddingRight: "10px",
    }),
    multiValueRemove: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "var(--blue-royal-light)",
      borderRadius: "50%",
      padding: "2px",
      margin: "5px",
    }),
  };
  const allItemsMockData = [
    {
      stockID: 1,
      stockName: "گچ سفید کاری",
      stockAmount: 5,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: "0",
    },
    {
      stockID: 2,
      stockName: "گچ سیاه",
      stockAmount: 6,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: "1",
    },
    {
      stockID: 3,
      stockName: "سیمان",
      stockAmount: 0,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: "0",
    },
    {
      stockID: 9,
      stockName: "الکل",
      stockAmount: 7,
      stockUnit: "لیتر",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: "1",
    },
    {
      stockID: 10,
      stockName: "پشمک",
      stockAmount: 65,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: "2",
    },
    {
      stockID: 10,
      stockName: "میوه",
      stockAmount: 45,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: "2",
    },
    {
      stockID: 11,
      stockName: "چای",
      stockAmount: 84,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: "2",
    },
    {
      stockID: 12,
      stockName: "اب نبات",
      stockAmount: 284,
      stockUnit: "عدد",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: "2",
    },
  ];
  const [allItems, setAllItems] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const handleItemUnit = (value) => {
    console.log(value);
    setSelectedItem(value);
  };
  const handleReturnAmount = (event) => {};
  const handleStockStatus = (event) => {};
  const itemOptions = [];
  useEffect(() => {
    allItemsMockData.forEach((itemData) => {
      console.log(itemData);
      itemOptions.push({
        label: itemData.stockName,
        value: itemData.stockID,
        unit: "(" + itemData.stockUnit + ")",
      });
    });
  }, [itemOptions]);

  useEffect(() => {
    setAllItems(allItemsMockData);
  }, []);

  console.log(itemOptions);
  return (
    <div className="container px-2" dir="rtl">
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3 px-2">
        <div className="bold-xlarge">انبارگردانی</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <div>
        <div className="mt-3 px-2">
          <label htmlFor="clients-name" className="bold500-large mb-3 pe-2">
            آیتم
          </label>
          <Select
            required
            id="itemUnit"
            name="itemUnit"
            value={selectedItem}
            onChange={(e) => handleItemUnit(e)}
            options={itemOptions}
            placeholder="واحد آیتم را انتخاب کنید"
            styles={customStyles}
            className="is-valid"
            isClearable
          />
        </div>
        <div className="mt-3 px-2">
          <label
            className="bold500-large mb-3 pe-2"
            htmlFor="date-from"
            id="datepicker-label"
          >
            نوع عملیات
          </label>
          <div className="d-flex  gap-3">
            <div className="d-flex align-items-center gap-2">
              <input
                value={2}
                onChange={handleStockStatus}
                className="form-check-input"
                type="radio"
                name="op"
                id="op1"
                defaultChecked
              />
              <label className="form-check-label bold-large" htmlFor="op1">
                مصرف
              </label>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input
                value={0}
                onChange={handleStockStatus}
                className="form-check-input"
                type="radio"
                name="op"
                id="op2"
              />
              <label className="form-check-label bold-large" htmlFor="op2">
                شارژ
              </label>
            </div>
          </div>
        </div>
        <div className="mt-3 px-2">
          <label htmlFor="purchasedAmount" className="bold500-large mb-3 pe-2">
            مقدار <span>{selectedItem?.unit}</span>
          </label>
          <input
            required
            type="number"
            name="purchasedAmount"
            className={`form-control rounded-pill border-0 py-2`}
            id="purchasedAmount"
            placeholder="مقدار مرجوعی را وارد کنید"
            onKeyUp={(event) => handleReturnAmount(event)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3 fixed-bottom bottom-0 footer-container">
        <button
          type="submit"
          className="btn-royal-bold rounded-pill flex-grow-1 py-3"
        >
          اعمال انبارگردانی
        </button>
      </div>
    </div>
  );
};

export default InventoryHandling;

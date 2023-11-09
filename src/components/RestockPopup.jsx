import React, { useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import Select from "react-select";

const RestockPopup = ({
  setIsEndTaskPopupActive,
  setRestockAmount,
  setRestockCost,
  setInventoryID,
  handleRestock,
}) => {
  const [isPurchasedAmountValid, setIsPurchasedAmountValid] = useState();
  const [isPurchaseCostValid, setIsPurchaseCostValid] = useState();
  const [isInventoryIDValid, setIsInventoryIDValid] = useState();

  const handleClosePopup = () => {
    setIsEndTaskPopupActive(false);
  };
  const handlePurchaseAmount = (event) => {
    if (event.target.value) {
      setIsPurchasedAmountValid(true);
      setRestockAmount(event.target.value);
    } else {
      setIsPurchasedAmountValid(false);
      setRestockAmount(event.target.value);
    }
  };
  const handlePurchaseCost = (event) => {
    if (event.target.value) {
      setIsPurchaseCostValid(true);
      setRestockCost(event.target.value);
    } else {
      setIsPurchaseCostValid(false);
      setRestockCost(event.target.value);
    }
  };
  const handleInventoryID = (event) => {
    if (event.target.value) {
      setIsInventoryIDValid(true);
      setInventoryID(event.target.value);
    } else {
      setIsInventoryIDValid(false);
      setInventoryID(event.target.value);
    }
  };

  console.log(isPurchasedAmountValid);

  return (
    <div className="end-task-popup bg-light rounded-5 p-4">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <p className="bold-xxlarge mb-0">شارژ انبار</p>
        <span onClick={handleClosePopup} className=" has-pointer">
          <CloseIcon />
        </span>
      </div>
      <div className="tborder-vlroyal mt-2 pt-3 px-3">
        <div>
          <div className="mt-3 px-2">
            <label
              htmlFor="purchasedAmount"
              className="bold500-large mb-3 pe-2"
            >
              مقدار خرید{" "}
              <span
                className={`text-danger ${
                  isPurchasedAmountValid
                    ? "d-none"
                    : isPurchasedAmountValid === undefined
                    ? "d-none"
                    : ""
                }`}
              >
                (ورود مقدار خرید الزامی است)
              </span>
            </label>
            <input
              required
              type="number"
              name="purchasedAmount"
              className={`form-control rounded-pill border-0 py-2 ${
                isPurchasedAmountValid
                  ? "is-valid"
                  : isPurchasedAmountValid === undefined
                  ? ""
                  : "is-invalid"
              }`}
              id="purchasedAmount"
              placeholder="مقدار خرید را وارد کنید"
              onKeyUp={(event) => handlePurchaseAmount(event)}
            />
          </div>
          <div className="mt-3 px-2">
            <label htmlFor="purchaseCost" className="bold500-large mb-3 pe-2">
              قیمت خرید{" "}
              <span
                className={`text-danger ${
                  isPurchaseCostValid
                    ? "d-none"
                    : isPurchaseCostValid === undefined
                    ? "d-none"
                    : ""
                }`}
              >
                (ورود قیمت خرید الزامی است)
              </span>
            </label>
            <input
              required
              type="number"
              name="purchaseCost"
              className={`form-control rounded-pill border-0 py-2 ${
                isPurchaseCostValid
                  ? "is-valid"
                  : isPurchaseCostValid === undefined
                  ? ""
                  : "is-invalid"
              }`}
              id="purchaseCost"
              placeholder="قیمت خرید را وارد کنید"
              onKeyUp={(event) => handlePurchaseCost(event)}
            />
          </div>
          <div className="mt-3 px-2">
            <label htmlFor="warningLimit" className="bold500-large mb-3 pe-2">
              کد انبار{" "}
              <span
                className={`text-danger ${
                  isPurchaseCostValid
                    ? "d-none"
                    : isPurchaseCostValid === undefined
                    ? "d-none"
                    : ""
                }`}
              >
                (ورود کد انبار الزامی است)
              </span>
            </label>
            <input
              required
              type="text"
              name="inventoryID"
              className={`form-control rounded-pill border-0 py-2 ${
                isInventoryIDValid
                  ? "is-valid"
                  : isInventoryIDValid === undefined
                  ? ""
                  : "is-invalid"
              }`}
              id="warningLimit"
              placeholder=" کد انبار را وارد کنید"
              onKeyUp={(event) => handleInventoryID(event)}
            />
          </div>
        </div>
        <div className="d-flex gap-2 mt-2">
          <button className="btn-royal-bold py-3" onClick={handleRestock}>
            اتمام
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestockPopup;

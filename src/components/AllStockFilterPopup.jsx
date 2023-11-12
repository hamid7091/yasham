import React, { useRef } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";

const AllStockFilterPopup = ({
  setIsFilterPopupActive,
  handleFilter,
  setStockStatus,
  stockStatus,
}) => {
  console.log(stockStatus);
  const sufficientRef = useRef(null);
  const inSufficientRef = useRef(null);
  const emptyRef = useRef(null);

  const handleStockStatus = (event) => {
    console.log(event.currentTarget.value);
    setStockStatus(event.currentTarget.value);
  };

  return (
    <div dir="rtl" className="end-task-popup bg-light rounded-5 px-4 py-4">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <p className="bold-xxlarge mb-0">فیلتر</p>
        <span
          className="has-pointer"
          onClick={() => setIsFilterPopupActive(false)}
        >
          <CloseIcon />
        </span>
      </div>
      <div className="tborder-vlroyal mt-2 px-3">
        <form
          onSubmit={handleFilter}
          className="edit-form form-group px-3 pt-3"
        >
          <div className="mt-3">
            <label
              className="my-3 bold-large"
              htmlFor="date-from"
              id="datepicker-label"
            >
              وضعیت محصول
            </label>
            <div className="d-flex flex-column gap-3">
              <div
                className="d-flex align-items-center gap-2"
                ref={sufficientRef}
              >
                <input
                  value={2}
                  onChange={handleStockStatus}
                  className="form-check-input"
                  type="radio"
                  name="op"
                  id="op1"
                  defaultChecked={stockStatus == "2" ? true : false}
                />
                <label className="form-check-label bold-large" htmlFor="op1">
                  موجود
                </label>
              </div>
              <div
                className="d-flex align-items-center gap-2"
                ref={inSufficientRef}
              >
                <input
                  value={0}
                  onChange={handleStockStatus}
                  className="form-check-input"
                  type="radio"
                  name="op"
                  id="op2"
                  defaultChecked={stockStatus == "0" ? true : false}
                />
                <label className="form-check-label bold-large" htmlFor="op2">
                  ناموجود
                </label>
              </div>
              <div className="d-flex align-items-center gap-2" ref={emptyRef}>
                <input
                  value={1}
                  onChange={handleStockStatus}
                  className="form-check-input"
                  type="radio"
                  name="op"
                  id="op3"
                  defaultChecked={stockStatus == "1" ? true : false}
                />
                <label className="form-check-label bold-large" htmlFor="op3">
                  رو به اتمام
                </label>
              </div>
            </div>
          </div>
          <button className="btn-royal-bold rounded-pill flex-grow-1 py-3 mt-5">
            اعمال فیلتر
          </button>
        </form>
      </div>
    </div>
  );
};

export default AllStockFilterPopup;

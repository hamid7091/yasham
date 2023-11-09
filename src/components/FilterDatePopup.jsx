import React, { useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import DatePicker from "react-multi-date-picker";
import SolarHijri from "react-date-object/calendars/persian";
import SolarHijriFa from "react-date-object/locales/persian_fa";

const FilterDatePopup = ({
  setIsFilterPopupActive,
  handleStartDateChange,
  handleEndDateChange,
  startDate,
  endDate,
  handleFilter,
  setPredefinedDate,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selected, setSelected] = useState();
  const handlePredefinedDate = (event) => {
    const pDateCode = event.currentTarget.innerHTML;
    setPredefinedDate(event.currentTarget.innerHTML);
    switch (pDateCode) {
      case "امروز":
        setSelected(pDateCode);
        break;
      case "دیروز":
        setSelected(pDateCode);
        break;
      case "هفته جاری":
        setSelected(pDateCode);
        break;
      case "هفته پیش":
        setSelected(pDateCode);
        break;
      case "ماه جاری":
        setSelected(pDateCode);
        break;
      case "ماه پیش":
        setSelected(pDateCode);
        break;
      case "سال جاری":
        setSelected(pDateCode);
        break;
      case "سال پیش":
        setSelected(pDateCode);
        break;
    }
  };
  const handleShowDateFields = () => {
    setIsChecked(!isChecked);
    handleStartDateChange(null);
    handleEndDateChange(null);
    setSelected(null);
  };
  const handleClosePopup = () => {
    setIsFilterPopupActive(false);
    handleStartDateChange(null);
    handleEndDateChange(null);
    setSelected(null);
  };
  return (
    <div dir="rtl" className="end-task-popup bg-light rounded-5 px-4 py-4">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <p className="bold-xxlarge mb-0">فیلتر</p>
        <span className="has-pointer" onClick={handleClosePopup}>
          <CloseIcon />
        </span>
      </div>
      <hr />
      <div className="mt-2 px-1">
        <form onSubmit={handleFilter} className="edit-form form-group">
          <section
            className={isChecked ? "d-none" : "d-flex flex-column gap-2"}
          >
            <div className="d-flex align-items-center gap-3">
              <span
                className={`px-4 py-2 flex-grow-1 has-pointer ${
                  selected === "امروز"
                    ? "badge-waiting-selected"
                    : "badge-waiting"
                }`}
                onClick={handlePredefinedDate}
              >
                امروز
              </span>
              <span
                className={`px-4 py-2 flex-grow-1 has-pointer ${
                  selected === "دیروز"
                    ? "badge-waiting-selected"
                    : "badge-waiting"
                }`}
                onClick={handlePredefinedDate}
              >
                دیروز
              </span>
            </div>
            <div className="d-flex align-items-center gap-3 ">
              <span
                className={`px-4 py-2 flex-grow-1 has-pointer ${
                  selected === "هفته جاری"
                    ? "badge-waiting-selected"
                    : "badge-waiting"
                }`}
                onClick={handlePredefinedDate}
              >
                هفته جاری
              </span>
              <span
                className={`px-4 py-2 flex-grow-1 has-pointer ${
                  selected === "هفته پیش"
                    ? "badge-waiting-selected"
                    : "badge-waiting"
                }`}
                onClick={handlePredefinedDate}
              >
                هفته پیش
              </span>
            </div>
            <div className="d-flex align-items-center gap-3 ">
              <span
                className={`px-4 py-2 flex-grow-1 has-pointer ${
                  selected === "ماه جاری"
                    ? "badge-waiting-selected"
                    : "badge-waiting"
                }`}
                onClick={handlePredefinedDate}
              >
                ماه جاری
              </span>
              <span
                className={`px-4 py-2 flex-grow-1 has-pointer ${
                  selected === "ماه پیش"
                    ? "badge-waiting-selected"
                    : "badge-waiting"
                }`}
                onClick={handlePredefinedDate}
              >
                ماه پیش
              </span>
            </div>
            <div className="d-flex align-items-center gap-3 ">
              <span
                className={`px-4 py-2 flex-grow-1 has-pointer ${
                  selected === "سال جاری"
                    ? "badge-waiting-selected"
                    : "badge-waiting"
                }`}
                onClick={handlePredefinedDate}
              >
                سال جاری
              </span>
              <span
                className={`px-4 py-2 flex-grow-1 has-pointer ${
                  selected === "سال پیش"
                    ? "badge-waiting-selected"
                    : "badge-waiting"
                }`}
                onClick={handlePredefinedDate}
              >
                سال پیش
              </span>
            </div>
          </section>
          <div className="d-flex align-items-center gap-1 me-3 my-3">
            <label
              htmlFor="level"
              className="ctn mb-2 bold500-large mt-2 has-pointer d-flex align-items-center"
            >
              <span className="pt-1">انتخاب بازه دلخواه</span>
              <input
                type="checkbox"
                name="level"
                id="level"
                onClick={handleShowDateFields}
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className={isChecked ? "mt-3" : "d-none"}>
            <label
              className="my-3 me-3 bold-large"
              htmlFor="date-from"
              id="datepicker-label"
            >
              از تاریخ :
            </label>
            <DatePicker
              id="date-from"
              containerClassName="custom-container"
              value={startDate}
              onChange={handleStartDateChange}
              calendar={SolarHijri}
              locale={SolarHijriFa}
              placeholder="انتخاب کنید"
            />
          </div>
          <div className={isChecked ? "mt-3" : "d-none"}>
            <label
              className="my-3 me-3 bold-large"
              htmlFor="date-till"
              id="datepicker-label"
            >
              تا تاریخ :
            </label>
            <DatePicker
              id="date-till"
              containerClassName="custom-container"
              value={endDate}
              onChange={handleEndDateChange}
              calendar={SolarHijri}
              locale={SolarHijriFa}
              minDate={startDate}
              placeholder="انتخاب کنید"
            />
          </div>
          <button
            className="btn-royal-bold rounded-pill flex-grow-1 py-3 mt-3"
            disabled={startDate && endDate ? false : true}
          >
            اعمال فیلتر
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterDatePopup;

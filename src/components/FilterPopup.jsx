import React from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import InputIcon from "react-multi-date-picker/components/input_icon";
import DatePicker from "react-multi-date-picker";
import SolarHijri from "react-date-object/calendars/persian";
import SolarHijriFa from "react-date-object/locales/persian_fa";
import Select from "react-select";

const FilterPopup = ({
  setIsFilterPopupActive,
  clientsList,
  handleStartDateChange,
  handleEndDateChange,
  startDate,
  endDate,
  handleFilter,
  clientName,
  setClientName,
  filterArea,
  isDirect,
  userRole,
}) => {
  const handleClosePopup = () => {
    setIsFilterPopupActive(false);
    handleStartDateChange(null);
    handleEndDateChange(null);
    setClientName(null);
  };
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "var(--gray-dark)" : "var(--gray)",
      backgroundColor: state.isSelected ? "var(--gray-ultra-light)" : "#fff)",
      padding: "8px",
      fontWeight: "bold",
      ":not(:last-child)": {
        borderBottom: "2px solid var(--gray-ultra-light)",
      },
      ":hover": {
        backgroundColor: "var(--gray-very-light)",
        color: "#000",
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
      color: "var(--gray-dark)",
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
      borderRadius: "4px",
    }),
    input: (defaultStyles) => ({
      ...defaultStyles,
      color: "var(--gray-dark)",
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

  const clientOptions = [];
  clientsList?.forEach((client) => {
    clientOptions.push({
      value: client.clientID,
      label: client.clientName,
    });
  });
  return (
    <div dir="rtl" className="end-task-popup bg-light rounded-5 px-4 py-4">
      <div className="d-flex justify-content-between align-items-center">
        <p className="bold-xxlarge mb-0">فیلتر</p>
        <span className="has-pointer" onClick={handleClosePopup}>
          <CloseIcon />
        </span>
      </div>
      <hr />
      <div className="px-3">
        <form onSubmit={handleFilter} className="edit-form form-group px-3">
          <div className="mt-3">
            <label
              className="mb-3 me-3 bold-large"
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
              // range
              // required={true}
            />
          </div>
          <div className="mt-3">
            <label
              className="mb-3 me-3 bold-large"
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
              // required={true}
            />

            <>
              {filterArea === "performance" && (
                <label
                  htmlFor="clients-name"
                  className="bold500-large my-3 pe-3"
                >
                  نام کارفرما
                </label>
              )}
              {userRole[0] === "client" && (
                <label
                  htmlFor="clients-name"
                  className="bold500-large my-3 pe-3"
                >
                  وضعیت پرداخت
                </label>
              )}
              {filterArea === "allTasks" && (
                <label
                  htmlFor="clients-name"
                  className="bold500-large my-3 pe-3"
                >
                  واگذاری شده به
                </label>
              )}

              <Select
                id="clients-name"
                name="cliens-name"
                value={clientName}
                onChange={setClientName}
                options={clientOptions}
                placeholder="انتخاب کنید"
                styles={customStyles}
                isClearable
                // isMulti
                // hideSelectedOptions={false}
              />
            </>
          </div>
          <button
            className="btn-royal-bold rounded-pill flex-grow-1 py-3 mt-3"
            disabled={startDate & endDate || clientName ? false : true}
          >
            اعمال فیلتر
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterPopup;

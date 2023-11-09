import React, { useState } from "react";
import CloseIcon from "../assets/svg-icons/CloseIcon";
import Select from "react-select";
import MinusButton from "../assets/svg-icons/MinusButton";
import MinusButtonGray from "../assets/svg-icons/MinusButtonGray";
import PlusButton from "../assets/svg-icons/PlusButton";

const AddDetailPopup = ({
  setIsAddDetailPopupActive,
  fixedRadio,
  mobileRadio,
  mobileOptions,
  fixedOptions,
  customStyles,
  details,
  handleUpdate,
}) => {
  // States ------------------------------------------------------

  const [isFixedActive, setIsFixedActive] = useState(
    details.serviceType === 1 ? true : false
  );
  const [isMobileActive, setIsMobileActive] = useState(
    details.serviceType === 2 ? true : false
  );
  const [fixedOption, setFixedOption] = useState(
    details.taskType.value === 1 ? details.taskType : ""
  );
  const [mobileOption, setMobileOption] = useState(
    details.taskType.value === 1 ? "" : details.taskType
  );
  const [toothColors, setToothColors] = useState(details.toothColors);
  const [toothNumbers, setToothNumbers] = useState(details.toothNumbers);
  const [serviceType, setServiceType] = useState(details.serviceType);
  // const [id, setId] = useState(details.id);

  // States ------------------------------------------------------

  // Functions ---------------------------------------------------

  const handleServiceChange = (event) => {
    if (event.currentTarget == fixedRadio.current) {
      setIsFixedActive(true);
      setIsMobileActive(false);
      setServiceType(1);
      setMobileOption(undefined);
    } else if (event.currentTarget == mobileRadio.current) {
      setIsMobileActive(true);
      setIsFixedActive(false);
      setServiceType(2);
      setFixedOption(undefined);
    }
  };
  const handleAddFields = () => {
    const colorVals = [...toothColors, []];
    setToothColors(colorVals);
    const numVlas = [...toothNumbers, []];
    setToothNumbers(numVlas);
  };
  const handleColorChange = (value, i) => {
    console.log(value?.value);
    const inputData = [...toothColors];
    inputData[i] = [value];
    setToothColors(inputData);
  };
  const handleNumberChange = (value, i) => {
    const inputData = [...toothNumbers];
    inputData[i] = value;
    setToothNumbers(inputData);
  };
  const handleDelete = (i) => {
    const deleteColorVal = [...toothColors];
    const deleteNumberVal = [...toothNumbers];
    deleteNumberVal.splice(i, 1);
    deleteColorVal.splice(i, 1);
    setToothColors(deleteColorVal);
    setToothNumbers(deleteNumberVal);
  };
  const numberConvertor = (array) => {
    return array
      .map((subArray) => subArray.map((obj) => obj.value))
      .filter((subArray) => subArray.length > 0);
  };
  const colorConvertor = (array) => {
    return array.map((subArray) => subArray[0]?.value).filter(Boolean);
  };
  const handleSubmit = () => {
    const newId = details.id ? details.id : Math.floor(Math.random() * 1000);
    const detail = {
      id: newId,
      serviceType,
      taskType: serviceType === 1 ? fixedOption : mobileOption,
      toothColors,
      toothNumbers,
    };

    handleUpdate(detail);
    setIsAddDetailPopupActive(false);

    setServiceType(null);
    setFixedOption(null);
    setMobileOption(null);
    setToothColors(null);
    setToothNumbers(null);
  };

  // Functions ---------------------------------------------------

  // Constants ---------------------------------------------------

  const toothColor = [
    { value: "A1", label: "A1" },
    { value: "A2", label: "A2" },
    { value: "A3", label: "A3" },
    { value: "A4", label: "A4" },
    { value: "B1", label: "B1" },
    { value: "B2", label: "B2" },
    { value: "B3", label: "B3" },
    { value: "B4", label: "B4" },
    { value: "C1", label: "C1" },
    { value: "C2", label: "C2" },
    { value: "C3", label: "C3" },
    { value: "C4", label: "C4" },
    { value: "D2", label: "D2" },
    { value: "D3", label: "D3" },
    { value: "D4", label: "D4" },
    { value: "BL1", label: "BL1" },
    { value: "BL2", label: "BL2" },
    { value: "BL3", label: "BL3" },
    { value: "Bl4", label: "Bl4" },
  ];
  const toothNumber = [
    { value: "TR1", label: " \u23cc 1" },
    { value: "TR2", label: " \u23cc 2" },
    { value: "TR3", label: " \u23cc 3" },
    { value: "TR4", label: " \u23cc 4" },
    { value: "TR5", label: " \u23cc 5" },
    { value: "TR6", label: " \u23cc 6" },
    { value: "TR7", label: " \u23cc 7" },
    { value: "TR8", label: " \u23cc 8" },
    { value: "TL1", label: "1 \u23BF" },
    { value: "TL2", label: "2 \u23BF" },
    { value: "TL3", label: "3 \u23BF" },
    { value: "TL4", label: "4 \u23BF" },
    { value: "TL5", label: "5 \u23BF" },
    { value: "TL6", label: "6 \u23BF" },
    { value: "TL7", label: "7 \u23BF" },
    { value: "TL8", label: "8 \u23BF" },
    { value: "BR1", label: "\u23CB 1" },
    { value: "BR2", label: "\u23CB 2" },
    { value: "BR3", label: "\u23CB 3" },
    { value: "BR4", label: "\u23CB 4" },
    { value: "BR5", label: "\u23CB 5" },
    { value: "BR6", label: "\u23CB 6" },
    { value: "BR7", label: "\u23CB 7" },
    { value: "BR8", label: "\u23CB 8" },
    { value: "BL1", label: "1 \u23BE" },
    { value: "BL2", label: "2 \u23BE" },
    { value: "BL3", label: "3 \u23BE" },
    { value: "BL4", label: "4 \u23BE" },
    { value: "BL5", label: "5 \u23BE" },
    { value: "BL6", label: "6 \u23BE" },
    { value: "BL7", label: "7 \u23BE" },
    { value: "BL8", label: "8 \u23BE" },
  ];

  // Constants ---------------------------------------------------

  return (
    <div dir="rtl" className="end-task-popup bg-light rounded-5 p-4">
      {/* headeer */}
      <div className="d-flex justify-content-between align-items-center pb-3">
        <p className="bold-xxlarge mb-0">جزئیات سفارش</p>
        <span
          className="has-pointer"
          onClick={() => setIsAddDetailPopupActive(false)}
        >
          <CloseIcon />
        </span>
      </div>
      {/* choosing service type */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="service-type" className="bold500-large my-3 pe-3">
            نوع خدمات
          </label>
          <>
            <div className="d-flex gap-4 pe-3 mb-3">
              <div
                className="d-flex align-items-center has-pointer"
                onClick={handleServiceChange}
                ref={fixedRadio}
              >
                <input
                  required
                  type="radio"
                  className="form-check-input ms-2 has-pointer"
                  name="service-type"
                  id="flexRadioDefault1"
                  checked={isFixedActive}
                />
                <label
                  className="form-check-lable has-pointer"
                  htmlFor="flexRadioDefault1"
                >
                  ثابت
                </label>
              </div>
              <div
                className="d-flex align-items-center has-pointer"
                onClick={handleServiceChange}
                ref={mobileRadio}
              >
                <input
                  required
                  type="radio"
                  className="form-check-input ms-2 has-pointer"
                  name="service-type"
                  id="flexRadioDefault2"
                  onChange={handleServiceChange}
                  checked={isMobileActive}
                />
                <label
                  className="form-check-lable has-pointer"
                  htmlFor="flexRadioDefault2"
                >
                  متحرک
                </label>
              </div>
            </div>
            <div className={isFixedActive ? "" : "d-none"}>
              <label
                htmlFor="fixed-services"
                className="bold500-large my-3 pe-3"
              >
                نوع کار
              </label>
              <Select
                required={serviceType == "1"}
                id="fixed-option"
                name="fixed-option"
                value={fixedOption}
                onChange={setFixedOption}
                options={fixedOptions}
                placeholder="ثابت: سرویس مورد نظر را انتخاب کنید "
                styles={customStyles}
                isClearable
              />
            </div>
            <div className={isMobileActive ? "" : "d-none"}>
              <label
                htmlFor="mobile-services"
                className="bold500-large my-3 pe-3"
              >
                نوع کار
              </label>
              <Select
                required={serviceType == "2"}
                id="mobile-option"
                name="mobile-option"
                value={mobileOption}
                onChange={setMobileOption}
                options={mobileOptions}
                placeholder="متحرک: سرویس مورد نظر را انتخاب کنید"
                styles={customStyles}
                isClearable
              />
            </div>
          </>
        </div>
        {/* repeatable input */}
        <div className="repeatable-input-wrapper mt-2">
          {toothColors.map((color, index) => (
            <div
              key={index}
              className="repeatable-input position-relative d-flex align-items-center mt-4 "
            >
              <div className="flex-grow-1">
                <div className="  ">
                  <label htmlFor="tooth-color" className="bold500-large px-3">
                    رنگ
                  </label>
                  <Select
                    required
                    className=""
                    id="color-option"
                    name="color-option"
                    value={color}
                    onChange={(e) => handleColorChange(e, index)}
                    options={toothColor}
                    placeholder="انتخاب سرویس "
                    styles={customStyles}
                    isClearable
                  />
                </div>
                <div className="">
                  <label htmlFor="tooth-number" className="bold500-large px-3">
                    شماره
                  </label>
                  {toothNumbers.map((number, i) => (
                    <div key={i}>
                      {index === i && (
                        <Select
                          required
                          className=""
                          id="number-option"
                          name="number-option"
                          value={number}
                          onChange={(e) => handleNumberChange(e, i)}
                          options={toothNumber}
                          placeholder="انتخاب سرویس "
                          styles={customStyles}
                          isClearable
                          isMulti={true}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <span
                className={`delete-field-btn mt-4  has-pointer me-2 border-0 rounded-circle text-white bg-default fw-bold ${
                  toothColors.length > 1 ? "" : "disabled"
                }`}
                onClick={() => handleDelete(index)}
              >
                {toothColors.length > 1 ? <MinusButton /> : <MinusButtonGray />}
              </span>
            </div>
          ))}
        </div>
        <div
          className="bg-white rounded-pill py-2 px-2 d-inline-block border-royal-2 mt-4 has-pointer"
          onClick={handleAddFields}
        >
          <PlusButton />
          <span className="bold-large">افزودن جزئیات جدید</span>
        </div>
        <div className="d-flex justify-content-center align-items-center px-1 py-2 mt-3">
          <button
            className="btn-royal-bold rounded-pill py-3 text-center has-pointer"
            type="submit"
            // onClick={handleSubmit}
          >
            ثبت جزئیات سفارش
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDetailPopup;

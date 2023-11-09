import React, { useState } from "react";
import Select from "react-select";
import MinusButton from "../assets/svg-icons/MinusButton";
import MinusButtonGray from "../assets/svg-icons/MinusButtonGray";
import PlusButton from "../assets/svg-icons/PlusButton";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import colors from "react-multi-date-picker/plugins/colors";

const EndTask = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const param = useParams();
  const endTaskHeader = new Headers();
  endTaskHeader.append("Authorization", `Bearer ${accessToken}`);
  const endTaskFormdata = new FormData();
  endTaskFormdata.append("taskID", param.id);

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
  // States ------------------------------------------------------

  //   const [details, setDetails] = useState();
  const [toothColors, setToothColors] = useState([[]]);
  const [toothNumbers, setToothNumbers] = useState([[]]);
  const [selectedUnit, setSelectedUnit] = useState([[]]);

  // States ------------------------------------------------------

  // Functions ---------------------------------------------------

  //   const handleUpdate = (detail) => {
  //     // const id = Math.floor(Math.random() * 1000);
  //     const newDetail = { ...detail };

  //     setDetails([newDetail]);
  //   };
  const handleAddFields = () => {
    const colorVals = [...toothColors, []];
    setToothColors(colorVals);
    const numVlas = [...toothNumbers, []];
    setToothNumbers(numVlas);
    const uniVals = [...selectedUnit, []];
    setSelectedUnit(uniVals);
  };
  const handleColorChange = (value, i) => {
    console.log(value?.value);
    const inputData = [...toothColors];
    inputData[i] = [value];
    setToothColors(inputData);

    const uniVals = [...selectedUnit];
    uniVals[i] = [mockItemsList.items.find((el) => el.itemID === value?.value)];
    const un = mockItemsList.items.find((el) => el.itemID === value?.value);
    console.log(un?.itemUnit);
    setSelectedUnit(uniVals);
  };
  const handleNumberChange = (event, i) => {
    console.log(event.target.value);
    console.log(i);
    const inputData = [...toothNumbers];
    inputData[i] = event.target.value;
    setToothNumbers(inputData);
  };
  const handleDelete = (i) => {
    const deleteColorVal = [...toothColors];
    const deleteNumberVal = [...toothNumbers];
    const deleteUniVals = [...selectedUnit];
    deleteNumberVal.splice(i, 1);
    deleteColorVal.splice(i, 1);
    deleteUniVals.splice(i, 1);
    setToothColors(deleteColorVal);
    setToothNumbers(deleteNumberVal);
    setSelectedUnit(deleteUniVals);
  };
  //   const numberConvertor = (array) => {
  //     return array
  //       .map((subArray) => subArray.map((obj) => obj.value))
  //       .filter((subArray) => subArray.length > 0);
  //   };
  //   const colorConvertor = (array) => {
  //     return array.map((subArray) => subArray[0]?.value).filter(Boolean);
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const detail = {
    //   toothColors,
    //   toothNumbers,
    // };
    // console.log(detail);

    // handleUpdate(detail);

    console.log(toothColors);
    console.log(toothNumbers);
  };

  // Functions ---------------------------------------------------

  // Constants ---------------------------------------------------

  const mockItemsList = {
    items: [
      {
        itemName: "گچ 1",
        itemID: "#p123456",
        itemUnit: "کیلوگرم",
      },
      {
        itemName: "گچ 2",
        itemID: "#p123457",
        itemUnit: "لیتر",
      },
      {
        itemName: "گچ 3",
        itemID: "#p123458",
        itemUnit: "عدد",
      },
    ],
  };

  const itemListConvertor = (list) => {
    const itemList = [];
    list.forEach((item, index) => {
      itemList.push({
        label: `${item.itemID} || ${item.itemName}`,
        value: item.itemID,
      });
    });
    return itemList;
  };
  const itemListUnitConvertor = (list) => {
    const units = [];
    list.forEach((item) => {
      units.push(item.itemUnit);
    });
    return units;
  };

  console.log(itemListConvertor(mockItemsList.items));
  console.log(itemListUnitConvertor(mockItemsList.items));

  // Constants ---------------------------------------------------

  console.log(toothColors);
  console.log(toothNumbers);
  console.log(selectedUnit);
  //   console.log(details);

  return (
    <div dir="rtl" className="container px-3">
      {/* headeer */}
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3">
        <div className="bold-xlarge">اتمام وظیفه</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      {/* choosing service type */}
      <form onSubmit={handleSubmit}>
        {/* repeatable input */}
        <div className="repeatable-input-wrapper mt-2">
          {toothColors?.map((color, index) => (
            <div
              key={index}
              className="repeatable-input position-relative d-flex align-items-center mt-4 "
            >
              <div className="flex-grow-1">
                <div className="  ">
                  <label
                    htmlFor="tooth-color"
                    className="bold500-large px-3 py-2"
                  >
                    کد انبار
                  </label>
                  <Select
                    required
                    className=""
                    id="color-option"
                    name="color-option"
                    value={color}
                    onChange={(e) => handleColorChange(e, index)}
                    options={itemListConvertor(mockItemsList.items)}
                    placeholder="انتخاب سرویس "
                    styles={customStyles}
                    isClearable
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="tooth-number"
                    className="bold500-large px-3 py-2"
                  >
                    مقدار مصرف{" "}
                    <span className="">
                      {selectedUnit[index].length > 0 &&
                      selectedUnit[index][0] !== undefined
                        ? `(${selectedUnit[index][0]?.itemUnit})`
                        : ""}
                    </span>
                  </label>
                  {toothNumbers?.map((number, i) => (
                    <div key={i}>
                      {index === i && (
                        <input
                          required
                          type="text"
                          name="last-name"
                          className={`form-control rounded-pill mb-3 py-2`}
                          id="last-name"
                          placeholder="نام خانوادگی را وارد کنید"
                          onChange={(event) => handleNumberChange(event, i)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <span
                className={`delete-field-btn mt-4 has-pointer me-2 border-0 rounded-circle text-white bg-default fw-bold ${
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
          <span className="bold-large me-3">افزودن جدید</span>
        </div>
        <div className="d-flex justify-content-center align-items-center px-1 py-2 mt-3">
          <button
            className="btn-royal-bold rounded-pill py-3 text-center has-pointer"
            type="submit"
          >
            ثبت جزئیات سفارش
          </button>
        </div>
      </form>
    </div>
  );
};

export default EndTask;

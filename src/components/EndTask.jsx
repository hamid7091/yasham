import React, { useEffect, useState } from "react";
import Select from "react-select";
import MinusButton from "../assets/svg-icons/MinusButton";
import MinusButtonGray from "../assets/svg-icons/MinusButtonGray";
import PlusButton from "../assets/svg-icons/PlusButton";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";

const EndTask = () => {
  const location = useLocation();
  const param = useParams();
  const navigate = useNavigate();

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
        border: "1px solid var( --blue-royal)",
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
      marginRight: "8px",
      marginLeft: "8px",
      marginBlock: "4px",
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
      paddingInline: "10px",
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
    menu: (defaultStyles) => ({
      ...defaultStyles,
      width: "90%",
      marginRight: "5%",
      border: "none",
    }),
    indicatorSeparator: (defaultStyles) => ({
      ...defaultStyles,
      display: "none",
    }),
  };
  // States ------------------------------------------------------
  const [isError, setIsError] = useState(false);
  const [errorItself, setErrorItself] = useState();

  const [toothColors, setToothColors] = useState([[]]);

  const [toothNumbers, setToothNumbers] = useState([[]]);
  const [selectedStocks, setSelectedStocks] = useState([]);

  const [selectedUnit, setSelectedUnit] = useState([[]]);

  const [inventoryList, setInventoryList] = useState([]);

  // States ------------------------------------------------------

  // Functions ---------------------------------------------------

  const handleAddFields = () => {
    const colorVals = [...toothColors, []];
    setToothColors(colorVals);
    const numVlas = [...toothNumbers, []];
    setToothNumbers(numVlas);
    const uniVals = [...selectedUnit, []];
    setSelectedUnit(uniVals);

    const newSelectedStock = [...selectedStocks, []];
    setSelectedStocks(newSelectedStock);
  };
  const handleColorChange = (value, i) => {
    const inputData = [...toothColors];
    const oldSelectedStocks = [...selectedStocks];
    inputData[i] = value;
    oldSelectedStocks[i] = value.value;

    setToothColors(inputData);
    setSelectedStocks(oldSelectedStocks);

    console.log(selectedUnit);
    const uniVals = [...selectedUnit];
    uniVals[i] = [inventoryList.find((el) => el.id == value?.value)];
    const un = inventoryList.find((el) => el.id == value?.value);
    console.log(un?.unit);
    setSelectedUnit(uniVals);
  };

  const handleNumberChange = (event, i) => {
    const inputData = [...toothNumbers];
    inputData[i] = event.target.value;
    setToothNumbers(inputData);
  };

  const handleDelete = (i) => {
    console.log(toothColors);
    console.log(toothNumbers);
    console.log(selectedUnit);
    console.log(selectedStocks);
    console.log(i);

    const deleteColorVal = [...toothColors];
    const deleteNumberVal = [...toothNumbers];
    const deleteUniVals = [...selectedUnit];
    const deleteSelected = [...selectedStocks];

    deleteColorVal.splice(i, 1);
    deleteNumberVal.splice(i, 1);
    deleteUniVals.splice(i, 1);
    deleteSelected.splice(i, 1);

    console.log(deleteColorVal);
    console.log(deleteNumberVal);
    console.log(deleteUniVals);
    console.log(deleteSelected);

    setToothColors(deleteColorVal);
    setToothNumbers(deleteNumberVal);
    setSelectedUnit(deleteUniVals);
    setSelectedStocks(deleteSelected);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sentObject = [];
    selectedStocks.forEach((stock, index) => {
      sentObject.push({
        id: stock,
        value: toothNumbers[index],
      });
    });
    const formdata = new FormData();
    formdata.append("taskID", param.id);
    formdata.append("usedStocks", JSON.stringify(sentObject));
    console.log(Object.fromEntries(formdata));
    try {
      Loading.standard("در حال ارسال درخواست");
      const response = await axiosInstance.post("/task/update_task", formdata);
      console.log(response.data.response);
      Loading.remove();
      if (response.data.response.finished) {
        Notify.success("وظیفه با موفقیت به اتمام رسید");
        navigate(location.state);
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
      Notify.failure("خطا ! مجددا تلاش کنید");
    }
  };

  const getInventoryItems = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/item/instock");
      setInventoryList(response.data.response.stock);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  // Functions ---------------------------------------------------

  // Constants ---------------------------------------------------

  const itemListConvertor = (list) => {
    const itemList = [];
    list.forEach((item, index) => {
      itemList.push({
        label: `${item.name} || ${item.inv_code}`,
        value: item.id,
      });
    });
    return itemList;
  };
  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getInventoryItems();
    }
  }, []);

  // Constants ---------------------------------------------------

  return (
    inventoryList && (
      <div dir="rtl" className="container px-3 mt-100">
        {/* headeer */}
        <SingleHeader title={"اتمام وظیفه"} location={location.state} />

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
                      // required
                      className=""
                      id="color-option"
                      name="color-option"
                      value={color}
                      onChange={(e) => handleColorChange(e, index)}
                      options={itemListConvertor(inventoryList)}
                      placeholder="کد انبار را انتخاب کنید"
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
                          ? `(${selectedUnit[index][0]?.unit})`
                          : ""}
                      </span>
                    </label>
                    {toothNumbers?.map((number, i) => (
                      <div key={i}>
                        {index === i && (
                          <input
                            //required
                            type="text"
                            name="last-name"
                            autoComplete="off"
                            className={`form-control rounded-pill mb-3 py-2`}
                            id="last-name"
                            placeholder="مقدار مصرف را وارد کنید"
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
                  {toothColors.length > 1 ? (
                    <MinusButton />
                  ) : (
                    <MinusButtonGray />
                  )}
                </span>
              </div>
            ))}
          </div>
          <div
            className="bg-white rounded-pill py-2 pe-2 ps-5 d-inline-block border-royal-2 mt-4 has-pointer"
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
              اتمام وظیفه
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default EndTask;

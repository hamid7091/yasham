import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditPen from "../assets/svg-icons/EditPen";
import Select from "react-select";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import img from "../assets/svg-pics/asd.jpg";
import useRoleSetter from "../micro-components/useRoleSetter";
import SingleHeader from "../components/SingleHeader";
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

const AddNewStockItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // ---------------states------------------

  const [itemPicture, setItemPicture] = useState();
  const [itemName, setItemName] = useState();
  const [inventoryCode, setInventoryCode] = useState();
  const [itemUnit, setItemUnit] = useState();
  const [purchasedAmount, setPurchasedAmount] = useState();
  const [purchaseCost, setPurchaseCost] = useState();
  const [warningLimit, setWarningLimit] = useState();
  // ---------------check validation states------------------
  const [isItemNameValid, setIsItemNameValid] = useState(null);
  const [isItemIDValid, setIsItemIDValid] = useState(null);
  const [isPurchasedAmountValid, setIsPurchasedAmountValid] = useState(null);
  const [isPurchaseCostValid, setIsPurchaseCostValid] = useState(null);
  const [isWarningLimitValid, setIsWarningLimitValid] = useState(null);
  const [isAvatarSet, setIsAvatarSet] = useState(false);

  const [userRole, setUserRole] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [
    isEmployee,
    isClient,
    isSupervisor,
    isShipping,
    isInventory,
    isPManager,
    isFManager,
    isReception,
  ] = useRoleSetter(userRole);

  useEffect(() => {
    console.log("ue1");

    if (!isLoading) {
      !isInventory && navigate("/unauthorized");
    }
  }, [isInventory]);

  const avatarInput = useRef(null);
  const avatar = useRef(null);
  // ---------------functions------------------
  const handleAvatarChange = () => {
    const choosenFile = avatarInput.current.files[0];
    if (choosenFile) {
      setItemPicture(choosenFile);
      setIsAvatarSet(true);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        avatar.current.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(choosenFile);
    }
  };
  const handleItemNameValidation = (e) => {
    if (e.target.value) {
      setIsItemNameValid(true);
      setItemName(e.target.value);
    } else {
      setIsItemNameValid(false);
      setItemName(e.target.value);
    }
  };
  const handleItemIDValidation = (e) => {
    if (e.target.value) {
      setIsItemIDValid(true);
      setInventoryCode(e.target.value);
    } else {
      setIsItemIDValid(false);
      setInventoryCode(e.target.value);
    }
  };
  const handlePurchaseAmount = (e) => {
    if (e.target.value) {
      setIsPurchasedAmountValid(true);
      setPurchasedAmount(e.target.value);
    } else {
      setIsPurchasedAmountValid(false);
      setPurchasedAmount(e.target.value);
    }
  };
  const handlePurchaseCost = (e) => {
    if (e.target.value) {
      setIsPurchaseCostValid(true);
      setPurchaseCost(e.target.value);
    } else {
      setIsPurchaseCostValid(false);
      setPurchaseCost(e.target.value);
    }
  };
  const handleWarningLimitValidation = (e) => {
    if (e.target.value) {
      setIsWarningLimitValid(true);
      setWarningLimit(e.target.value);
    } else {
      setIsWarningLimitValid(false);
      setWarningLimit(e.target.value);
    }
  };
  const handleSubmitNewItem = async (event) => {
    event.preventDefault();
    try {
      Loading.standard("در حال ثبت محصول جدید");

      const formdata = new FormData();
      formdata.append("itemName", itemName);
      formdata.append("inventoryCode", inventoryCode);
      formdata.append("itemUnit", itemUnit?.value);
      formdata.append("purchasedAmount", purchasedAmount);
      formdata.append("purchaseCost", purchaseCost);
      formdata.append("warningLimit", warningLimit);
      if (itemPicture) {
        formdata.append("itemPicture", itemPicture);
      }
      console.log({
        itemName,
        inventoryCode,
        itemUnit,
        purchasedAmount,
        purchaseCost,
        warningLimit,
      });
      console.log(Object.fromEntries(formdata));
      const response = await axiosInstance.post("/item/insert", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.response);
      if (response.data.response.message) {
        Loading.remove();
        Notify.success(response.data.response.message);
        navigate("/");
      } else {
        Loading.remove();
        Notify.failure("خطا! مجددا تلاش کنید");
      }
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  const [unitOptions, setUnitOptions] = useState();
  const getUnits = async () => {
    try {
      Loading.standard("در حال بارگذاری");
      const response = await axiosInstance.post("/item/units");
      console.log(response.data.response);
      setUnitOptions(response.data.response.units);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getUnits();
      getUser();
    }
  }, []);

  console.log(isInventory);
  return (
    <div className="container px-3 mt-100" dir="rtl">
      <SingleHeader title={"ثبت آیتم جدید"} location={location.state} />
      <div className="text-center d-flex flex-column justify-content-center align-items-center">
        <div>
          <img className="avatar-svg-image" ref={avatar} src={img} alt="" />
        </div>
        <div>
          <input
            type="file"
            ref={avatarInput}
            onChange={handleAvatarChange}
            name="profile-avatar"
            accept="image/*"
            id="profile-avatar-uploader"
          />
          <label
            htmlFor="profile-avatar-uploader"
            className="btn-greyd-thin mt-2 has-pointer d-flex gap-2 justify-content-center "
          >
            <EditPen />
            <span>انتخاب عکس</span>
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmitNewItem}>
        <div className="mt-3 px-2">
          <label htmlFor="itemName" className="bold500-large mb-3 pe-2">
            نام آیتم{" "}
            <span
              className={`text-danger ${
                isItemNameValid
                  ? "d-none"
                  : isItemNameValid === null
                  ? "d-none"
                  : ""
              }`}
            >
              (ورود نام آیتم الزامی است)
            </span>
          </label>
          <input
            required
            type="text"
            name="itemName"
            autoComplete="off"
            className={`form-control rounded-pill border-0 py-2 ${
              isItemNameValid
                ? "is-valid"
                : isItemNameValid === null
                ? ""
                : "is-invalid"
            }`}
            id="itemName"
            placeholder="نام آیتم را وارد کنید"
            onKeyUp={(event) => handleItemNameValidation(event)}
          />
        </div>
        <div className="mt-3 px-2">
          <label htmlFor="itemID" className="bold500-large mb-3 pe-2">
            کد انبار{" "}
            <span
              className={`text-danger ${
                isItemIDValid
                  ? "d-none"
                  : isItemIDValid === null
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
            name="itemID"
            autoComplete="off"
            className={`form-control rounded-pill border-0 py-2 ${
              isItemIDValid
                ? "is-valid"
                : isItemIDValid === null
                ? ""
                : "is-invalid"
            }`}
            id="itemID"
            placeholder="کد انبار را وارد کنید"
            onKeyUp={(event) => handleItemIDValidation(event)}
          />
        </div>
        <div className="mt-3 px-2">
          <label htmlFor="clients-name" className="bold500-large mb-3 pe-2">
            واحد آیتم
          </label>
          <Select
            required
            id="itemUnit"
            name="itemUnit"
            value={itemUnit}
            onChange={setItemUnit}
            options={unitOptions}
            placeholder="واحد آیتم را انتخاب کنید"
            styles={customStyles}
            className="is-valid"
            isClearable
          />
        </div>
        <div className="mt-3 px-2">
          <label htmlFor="purchasedAmount" className="bold500-large mb-3 pe-2">
            مقدار خرید{" "}
            <span
              className={`text-danger ${
                isPurchasedAmountValid
                  ? "d-none"
                  : isPurchasedAmountValid === null
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
            autoComplete="off"
            name="purchasedAmount"
            className={`form-control rounded-pill border-0 py-2 ${
              isPurchasedAmountValid
                ? "is-valid"
                : isPurchasedAmountValid === null
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
                  : isPurchaseCostValid === null
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
            autoComplete="off"
            className={`form-control rounded-pill border-0 py-2 ${
              isPurchaseCostValid
                ? "is-valid"
                : isPurchaseCostValid === null
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
            آستانه هشدار{" "}
            <span
              className={`text-danger ${
                isWarningLimitValid
                  ? "d-none"
                  : isWarningLimitValid === null
                  ? "d-none"
                  : ""
              }`}
            >
              (ورود آستانه هشدار الزامی است)
            </span>
          </label>
          <input
            required
            type="number"
            name="warningLimit"
            autoComplete="off"
            className={`form-control rounded-pill border-0 py-2 ${
              isWarningLimitValid
                ? "is-valid"
                : isWarningLimitValid === null
                ? ""
                : "is-invalid"
            }`}
            id="warningLimit"
            placeholder="آستانه هشدار را وارد کنید"
            onKeyUp={(event) => handleWarningLimitValidation(event)}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3">
          <button
            type="submit"
            className="btn-royal-bold rounded-pill flex-grow-1 py-3"
          >
            ثبت آیتم
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewStockItem;

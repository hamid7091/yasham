import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import StockEditBtn54 from "../assets/svg-icons/StockEditBtn54";
import ThunderIcon54 from "../assets/svg-icons/ThunderIcon54";
import StockMangementIcon54 from "../assets/svg-icons/StockMangementIcon54";
import ReturnStockIcon54 from "../assets/svg-icons/ReturnStockIcon54";
import SingleStockSufficientIcon from "../assets/svg-icons/SingleStockSufficientIcon";
import SingleStockInsufficientIcon from "../assets/svg-icons/SingleStockInsufficientIcon";
import SingleStockEmptyIcon from "../assets/svg-icons/SingleStockEmptyIcon";
import PurchaseHistory from "./PurchaseHistory";
import UsageHistory from "./UsageHistory";
import RestockPopup from "./RestockPopup";
import PopupBackground from "./PopupBackground";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";

const SingleStock = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [isRestockPopupOpen, setIsRestockPopupOpen] = useState(false);
  const [singleStockData, setSingleStockData] = useState();
  const [tabState, setTabState] = useState("purchase");

  // popup states ----------------------------------------
  const [restockAmount, setRestockAmount] = useState();
  const [restockCost, setRestockCost] = useState();
  const [inventoryID, setInventoryID] = useState();

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

  const getItemData = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post(
        "/item/single",
        {
          itemID: param.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.response);
      setSingleStockData(response.data.response);
      Loading.remove();
    } catch (err) {
      console.error(err);
      Loading.remove();
    }
  };
  const handleRestock = async () => {};

  const handleTabChange = (e) => {
    const clicked = e.currentTarget;
    const clickedA = e.currentTarget.nextElementSibling;
    const clickedB = e.currentTarget.previousElementSibling;
    console.log(clicked);
    console.log(clickedA);
    console.log(clickedB);
    clicked.classList.add("active-tab");
    if (clickedA === null) {
      clickedB.classList.remove("active-tab");
      //   clickedB.previousElementSibling.classList.remove("active-tab");
      setTabState("usage");
    }
    if (clickedB === null) {
      clickedA.classList.remove("active-tab");
      //   clickedA.nextElementSibling.classList.remove("active-tab");
      setTabState("purchase");
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
      getItemData();
      getUser();
    }
  }, []);

  return (
    singleStockData && (
      <div className="container px-2" dir="rtl">
        {isRestockPopupOpen && (
          <>
            <RestockPopup
              setIsEndTaskPopupActive={setIsRestockPopupOpen}
              setRestockAmount={setRestockAmount}
              setRestockCost={setRestockCost}
              setInventoryID={setInventoryID}
              handleRestock={handleRestock}
            />
            <PopupBackground isPopupActive={setIsRestockPopupOpen} />
          </>
        )}
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 mb-3 px-2">
          <div className="bold-xlarge">
            {singleStockData.overallStockData.stockName}
          </div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>
        <div className="d-flex flex-column align-items-center gap-3 bg-white rounded-5 p-4 drop-shadow">
          <img
            src={singleStockData.overallStockData.stockPicture}
            width={120}
            height={120}
            className="rounded-circle drop-shadow"
            alt=""
          />
          <div className="bold-xlarge my-3">
            <span>{singleStockData.overallStockData.stockName}</span>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/editStock/${singleStockData.overallStockData.stockID}`}>
              <StockEditBtn54 />
            </Link>
            <span
              className="has-pointer"
              onClick={() => {
                setIsRestockPopupOpen(true);
              }}
            >
              <ThunderIcon54 />
            </span>
            <Link to={"/returnItem"}>
              <span>
                <ReturnStockIcon54 />
              </span>
            </Link>
            <Link to={"/inventoryHandling"}>
              <span>
                <StockMangementIcon54 />
              </span>
            </Link>
          </div>
          <div
            className={`d-flex align-items-center gap-1 ${
              singleStockData.overallStockData.stockStatus === 2
                ? "badge-green-single-stock"
                : singleStockData.overallStockData.stockStatus === 1
                ? "badge-yellow-single-stock"
                : "badge-red-single-stock"
            }`}
          >
            <span>
              {singleStockData.overallStockData.stockStatus === 2 && (
                <SingleStockSufficientIcon />
              )}
              {singleStockData.overallStockData.stockStatus === 1 && (
                <SingleStockInsufficientIcon />
              )}
              {singleStockData.overallStockData.stockStatus === 0 && (
                <SingleStockEmptyIcon />
              )}
            </span>
            <span
              className={
                singleStockData.overallStockData.stockStatus === 2
                  ? "greenTeal-large-bold500"
                  : singleStockData.overallStockData.stockStatus === 1
                  ? "yellow-large-bold500"
                  : "red-large-bold500"
              }
            >
              موجودی انبار{" "}
            </span>
            <span className="grey-xlarge-bold">
              <span>
                {(+singleStockData.overallStockData
                  .stockAmount).toLocaleString()}{" "}
              </span>
              <span>{singleStockData.overallStockData.stockUnit}</span>
            </span>
          </div>
        </div>
        <hr />
        <div>
          <div className="bold-xlarge pe-2">
            <span>جزئیات انبار</span>
          </div>
          <div className="log-in-tabs bg-white d-flex justify-content-between align-items-center rounded-pill text-center p-2 mx-2 mt-2 drop-shadow">
            <span
              className="active-tab flex-fill py-2 px-1 has-pointer"
              onClick={(event) => handleTabChange(event)}
            >
              خرید
            </span>
            <span
              className="flex-fill py-2 px-1 has-pointer"
              onClick={(event) => handleTabChange(event)}
            >
              مصرف
            </span>
          </div>
          {tabState === "purchase" && (
            <PurchaseHistory
              data={singleStockData.detailStockData.restockHistory}
            />
          )}
          {tabState === "usage" && (
            <UsageHistory data={singleStockData.detailStockData.usageHistory} />
          )}
        </div>
      </div>
    )
  );
};

export default SingleStock;

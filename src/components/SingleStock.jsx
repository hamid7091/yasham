import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

const SingleStock = () => {
  const param = useParams();
  console.log(param.id);
  const singleStockMockDataInsufficient = {
    overallStockData: {
      stockID: 1,
      stockName: "گچ",
      stockStatus: 1,
      stockAmount: 1,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
    },
    detailStockData: {
      restockHistory: [
        {
          restockAmount: 200,
          restockDate: "1402-06-27",
          inventoryID: "#2514568",
          restockCost: 25000000,
        },
        {
          restockAmount: 500,
          restockDate: "1402-08-27",
          inventoryID: "#2554568",
          restockCost: 85000000,
        },
      ],
      usageHistory: [
        {
          usageAmount: 12,
          usageDate: "1402-07-30",
          inventoryID: "#256584",
          orderID: 2,
          operator: "باقرعلی محمدعلی نژادوندیان اصل",
        },
        {
          usageAmount: 60,
          usageDate: "1402-08-21",
          inventoryID: "#256584",
          orderID: 1,
          operator: "عیسی مسیح",
        },
        {
          usageAmount: 52,
          usageDate: "1402-09-02",
          inventoryID: "#256504",
          orderID: 8,
          operator: "باقرعلی اصل",
        },
        {
          usageAmount: 23,
          usageDate: "1402-09-15",
          inventoryID: "#295584",
          orderID: 5,
          operator: "رحیم علی",
        },
        {
          usageAmount: 46,
          usageDate: "1402-10-6",
          inventoryID: "#659865",
          orderID: 2,
          operator: "ولی عل قلی رضی",
        },
      ],
    },
  };
  const singleStockMockDataEmpty = {
    overallStockData: {
      stockID: 1,
      stockName: "گچ",
      stockStatus: 0,
      stockAmount: 1,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
    },
    detailStockData: {
      restockHistory: [
        {
          restockAmount: 200,
          restockDate: "1402-06-27",
          inventoryID: "#2514568",
          restockCost: 25000000,
        },
        {
          restockAmount: 500,
          restockDate: "1402-08-27",
          inventoryID: "#2554568",
          restockCost: 85000000,
        },
      ],
      usageHistory: [
        {
          usageAmount: 12,
          usageDate: "1402-07-30",
          inventoryID: "#256584",
          orderID: 2,
          operator: "باقرعلی محمدعلی نژادوندیان اصل",
        },
        {
          usageAmount: 60,
          usageDate: "1402-08-21",
          inventoryID: "#256584",
          orderID: 1,
          operator: "عیسی مسیح",
        },
        {
          usageAmount: 52,
          usageDate: "1402-09-02",
          inventoryID: "#256504",
          orderID: 8,
          operator: "باقرعلی اصل",
        },
        {
          usageAmount: 23,
          usageDate: "1402-09-15",
          inventoryID: "#295584",
          orderID: 5,
          operator: "رحیم علی",
        },
        {
          usageAmount: 46,
          usageDate: "1402-10-6",
          inventoryID: "#659865",
          orderID: 2,
          operator: "ولی عل قلی رضی",
        },
      ],
    },
  };
  const singleStockMockData = {
    overallStockData: {
      stockID: 1,
      stockName: "گچ",
      stockStatus: 2,
      stockAmount: 1,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
    },
    detailStockData: {
      restockHistory: [
        {
          restockAmount: 200,
          restockDate: "1402-06-27",
          inventoryID: "#2514568",
          restockCost: 25000000,
        },
        {
          restockAmount: 500,
          restockDate: "1402-08-27",
          inventoryID: "#2554568",
          restockCost: 85000000,
        },
      ],
      usageHistory: [
        {
          usageAmount: 12,
          usageDate: "1402-07-30",
          inventoryID: "#256584",
          orderID: 2,
          operator: "باقرعلی محمدعلی نژادوندیان اصل",
        },
        {
          usageAmount: 60,
          usageDate: "1402-08-21",
          inventoryID: "#256584",
          orderID: 1,
          operator: "عیسی مسیح",
        },
        {
          usageAmount: 52,
          usageDate: "1402-09-02",
          inventoryID: "#256504",
          orderID: 8,
          operator: "باقرعلی اصل",
        },
        {
          usageAmount: 23,
          usageDate: "1402-09-15",
          inventoryID: "#295584",
          orderID: 5,
          operator: "رحیم علی",
        },
        {
          usageAmount: 46,
          usageDate: "1402-10-6",
          inventoryID: "#659865",
          orderID: 2,
          operator: "ولی عل قلی رضی",
        },
      ],
    },
  };
  const [isRestockPopupOpen, setIsRestockPopupOpen] = useState(false);
  const [singleStockData, setSingleStockData] = useState();
  const [tabState, setTabState] = useState("purchase");

  // popup states ----------------------------------------
  const [restockAmount, setRestockAmount] = useState();
  const [restockCost, setRestockCost] = useState();
  const [inventoryID, setInventoryID] = useState();

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
  //data: "{\"pageNum\":1}"
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

  useEffect(() => {
    // setSingleStockData(singleStockMockDataEmpty);
    getItemData();
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
              <span>{singleStockData.overallStockData.stockAmount} </span>
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
              unit={singleStockData.overallStockData.stockUnit}
            />
          )}
          {tabState === "usage" && (
            <UsageHistory
              data={singleStockData.detailStockData.usageHistory}
              unit={singleStockData.overallStockData.stockUnit}
            />
          )}
        </div>
      </div>
    )
  );
};

export default SingleStock;

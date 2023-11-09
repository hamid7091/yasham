import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllStockFilterPopup from "./AllStockFilterPopup";
import PopupBackground from "./PopupBackground";
import SearchIcon from "../assets/svg-icons/SearchIcon";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";
import Message from "../micro-components/Message";
import InventoryItemCard from "./InventoryItemCard";
import FilterIcon from "../assets/svg-icons/FilterIcon";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const AllInventory = () => {
  const inventoryMockData = [
    {
      stockID: 1,
      stockName: "گچ سفید کاری",
      stockAmount: 5,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: 0,
    },
    {
      stockID: 2,
      stockName: "گچ سیاه",
      stockAmount: 6,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: 1,
    },
    {
      stockID: 3,
      stockName: "سیمان",
      stockAmount: 0,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: 0,
    },
    {
      stockID: 9,
      stockName: "الکل",
      stockAmount: 7,
      stockUnit: "لیتر",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: 1,
    },
    {
      stockID: 10,
      stockName: "پشمک",
      stockAmount: 65,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: 2,
    },
    {
      stockID: 10,
      stockName: "میوه",
      stockAmount: 45,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: 2,
    },
    {
      stockID: 11,
      stockName: "چای",
      stockAmount: 84,
      stockUnit: "کیلوگرم",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: 2,
    },
    {
      stockID: 12,
      stockName: "اب نبات",
      stockAmount: 284,
      stockUnit: "عدد",
      stockPicture:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      stockStatus: 2,
    },
  ];
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("AccessToken");

  // ----States---
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [filteredCurrentPageNum, setFilteredCurrentPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredTotalPages, setFilteredTotalPages] = useState(1);
  const [allStockData, setAllStockData] = useState([]);
  const [filteredAllStockData, setFilteredAllStockData] = useState([]);
  const [isFilterPopupActive, setIsFilterPopupActive] = useState(false);
  const [isSom, setIsSom] = useState(false);

  const [stockStatus, setStockStatus] = useState(2);
  const [searchedStock, setSearchedStock] = useState();
  const [isFiltered, setIsFiltered] = useState(false);

  const [filteredCats, setFilteredCats] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filterArea = "stocks";

  const allInventoryURL = "https://samane.zbbo.net/api/v1/item/all_items";
  const allInventoryHeader = new Headers();
  allInventoryHeader.append("Authorization", `Bearer ${accessToken}`);
  const allInventoryFormdata = new FormData();
  allInventoryFormdata.append("pageNum", currentPageNum);
  const allInventoryRequestOptions = {
    method: "POST",
    headers: allInventoryHeader,
    body: allInventoryFormdata,
    redirect: "follow",
  };

  const handleSearchedStock = () => {};

  const handleCapReduction = (cat) => {
    console.log(cat);
    console.log(isFiltered);
    if (isFiltered) {
      if (cat.value == "stockStatus") {
        setIsSubmitted(true);
        setStockStatus(null);
      } else if (cat.value === "stockName") {
        setIsSubmitted(true);
        setSearchedStock(null);
      }
    }
    console.log(filteredCats.length);
  };

  const getFilteredInventoryDataAuto = async () => {
    console.log("fda fired");
    console.log(filteredCurrentPageNum);
    console.log(stockStatus);
    const filterHeader = new Headers();
    filterHeader.append("Authorization", `Bearer ${accessToken}`);
    let filterFormdata = new FormData();
    filterFormdata.append("pageNum", filteredCurrentPageNum);
    if (stockStatus) {
      filterFormdata.append("stockStatus", stockStatus);
    }
    const filterRequestOptions = {
      method: "POST",
      headers: filterHeader,
      body: filterFormdata,
      redirect: "follow",
    };
    const response = await fetchData(allInventoryURL, filterRequestOptions);
    setFilteredCurrentPageNum((prevNum) => prevNum + 1);
    setFilteredAllStockData((prevItems) => [...prevItems, ...response.cards]);
    setFilteredTotalPages(response.total_pages);
  };

  const getFilteredInventoryData = async (event) => {
    console.log("fd fired");
    Loading.standard("در حال دریافت اطلاعات");
    event?.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
    setFilteredCurrentPageNum(1);
    setFilteredCats([]);
    setIsFiltered(true);
    setIsFilterPopupActive(false);
    const filterHeader = new Headers();
    filterHeader.append("Authorization", `Bearer ${accessToken}`);
    let filterFormdata = new FormData();
    filterFormdata.append("pageNum", 1);
    if (searchedStock) {
      filterFormdata.append("stockName", searchedStock);
      setFilteredCats((prevStates) => [
        ...prevStates,
        { label: searchedStock, value: "stockName" },
      ]);
    }
    if (stockStatus) {
      filterFormdata.append("stockStatus", stockStatus);
      setFilteredCats((prevStates) => [
        ...prevStates,
        { label: stockStatus, value: "stockStatus" },
      ]);
    }
    const filterRequestOptions = {
      method: "POST",
      headers: filterHeader,
      body: filterFormdata,
      redirect: "follow",
    };

    const response = await fetchData(allInventoryURL, filterRequestOptions);
    console.log(response);
    setFilteredCurrentPageNum((prevNum) => prevNum + 1);
    setFilteredAllStockData(response.cards);
    setFilteredTotalPages(response.total_pages);
    Loading.remove();
  };

  const getAllInventoryData = async (url, options) => {
    setIsLoading(true);
    const response = await fetchData(url, options);
    setAllStockData((prevCards) => [...prevCards, ...response.cards]);
    setTotalPages(response.total_pages);
    setCurrentPageNum((prevNum) => prevNum + 1);
    setIsLoading(false);
    setIsSom(true);
    console.log(response);
  };
  const handleScroll = () => {
    if (
      !isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      isSom
    ) {
      getAllInventoryData(allInventoryURL, allInventoryRequestOptions);
    } else if (
      isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1
    ) {
      console.log("sc fired");

      getFilteredInventoryDataAuto();
    }
  };

  useEffect(() => {
    if (accessToken === null) {
      navigate("/");
    }
    if (!isFiltered) {
      getAllInventoryData(allInventoryURL, allInventoryRequestOptions);
    }
  }, []);
  useEffect(() => {
    if (totalPages >= currentPageNum && !isFiltered) {
      window.addEventListener("scroll", handleScroll);
    }
    if (filteredTotalPages >= filteredCurrentPageNum && isFiltered) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPageNum, filteredCurrentPageNum]);
  useEffect(() => {
    if (isSubmitted) {
      getFilteredInventoryData();
      setIsSubmitted(false);
    }
  }, [isSubmitted, stockStatus, searchedStock]);

  console.log(filteredAllStockData);
  return (
    <div className="mb-100 px-3 mt-3" dir="rtl">
      {isFilterPopupActive && (
        <>
          <AllStockFilterPopup
            setIsFilterPopupActive={setIsFilterPopupActive}
            handleFilter={getFilteredInventoryData}
            setIsFilter={setIsFiltered}
            setStockStatus={setStockStatus}
            stockStatus={stockStatus}
          />
          <PopupBackground
            isPopupActive={setIsFilterPopupActive}
            setIsFilter={setIsFiltered}
          />
        </>
      )}
      <div className="d-flex align-items-center gap-3 mb-3">
        <input
          onChange={handleSearchedStock}
          value={searchedStock}
          type="text"
          className="flex-grow-1 rounded-pill p-3"
          placeholder="جستجوی نام بیمار ..."
        />
        <span className="has-pointer" onClick={getFilteredInventoryData}>
          <SearchIcon />
        </span>
      </div>
      {filteredCats.length > 0 && (
        <>
          <div className="d-flex ">
            {filteredCats.map((cat, i) => {
              return (
                <div
                  key={i}
                  className="bg-white py-1 px-3 mt-3 rounded-pill has-pointer ms-1"
                >
                  <span className="thin-default">
                    {cat.label === "1" && "رو به اتمام"}
                    {cat.label == "2" && "موجود"}
                    {cat.label === "0" && "ناموجود"}
                  </span>
                  <span onClick={() => handleCapReduction(cat)}>
                    <BLCloseBtn />
                  </span>
                </div>
              );
            })}
          </div>
          <hr className="text-primary" />
        </>
      )}
      <div>
        {!isFiltered && (
          <div>
            <div className=" mb-3">
              <span className="bold-xlarge pe-3">همه آیتم‌های انبار</span>
            </div>
            {allStockData ? (
              allStockData.map((data, index) => {
                return (
                  <div key={index}>
                    <InventoryItemCard data={data} />
                  </div>
                );
              })
            ) : (
              <Message>موردی یافت نشد</Message>
            )}
          </div>
        )}

        {isFiltered &&
          (filteredAllStockData ? (
            filteredAllStockData.map((data, index) => {
              return <InventoryItemCard key={index} data={data} />;
            })
          ) : (
            <Message>موردی یافت نشد</Message>
          ))}
      </div>
      <span
        className="fixed-bottom-80 drop-shadow has-pointer"
        onClick={() => {
          setIsFilterPopupActive(true);
          stockStatus === null && setStockStatus(2);
        }}
      >
        <FilterIcon />
      </span>
    </div>
  );
};

export default AllInventory;

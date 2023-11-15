import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllStockFilterPopup from "./AllStockFilterPopup";
import PopupBackground from "./PopupBackground";
import SearchIcon from "../assets/svg-icons/SearchIcon";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";
import Message from "../micro-components/Message";
import InventoryItemCard from "./InventoryItemCard";
import FilterIcon from "../assets/svg-icons/FilterIcon";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";

const AllInventory = () => {
  const navigate = useNavigate();
  const searchField = useRef(null);

  // ----States---
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [filteredCurrentPageNum, setFilteredCurrentPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredTotalPages, setFilteredTotalPages] = useState(1);
  const [allStockData, setAllStockData] = useState([]);
  const [filteredAllStockData, setFilteredAllStockData] = useState([]);
  const [isFilterPopupActive, setIsFilterPopupActive] = useState(false);
  const [isSom, setIsSom] = useState(false);

  const [stockStatus, setStockStatus] = useState();
  const [searchedStock, setSearchedStock] = useState();
  const [isFiltered, setIsFiltered] = useState(false);

  const [filteredCats, setFilteredCats] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSearchedStock = (event) => {
    setSearchedStock(event.target.value);
  };
  const handleCapReduction = (cat) => {
    if (isFiltered) {
      if (cat.value == "stockStatus") {
        setIsSubmitted(true);
        setStockStatus(null);
      } else if (cat.value === "itemName") {
        setIsSubmitted(true);
        setSearchedStock(null);
      }
    }
  };
  const getFilteredInventoryListAutoAxios = async () => {
    const formdata = new FormData();
    console.log(stockStatus);
    formdata.append("pageNum", filteredCurrentPageNum);
    if (stockStatus) {
      console.log("fired");
      formdata.append("stockStatus", stockStatus);
    }
    if (searchedStock) {
      formdata.append("stockName", searchedStock);
    }
    try {
      Loading.standard("درحال دریافت اطلاعات");
      const response = await axiosInstance.post("/item/all_items", formdata);
      setFilteredCurrentPageNum((prevNum) => prevNum + 1);
      setFilteredAllStockData((prevItems) => [
        ...prevItems,
        ...response.data.response.cards,
      ]);
      setFilteredTotalPages(response.data.response.total_pages);
      console.log(response.data.response);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getSearchedInventoryListAxios = async (event) => {
    event?.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
    setFilteredCurrentPageNum(1);
    setFilteredCats([]);
    setIsFiltered(true);
    setIsFilterPopupActive(false);
    setStockStatus(null);
    const formdata = new FormData();
    formdata.append("pageNum", 1);
    if (searchedStock) {
      formdata.append("itemName", searchedStock);
      setFilteredCats((prevStates) => [
        ...prevStates,
        { label: searchedStock, value: "itemName" },
      ]);
      searchField.current.value = null;
    }
    try {
      Loading.standard("درحال دریافت اطلاعات");
      const response = await axiosInstance.post("/item/all_items", formdata);
      setFilteredCurrentPageNum((prevNum) => prevNum + 1);
      setFilteredAllStockData(response.data.response.cards);
      setFilteredTotalPages(response.data.response.total_pages);
      console.log(response.data.response);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getFilteredInventoryListAxios = async (event) => {
    event?.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
    setFilteredCurrentPageNum(1);
    setFilteredCats([]);
    setIsFiltered(true);
    setIsFilterPopupActive(false);
    setSearchedStock(null);
    const formdata = new FormData();
    formdata.append("pageNum", 1);

    if (stockStatus) {
      console.log(stockStatus);
      formdata.append("stockStatus", stockStatus);
      setFilteredCats((prevStates) => [
        ...prevStates,
        { label: stockStatus, value: "stockStatus" },
      ]);
    }
    try {
      Loading.standard("درحال دریافت اطلاعات");
      const response = await axiosInstance.post("/item/all_items", formdata);
      setFilteredCurrentPageNum((prevNum) => prevNum + 1);
      setFilteredAllStockData(response.data.response.cards);
      setFilteredTotalPages(response.data.response.total_pages);
      console.log(response.data.response);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getInventoryListAxios = async () => {
    setIsLoading(true);
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/item/all_items", {
        pageNum: currentPageNum,
      });
      setAllStockData((prevCards) => [
        ...prevCards,
        ...response.data.response.cards,
      ]);
      setTotalPages(response.data.response.total_pages);
      setCurrentPageNum((prevNum) => prevNum + 1);
      setIsLoading(false);
      setIsSom(true);
      console.log(response.data.response);

      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
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
      getInventoryListAxios();
    } else if (
      isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      isSom
    ) {
      getFilteredInventoryListAutoAxios();
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/");
    }
    if (!isFiltered) {
      getInventoryListAxios();
    }
  }, [isFiltered]);
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
      getFilteredInventoryListAxios();
      setIsSubmitted(false);
    }
  }, [isSubmitted, stockStatus, searchedStock]);

  return (
    <div className="mb-100 px-3 mt-3" dir="rtl">
      {isFilterPopupActive && (
        <>
          <AllStockFilterPopup
            setIsFilterPopupActive={setIsFilterPopupActive}
            handleFilter={getFilteredInventoryListAxios}
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
          ref={searchField}
          onChange={handleSearchedStock}
          type="text"
          className="flex-grow-1 rounded-pill p-3"
          placeholder="جستجوی نام بیمار ..."
        />
        <span className="has-pointer" onClick={getSearchedInventoryListAxios}>
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
                    {cat.label === "2" && "موجود"}
                    {cat.label === "0" && "ناموجود"}
                    {cat.value === "itemName" && cat.label}
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
        }}
      >
        <FilterIcon />
      </span>
    </div>
  );
};

export default AllInventory;

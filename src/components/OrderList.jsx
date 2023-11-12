import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SearchIcon from "../assets/svg-icons/SearchIcon";
import ClientTaskCard from "./ClientTaskCard";
import Message from "../micro-components/Message";
import FilterIcon from "../assets/svg-icons/FilterIcon";
import PopupBackground from "./PopupBackground";
import FilterPopup from "./FilterPopup";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";
import BackArrow from "../assets/svg-icons/BackArrow";
import moment from "moment-jalaali";
import { Loading } from "notiflix";
import axiosInstance from "../util-functions/axiosInstance";

const OrderList = ({ isDirect, fromSingleBusiness }) => {
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem("AccessToken");
  const location = useLocation();

  // necessary states
  const [pageNum, setPageNum] = useState(1);
  const [filterPageNum, setFilterPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterTotalPages, setFilterTotalPages] = useState(1);
  const [ordersData, setOrdersData] = useState([]);
  const [filteredOrdersData, setFilteredOrdersData] = useState([]);
  const [isFilterPopupActive, setIsFilterPopupActive] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [invoiceStatus, setInvoiceStatus] = useState();
  const [searchedPatientName, setSearchedPatientName] = useState();
  const [isFiltered, setIsFiltered] = useState(false);

  const [filteredCats, setFilteredCats] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSom, setIsSom] = useState(false);

  const filterArea = "orders";
  const isSingle = false;

  const invoiceStatusOptions = [
    { clientName: "پرداخت شده", clientID: 3 }, // به منظور همخوانی با نحوه کانورت در پاپ اپ فیلتر بدین شکل نوشته شده است
    { clientName: "در انتظار پرداخت", clientID: 1 },
    { clientName: "در انتظار قیمت گذاری", clientID: 0 },
  ];

  const handleSearchedPatientName = (event) => {
    setSearchedPatientName(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (!endDate) {
      setEndDate(null);
    }
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (!startDate) {
      setStartDate(null);
    }
  };
  const getFilteredOrderList = async (event) => {
    event?.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
    setFilterPageNum(1);
    setFilteredCats([]);
    setIsFiltered(true);
    setIsFilterPopupActive(false);
    const formdata = new FormData();
    formdata.append("pageNum", 1);
    if (searchedPatientName) {
      formdata.append("patientName", searchedPatientName);
      setFilteredCats((prevStates) => [
        ...prevStates,
        { label: searchedPatientName, value: "patientName" },
      ]);
      // setSearchedPatientName(null);
    }
    if (invoiceStatus) {
      formdata.append("invoiceStatusID", invoiceStatus.value);
      setFilteredCats((prevStates) => [
        ...prevStates,
        { label: invoiceStatus.label, value: "client" },
      ]);
    }
    if (startDate && endDate) {
      formdata.append(
        "startDate",
        typeof startDate === "object" ? startDate?.toUnix() : startDate
      );
      formdata.append(
        "endDate",
        typeof endDate === "object" ? endDate?.toUnix() : endDate
      );
      setFilteredCats((prevStates) => [
        ...prevStates,
        {
          label:
            typeof startDate === "object"
              ? `${moment
                  .unix(startDate?.toUnix())
                  .format("jYYYY/jM/jD")} تا ${moment
                  .unix(endDate?.toUnix())
                  .format("jYYYY/jM/jD")}`
              : `${moment.unix(startDate).format("jYYYY/jM/jD")} تا ${moment
                  .unix(endDate)
                  .format("jYYYY/jM/jD")}`,
          value: "date",
        },
      ]);
    }

    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/order/history", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFilterPageNum((prevNum) => prevNum + 1);
      setFilteredOrdersData(response.data.response.cards);
      setFilterTotalPages(response.data.response.total_pages);
      setIsSom(true);
      setSearchedPatientName("");
      console.log(response.data.response);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  // ----------------------------------------------------------------------

  const getFilteredOrderListAuto = async () => {
    const formdata = new FormData();
    formdata.append("pageNum", filterPageNum);
    if (invoiceStatus) {
      formdata.append("invoiceStatusID", invoiceStatus.value);
    }
    if (startDate && endDate) {
      formdata.append("startDate", startDate?.toUnix());
      formdata.append("endDate", endDate?.toUnix());
    }
    try {
      const response = await axiosInstance.post("/order/history", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFilterPageNum((prevNum) => prevNum + 1);
      setFilteredOrdersData((prevItems) => [
        ...prevItems,
        ...response.data.response.cards,
      ]);
      setFilterTotalPages(response.data.response.total_pages);
    } catch (error) {
      console.error(error);
    }
  };
  const getOrderList = async () => {
    setIsLoading(true);
    try {
      Loading.standard("درحال دریافت اطلاعات");
      const response = await axiosInstance.post(
        "/order/history",
        {
          pageNum,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOrdersData((prevItems) => [
        ...prevItems,
        ...response.data.response?.cards,
      ]);
      setTotalPages(response.data.response.total_pages);
      setPageNum((prevPage) => prevPage + 1);
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
      getOrderList();
    } else if (
      isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      isSom
    ) {
      getFilteredOrderListAuto();
    }
  };
  const handleCapReduction = (cat) => {
    if (isFiltered) {
      if (cat.value == "client") {
        setIsSubmitted(true);
        setInvoiceStatus(null);
      } else if (cat.value == "date") {
        setIsSubmitted(true);
        setStartDate(null);
        setEndDate(null);
      } else if (cat.value === "patientName") {
        setIsSubmitted(true);
        setSearchedPatientName(null);
      }
    }
    console.log(filteredCats.length);
  };

  useEffect(() => {
    if (accessToken === null) {
      navigate("/");
    }
    if (!isFiltered) {
      getOrderList();
    }
    if (isFiltered) {
      getFilteredOrderList();
    }
  }, [isFiltered]);
  useEffect(() => {
    // console.log("second useEffect fired");
    if (totalPages >= pageNum && !isFiltered) {
      window.addEventListener("scroll", handleScroll);
    }
    if (filterTotalPages >= filterPageNum && isFiltered) {
      // console.log("filtered fired");
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageNum, filterPageNum]);
  useEffect(() => {
    // console.log("newuseeffectfired");
    if (isSubmitted) {
      getFilteredOrderList();
      setIsSubmitted(false);
    }
  }, [isSubmitted, invoiceStatus, startDate, endDate]);

  const today = moment().format("jYYYY/jMM/jDD");
  const todatUnix = moment().unix();

  useEffect(() => {
    if (location.state === "searchToday") {
      setStartDate(todatUnix);
      setEndDate(todatUnix);
      setIsFiltered(true);
    }
  });

  return (
    <div className="px-3 mb-100 container" dir="rtl">
      {isFilterPopupActive && (
        <>
          <FilterPopup
            setIsFilterPopupActive={setIsFilterPopupActive}
            clientsList={invoiceStatusOptions}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            startDate={startDate}
            endDate={endDate}
            handleFilter={getFilteredOrderList}
            clientName={invoiceStatus}
            setClientName={setInvoiceStatus}
            setIsFilter={setIsFiltered}
            setIsSubmitted={setIsSubmitted}
            filterArea={filterArea}
            isDirect={isDirect}
          />
          <PopupBackground
            isPopupActive={setIsFilterPopupActive}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            setStatusField={setInvoiceStatus}
          />
        </>
      )}
      {isDirect === undefined && (
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2">
          <div className="bold-xlarge">لیست سفارشات</div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>
      )}
      {fromSingleBusiness !== true && (
        <div className="d-flex align-items-center gap-3">
          <input
            onChange={handleSearchedPatientName}
            type="text"
            className="flex-grow-1 rounded-pill p-3"
            placeholder={`${
              isDirect === undefined
                ? "جستجوی نام پزشک ..."
                : "جستجوی نام بیمار ..."
            }`}
          />
          <span className="has-pointer" onClick={getFilteredOrderList}>
            <SearchIcon />
          </span>
        </div>
      )}
      {filteredCats.length > 0 && (
        <>
          <div className="d-flex ">
            {filteredCats.map((cat, i) => {
              return (
                <div
                  key={i}
                  className="bg-white py-1 px-3 mt-3 rounded-pill has-pointer ms-1"
                >
                  <span className="thin-default">{cat.label}</span>
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
        {!isFiltered &&
          (ordersData ? (
            ordersData.map((order, index) => {
              return (
                <ClientTaskCard
                  key={index}
                  order={order}
                  isSingle={isSingle}
                  isDirect={isDirect}
                />
              );
            })
          ) : (
            <Message>موردی یافت نشد</Message>
          ))}

        {isFiltered &&
          (filteredOrdersData ? (
            filteredOrdersData.map((order, index) => {
              return (
                <ClientTaskCard
                  key={index}
                  order={order}
                  isSingle={isSingle}
                  isDirect={isDirect}
                />
              );
            })
          ) : (
            <Message>موردی یافت نشد</Message>
          ))}
      </div>
      {fromSingleBusiness !== true && (
        <span
          className={`drop-shadow has-pointer ${
            isDirect === undefined ? "fixed-bottom-30" : "fixed-bottom-80"
          }`}
          onClick={() => {
            setIsFilterPopupActive(true);
            // setIsFilter(true);
          }}
        >
          <FilterIcon />
        </span>
      )}
    </div>
  );
};

export default OrderList;

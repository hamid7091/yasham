import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import { Loading } from "notiflix/build/notiflix-aio";
import moment from "moment-jalaali";
import fetchData from "../util-functions/fetchData";
import InvoiceCard from "./InvoiceCard";
import FilterIcon from "../assets/svg-icons/FilterIcon";
import FilterPopup from "./FilterPopup";
import PopupBackground from "./PopupBackground";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";
import Message from "../micro-components/Message";
import axiosInstance from "../util-functions/axiosInstance";

const Invoices = ({ fromSingleBusiness }) => {
  const navigate = useNavigate();

  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentFPageNum, setCurrentFPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFPages, setTotalFPages] = useState(1);
  const [factorsData, setFactorsData] = useState([]);
  const [filteredFactorsData, setFilteredFactorsData] = useState([]);
  const [isFilterPopupActive, setIsFilterPopupActive] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [invoiceStatus, setInvoiceStatus] = useState();
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredCats, setFilteredCats] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const filterArea = "orders";

  const invoiceStatusOptions = [
    { clientName: "پرداخت شده", clientID: 3 }, // به منظور همخوانی با نحوه کانورت در پاپ اپ فیلتر بدین شکل نوشته شده است
    { clientName: "در انتظار پرداخت", clientID: 1 },
    { clientName: "لغو شده", clientID: 2 },
  ];

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (!endDate || !endDate) {
      setEndDate(null);
    }
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (!startDate || !startDate) {
      setStartDate(null);
    }
  };
  const getFilteredInvoices = async (event) => {
    event?.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
    setCurrentFPageNum(1);
    setFilteredCats([]);
    setIsFiltered(true);
    setIsFilterPopupActive(false);
    const formdata = new FormData();
    formdata.append("pageNum", 1);
    if (invoiceStatus) {
      formdata.append("statusID", invoiceStatus.value);
      setFilteredCats((prevStates) => [
        ...prevStates,
        { label: invoiceStatus.label, value: "client" },
      ]);
    }
    if (startDate && endDate) {
      formdata.append("startDate", startDate?.toUnix());
      formdata.append("endDate", endDate?.toUnix());
      setFilteredCats((prevStates) => [
        ...prevStates,
        {
          label: `${moment
            .unix(startDate?.toUnix())
            .format("jYYYY/jM/jD")} تا ${moment
            .unix(endDate?.toUnix())
            .format("jYYYY/jM/jD")}`,
          value: "date",
        },
      ]);
    }
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post(
        "/invoice/all_invoices",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCurrentFPageNum((prevNum) => prevNum + 1);
      setFilteredFactorsData(response.data.response.cards);
      setTotalFPages(response.data.response.total_pages);
      console.log(response.data.response);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getFilteredInvoicesAuto = async () => {
    const formdata = new FormData();
    formdata.append("pageNum", currentFPageNum);
    if (invoiceStatus) {
      formdata.append("statusID", invoiceStatus.value);
    }
    if (startDate && endDate) {
      formdata.append("startDate", startDate?.toUnix());
      formdata.append("endDate", endDate?.toUnix());
    }
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post(
        "/invoice/all_invoices",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCurrentFPageNum((prevNum) => prevNum + 1);
      setFilteredFactorsData((prevItems) => [
        ...prevItems,
        ...response.data.response.cards,
      ]);
      setTotalFPages(response.data.response.total_pages);
      console.log(response.data.response);

      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getInvoicesList = async () => {
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post(
        "/invoice/all_invoices",
        { pageNum: currentPageNum },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFactorsData((prevItems) => [
        ...prevItems,
        ...response.data.response.cards,
      ]);
      setTotalPages(response.data.response.total_pages);
      setCurrentPageNum((prevPage) => prevPage + 1);
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
        1
    ) {
      getInvoicesList();
    } else if (
      isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1
    ) {
      getFilteredInvoicesAuto();
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
      }
    }
    console.log(filteredCats.length);
  };

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/");
    }
    if (!isFiltered) {
      getInvoicesList();
    }
  }, []);
  useEffect(() => {
    // console.log("second useEffect fired");
    if (totalPages >= currentPageNum && !isFiltered) {
      window.addEventListener("scroll", handleScroll);
    }
    if (totalFPages >= currentFPageNum && isFiltered) {
      // console.log("filtered fired");
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPageNum, currentFPageNum]);
  useEffect(() => {
    if (isSubmitted) {
      getFilteredInvoices();
      setIsSubmitted(false);
    }
  }, [isSubmitted, invoiceStatus, startDate, endDate]);

  return (
    <div className="container" dir="rtl">
      {isFilterPopupActive && (
        <>
          <FilterPopup
            setIsFilterPopupActive={setIsFilterPopupActive}
            clientsList={invoiceStatusOptions}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            startDate={startDate}
            endDate={endDate}
            handleFilter={getFilteredInvoices}
            clientName={invoiceStatus}
            setClientName={setInvoiceStatus}
            setIsFilter={setIsFiltered}
            setIsSubmitted={setIsSubmitted}
            filterArea={filterArea}
          />
          <PopupBackground
            isPopupActive={setIsFilterPopupActive}
            setIsFilter={setIsFiltered}
          />
        </>
      )}
      {fromSingleBusiness !== true && (
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3 mb-3">
          <div className="bold-xlarge">فاکتورها</div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>
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
      <div className="shipping-cards-container">
        {}
        {!isFiltered &&
          factorsData.map((factor, index) => {
            return <InvoiceCard key={index} factor={factor} />;
          })}
        {isFiltered &&
          (filteredFactorsData ? (
            filteredFactorsData.map((factor, index) => {
              return <InvoiceCard key={index} factor={factor} />;
            })
          ) : (
            <Message>نتیجه ای یافت نشد</Message>
          ))}
      </div>
      {fromSingleBusiness !== true && (
        <footer
          className="footer-container px-4 py-3 fixed-bottom bottom-0 d-flex justify-content-between align-items-center single-footer-bg has-pointer"
          onClick={() => {
            setIsFilterPopupActive(true);
            // setIsFilter(true);
          }}
        >
          <FilterIcon />
        </footer>
      )}
    </div>
  );
};

export default Invoices;

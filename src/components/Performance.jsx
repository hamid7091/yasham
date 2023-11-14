import React, { useEffect, useState } from "react";
import BackArrow from "../assets/svg-icons/BackArrow";
import { Link, useNavigate } from "react-router-dom";
import PerformanceCard from "./PerformanceCard";
import FilterIcon from "../assets/svg-icons/FilterIcon";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";
import PopupBackground from "./PopupBackground";
import FilterPopup from "./FilterPopup";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import Message from "../micro-components/Message";
import moment from "moment-jalaali";
import axiosInstance from "../util-functions/axiosInstance";

const Performance = () => {
  const navigate = useNavigate();

  const [pageNum, setPageNum] = useState(1);
  const [filterPageNum, setFilterPageNum] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [filterMaxPage, setFilterMaxPage] = useState(1);
  const [performanceData, setPerformanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterPopupActive, setIsFilterPopupActive] = useState(false);
  const [clientsList, setClientList] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [clientName, setClientName] = useState();
  const [isFilter, setIsFilter] = useState(false);

  const [filteredCats, setFilteredCats] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
  const getFilteredActivityAxios = async (event) => {
    event?.preventDefault();
    window.scrollTo(0, 0);
    setFilterPageNum(1);
    setFilteredCats([]);
    setIsFilter(true);
    setIsFilterPopupActive(false);
    const formdata = new FormData();
    if (clientName) {
      formdata.append("clientID", clientName.value);
      setFilteredCats((prevStates) => [
        ...prevStates,
        { label: clientName.label, value: "client" },
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
      Loading.remove();
      const response = await axiosInstance.post("/activity/report", formdata);
      console.log(response.data.response);
      setFilterPageNum((prevNum) => prevNum + 1);
      setFilteredData(response.data.response?.cards);
      setFilterMaxPage(response.data.response?.total_pages);
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  const getAutoFilteredActivityAxios = async () => {
    const formdata = new FormData();
    formdata.append("pageNum", filterPageNum);
    if (clientName) {
      formdata.append("clientID", clientName.value);
    }
    if (startDate && endDate) {
      formdata.append("startDate", startDate?.toUnix());
      formdata.append("endDate", endDate?.toUnix());
    }
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/activity/report", formdata);
      setFilterPageNum((prevNum) => prevNum + 1);
      setFilteredData((prevItems) => [
        ...prevItems,
        ...response.data.response.cards,
      ]);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getActivityDataAxios = async () => {
    setIsFilterPopupActive(false);

    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/activity/report", {
        pageNum,
      });
      setMaxPages(response.data.response.total_pages);
      if (response.data.response.cards) {
        setPerformanceData((prevItems) => [
          ...prevItems,
          ...response.data.response?.cards,
        ]);
      }
      setPageNum((prevNum) => prevNum + 1);
      setClientList(response.data.response.clients);

      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  const handleScroll = () => {
    if (
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      !isFilter
    ) {
      //getPerformanceData(performanceURL, performanceRequestOptions);
      getActivityDataAxios();
    } else if (
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      isFilter
    ) {
      getAutoFilteredActivityAxios();
    }
  };
  const handleCapReduction = (cat) => {
    if (isFilter) {
      console.log(cat);
      if (cat.value == "client") {
        setIsSubmitted(true);
        setClientName(null);
      } else if (cat.value == "date") {
        setIsSubmitted(true);
        setStartDate(null);
        setEndDate(null);
      }
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/");
    }
    if (!isFilter) {
      getActivityDataAxios();
    }
  }, []);
  useEffect(() => {
    console.log("second useEffect fired");
    if (maxPages >= pageNum && !isFilter) {
      window.addEventListener("scroll", handleScroll);
    }
    if (filterMaxPage >= filterPageNum && isFilter) {
      console.log("filtered fired");
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageNum, filterPageNum]);
  useEffect(() => {
    console.log("newuseeffectfired");
    if (isSubmitted) {
      getFilteredActivityAxios();
      setIsSubmitted(false);
    }
  }, [isSubmitted, clientName, startDate, endDate]);

  return (
    performanceData && (
      <div className="container px-3" dir="rtl">
        {isFilterPopupActive && (
          <>
            <FilterPopup
              setIsFilterPopupActive={setIsFilterPopupActive}
              clientsList={clientsList}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              startDate={startDate}
              endDate={endDate}
              handleFilter={getFilteredActivityAxios}
              clientName={clientName}
              setClientName={setClientName}
              setIsFilter={setIsFilter}
              setIsSubmitted={setIsSubmitted}
              renderedFrom={"Performance"}
            />
            <PopupBackground
              isPopupActive={setIsFilterPopupActive}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              setStatusField={setClientName}
            />
          </>
        )}
        <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 px-3">
          <div className="bold-xlarge">کارکرد</div>
          <Link to="/">
            <BackArrow />
          </Link>
        </header>

        <div className="performance-cards-wrapper mt-4 px-3 shipping-cards-container">
          {filteredCats.length > 0 && (
            <>
              {filteredCats.map((cat, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white py-2 px-3 mb-3 rounded-pill has-pointer d-inline ms-1"
                  >
                    <span className="thin-default">{cat.label}</span>
                    <span onClick={() => handleCapReduction(cat)}>
                      <BLCloseBtn />
                    </span>
                  </div>
                );
              })}
              <hr className="text-primary" />
            </>
          )}
          {!isFilter &&
            (performanceData.length > 0 ? (
              performanceData.map((data, index) => {
                return <PerformanceCard key={index} data={data} />;
              })
            ) : (
              <Message>مورد یافت نشد</Message>
            ))}
          {isFilter &&
            (filteredData ? (
              filteredData.map((data, index) => {
                return <PerformanceCard key={index} data={data} />;
              })
            ) : (
              <Message>موردی یافت نشد</Message>
            ))}
        </div>
        <span
          className={`drop-shadow has-pointer fixed-bottom-30`}
          onClick={() => {
            setIsFilterPopupActive(true);
          }}
        >
          <FilterIcon />
        </span>
      </div>
    )
  );
};

export default Performance;

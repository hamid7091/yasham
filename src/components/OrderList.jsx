import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "../assets/svg-icons/SearchIcon";
import ClientTaskCard from "./ClientTaskCard";
import Message from "../micro-components/Message";
import FilterIcon from "../assets/svg-icons/FilterIcon";
import PopupBackground from "./PopupBackground";
import FilterPopup from "./FilterPopup";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";
import moment from "moment-jalaali";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import SingleHeader from "./SingleHeader";
import useInfLoader from "../micro-components/useInfLoader";
import { RotatingLines } from "react-loader-spinner";
const OrderList = ({ loadedFrom }) => {
  const navigate = useNavigate();
  const location = useLocation();
  let state = location.state?.searchToday;

  const searchField = useRef(null);
  const setter = useRef(null);
  // necessary states

  const [userRole, setUserRole] = useState();
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
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPopupActive, setIsFilterPopupActive] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [invoiceStatus, setInvoiceStatus] = useState();
  const [searchedPatientName, setSearchedPatientName] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFilterFired, setIsFilterFired] = useState(false);
  const [query, setQuery] = useState([]);
  const [pNumber, setPNumber] = useState(1);

  const todatUnix = useMemo(() => {
    return moment().unix();
  }, []);

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
    setIsFilterPopupActive(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    setIsFilterFired(true);
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
  const handleCapReduction = (cat) => {
    console.log(cat);
    if (cat.value == "client") {
      setInvoiceStatus(null);
    } else if (cat.value == "date") {
      setStartDate(null);
      setEndDate(null);
    } else if (cat.value === "patientName" || cat.value === "clientName") {
      setSearchedPatientName(null);
    }
    getFilteredOrderList();
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // console.log("newuseeffectfired");
    if (isSubmitted) {
      getFilteredOrderList();
      setIsSubmitted(false);
    }
  }, [isSubmitted, invoiceStatus, startDate, endDate]);

  useEffect(() => {
    if (state === "searchToday") {
      setStartDate(todatUnix);
      setEndDate(todatUnix);
      setIsFilterFired(true);
      location.state.searchToday = null;
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      (isShipping || isEmployee || isSupervisor || isInventory) &&
        navigate("/unauthorized");
    }
  }, [isShipping, isEmployee, isSupervisor, isInventory]);

  // Intersection Observer Implementations

  const { od, hasMore, isLoadingg, fCats } = useInfLoader(
    query,
    pNumber,
    isClient,
    state
  );

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (isLoadingg) return;
    if (firstEntry.isIntersecting && hasMore) {
      setPNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && setter.current) {
      observer.observe(setter.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [od]);

  useEffect(() => {
    if (isFilterFired) {
      setPNumber(1);
      setQuery([]);
      invoiceStatus &&
        setQuery((prevQ) => [
          ...prevQ,
          { invoiceStatus: invoiceStatus?.value },
        ]);
      startDate &&
        setQuery((prevQ) => [
          ...prevQ,
          { startDate: startDate, endDate: endDate },
        ]);
      // endDate && setQuery((prevQ) => [...prevQ, { endDate: endDate }]);
      searchedPatientName &&
        setQuery([{ searchedPatientName: searchedPatientName }]);
      setIsFilterFired(false);
      // searchField.current.value = "";
    }
    setSearchedPatientName();
    setInvoiceStatus();
    console.log(state);

    // setStartDate();
    // setEndDate();
  }, [isFilterFired]);

  return (
    <div className="px-3 mb-100 container mt-100" id="parent" dir="rtl">
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
            setIsSubmitted={setIsSubmitted}
            renderedFrom={"OrderList"}
            isPManager={isPManager}
          />
          <PopupBackground
            isPopupActive={setIsFilterPopupActive}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            setStatusField={setInvoiceStatus}
          />
        </>
      )}
      {loadedFrom === "action" && (
        <SingleHeader title={"لیست سفارشات"} location={"/"} />
      )}
      {/* {(isClient || isPManager || isFManager || isReception) && ( */}
      <div className="d-flex align-items-center gap-3">
        <input
          ref={searchField}
          onChange={handleSearchedPatientName}
          type="text"
          className="flex-grow-1 rounded-pill p-3"
          placeholder={`${
            isClient ? "جستجوی نام بیمار ..." : "جستجوی نام پزشک ..."
          }`}
        />
        <span className="has-pointer" onClick={getFilteredOrderList}>
          <SearchIcon />
        </span>
      </div>
      {/* )} */}
      {fCats?.length > 0 && (
        <>
          <div className="d-flex ">
            {fCats.map((cat, i) => {
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
      <div id="watched">
        {od &&
          od.map((order, index) => {
            return (
              <ClientTaskCard
                key={index}
                order={order}
                isClient={isClient}
                loadedFrom={"orderList"}
                isFManager={isFManager}
                isReception={isReception}
              />
            );
          })}
        {!isLoadingg && od.length === 0 && <Message>سفارشی وجود ندارد</Message>}
        {isLoadingg && (
          <div className="d-flex align-items-center  justify-content-center pt-3">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </div>
        )}
        <div ref={setter}></div>
      </div>

      {(isClient || isPManager || isFManager || isReception) && (
        <span
          className={`drop-shadow has-pointer ${
            isPManager || isFManager ? "fixed-bottom-30" : "fixed-bottom-80"
          }`}
          onClick={() => {
            setIsFilterPopupActive(true);
            setEndDate(null);
            setStartDate(null);
          }}
        >
          <FilterIcon />
        </span>
      )}
    </div>
  );
};

export default OrderList;

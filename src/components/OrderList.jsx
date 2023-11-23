import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SearchIcon from "../assets/svg-icons/SearchIcon";
import ClientTaskCard from "./ClientTaskCard";
import Message from "../micro-components/Message";
import FilterIcon from "../assets/svg-icons/FilterIcon";
import PopupBackground from "./PopupBackground";
import FilterPopup from "./FilterPopup";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";
import moment from "moment-jalaali";
import { Loading } from "notiflix";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import useInfiniteScroll from "../micro-components/useInfiniteScroll";
import SingleHeader from "./SingleHeader";
import useInfLoader from "../micro-components/useInfLoader";

const OrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state);
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

  const [isSom, setIsSom] = useState(false);

  const [isFilterFired, setIsFilterFired] = useState(false);

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

  const getSearchedOrderList = async (event) => {
    setIsFilterFired(true);
    event?.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
    setFilterPageNum(1);
    setFilteredCats([]);
    setIsFiltered(true);
    setIsFilterPopupActive(false);
    setInvoiceStatus(null);
    setEndDate(null);
    setEndDate(null);
    const formdata = new FormData();
    formdata.append("pageNum", 1);
    if (searchedPatientName) {
      console.log(searchedPatientName);
      console.log(isPManager, isClient);
      formdata.append(
        `${isFManager || isPManager ? "clientName" : "patientName"}`,
        searchedPatientName
      );
      //formdata.append("clientName", searchedPatientName);
      setFilteredCats((prevStates) => [
        ...prevStates,
        {
          label: searchedPatientName,
          value: `${isFManager || isPManager ? "clientName" : "patientName"}`,
        },
      ]);
      // setSearchedPatientName(null);
    }

    try {
      Loading.standard("در حال دریافت اطلاعات");
      console.log(Object.fromEntries(formdata));
      const response = await axiosInstance.post("/order/history", formdata);

      //setIsFilterFired(false);

      setFilterPageNum((prevNum) => prevNum + 1);
      setFilteredOrdersData(response.data.response.cards);
      setFilterTotalPages(response.data.response.total_pages);
      setIsSom(true);
      searchField.current.value = null;
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
    if (searchedPatientName) {
      formdata.append(
        `${isClient ? "patientName" : "clientName"}`,
        searchedPatientName
      );
      //formdata.append("clientName", searchedPatientName);
      // setFilteredCats((prevStates) => [
      //   ...prevStates,
      //   { label: searchedPatientName, value: "patientName" },
      // ]);
      // setSearchedPatientName(null);
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
    try {
      Loading.standard("درحال دریافت اطلاعات");
      const response = await axiosInstance.post("/order/history", {
        pageNum,
      });
      setOrdersData((prevItems) => [
        ...prevItems,
        ...response.data.response?.cards,
      ]);
      setTotalPages(response.data.response.total_pages);
      setPageNum((prevPage) => prevPage + 1);
      setIsSom(true);
      console.log(response.data.response);
      Loading.remove();
    } catch (error) {
      console.error(error);
      // error.response.status === 403 && navigate("/unauthorized");
      Loading.remove();
    }
  };

  const getFilteredOrderList = async (event) => {
    // setIsFilterFired(true);
    // console.log("fired with state");
    // event?.preventDefault();
    // window.scrollTo({ top: 0, behavior: "instant" });
    // setFilterPageNum(1);
    // setFilteredCats([]);
    // setIsFiltered(true);
    // setIsFilterPopupActive(false);
    // setSearchedPatientName(null);
    // const formdata = new FormData();
    // formdata.append("pageNum", 1);
    // if (invoiceStatus) {
    //   formdata.append("invoiceStatusID", invoiceStatus.value);
    //   setFilteredCats((prevStates) => [
    //     ...prevStates,
    //     { label: invoiceStatus.label, value: "client" },
    //   ]);
    // }
    // if (startDate && endDate) {
    //   console.log(startDate?.toUnix());
    //   console.log(endDate?.toUnix());
    //   console.log(moment().format("iYYYY/iMM/iDD"));
    //   formdata.append(
    //     "startDate",
    //     typeof startDate === "object" ? startDate?.toUnix() : startDate
    //   );
    //   formdata.append(
    //     "endDate",
    //     typeof endDate === "object" ? endDate?.toUnix() : endDate
    //   );
    //   setFilteredCats((prevStates) => [
    //     ...prevStates,
    //     {
    //       label:
    //         typeof startDate === "object"
    //           ? `${moment
    //               .unix(startDate?.toUnix())
    //               .format("jYYYY/jM/jD")} تا ${moment
    //               .unix(endDate?.toUnix())
    //               .format("jYYYY/jM/jD")}`
    //           : `${moment.unix(startDate).format("jYYYY/jM/jD")} تا ${moment
    //               .unix(endDate)
    //               .format("jYYYY/jM/jD")}`,
    //       value: "date",
    //     },
    //   ]);
    // }

    // try {
    //   Loading.standard("در حال دریافت اطلاعات");
    //   const response = await axiosInstance.post("/order/history", formdata);

    //   //setIsFilterFired(false);

    //   setFilterPageNum((prevNum) => prevNum + 1);
    //   setFilteredOrdersData(response.data.response.cards);
    //   setFilterTotalPages(response.data.response.total_pages);
    //   setIsSom(true);
    //   searchField.current.value = null;

    //   console.log(response.data.response);
    //   Loading.remove();
    // } catch (error) {
    //   console.error(error);
    //   Loading.remove();
    // }
    console.log("filter function is fired");

    event?.preventDefault();
    setIsFilterPopupActive(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    console.log(invoiceStatus);
    // if (invoiceStatus) {
    //   setFilteredCats((prevStates) => [
    //     ...prevStates,
    //     { label: invoiceStatus.label, value: "client" },
    //   ]);
    // }
    // if (startDate && endDate) {
    //   setFilteredCats((prevStates) => [
    //     ...prevStates,
    //     {
    //       label:
    //         typeof startDate === "object"
    //           ? `${moment
    //               .unix(startDate?.toUnix())
    //               .format("jYYYY/jM/jD")} تا ${moment
    //               .unix(endDate?.toUnix())
    //               .format("jYYYY/jM/jD")}`
    //           : `${moment.unix(startDate).format("jYYYY/jM/jD")} تا ${moment
    //               .unix(endDate)
    //               .format("jYYYY/jM/jD")}`,
    //       value: "date",
    //     },
    //   ]);
    // }
    setIsFilterFired(true);
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.post("/user/check_access_token");
      // const response = {
      //   data: {
      //     response: {
      //       userInfo: {
      //         mobile: "9360390099",
      //         userAvatar:
      //           "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      //         userCaps: {
      //           اطلاعیه: true,
      //           پروفایل: true,
      //           "لیست سفارشات": true,
      //           "کسب و کارها": true,
      //         },
      //         userFirstName: "حمید",
      //         userID: 123,
      //         userLastName: "مدیر مالی",
      //         userRole: ["financial_manager"],
      //       },
      //     },
      //   },
      // };
      setUserRole(response.data.response.userInfo.userRole);
      setIsLoading(false);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleScroll = () => {
  //   console.log("scroll fired");
  //   if (
  //     !isFiltered &&
  //     document.documentElement.offsetHeight -
  //       window.innerHeight -
  //       document.documentElement.scrollTop <
  //       1 &&
  //     isSom
  //   ) {
  //     // getOrderList();
  //   } else if (
  //     isFiltered &&
  //     document.documentElement.offsetHeight -
  //       window.innerHeight -
  //       document.documentElement.scrollTop <
  //       1 &&
  //     isSom
  //   ) {
  //     getFilteredOrderListAuto();
  //   }
  // };

  const handleCapReduction = (cat) => {
    // if (isFiltered) {
    //   if (cat.value == "client") {
    //     setIsSubmitted(true);
    //     setInvoiceStatus(null);
    //   } else if (cat.value == "date") {
    //     setIsSubmitted(true);
    //     setStartDate(null);
    //     setEndDate(null);
    //   } else if (cat.value === "patientName" || cat.value === "clientName") {
    //     setIsSubmitted(true);
    //     setSearchedPatientName(null);
    //   }
    // }
    // console.log(filteredCats.length);

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
    if (!isFiltered) {
      // getOrderList();
    }
    if (isFiltered) {
      console.log("triggered");
      location.state && getFilteredOrderList();
    }
  }, [isFiltered]);

  // useEffect(() => {
  //   if (totalPages >= pageNum && !isFiltered) {
  //     window.addEventListener("scroll", handleScroll);
  //   }
  //   if (filterTotalPages >= filterPageNum && isFiltered) {
  //     window.addEventListener("scroll", handleScroll);
  //   }
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [pageNum, filterPageNum]);

  useEffect(() => {
    // console.log("newuseeffectfired");
    if (isSubmitted) {
      getFilteredOrderList();
      setIsSubmitted(false);
    }
  }, [isSubmitted, invoiceStatus, startDate, endDate]);

  const todatUnix = useMemo(() => {
    return moment().unix();
  }, []);

  useEffect(() => {
    if (location.state?.searchToday === "searchToday") {
      console.log("triggered");
      setStartDate(todatUnix);
      setEndDate(todatUnix);
      setIsFiltered(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      (isShipping || isEmployee || isSupervisor || isInventory) &&
        navigate("/unauthorized");
    }
  }, [isShipping, isEmployee, isSupervisor, isInventory]);

  // Intersection Observer Implementations

  const [query, setQuery] = useState([]);
  const [pNumber, setPNumber] = useState(1);
  const { od, hasMore, isLoadingg, fCats } = useInfLoader(
    query,
    pNumber,
    isClient
  );

  const onIntersection = (entries) => {
    console.log(entries);
    console.log(hasMore);
    const firstEntry = entries[0];
    if (isLoadingg) return;
    if (firstEntry.isIntersecting && hasMore) {
      // setIsFilterFired(true);
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
      console.log("filtere is fired");
      setPNumber(1);
      setQuery([]);
      invoiceStatus &&
        setQuery((prevQ) => [...prevQ, { invoiceStatus: invoiceStatus.value }]);
      startDate &&
        setQuery((prevQ) => [
          ...prevQ,
          { startDate: startDate, endDate: endDate },
        ]);
      // endDate && setQuery((prevQ) => [...prevQ, { endDate: endDate }]);
      searchedPatientName &&
        setQuery([{ searchedPatientName: searchedPatientName }]);
      setIsFilterFired(false);
      searchField.current.value = "";
    }
    setSearchedPatientName();
    setInvoiceStatus();
    setStartDate();
    setEndDate();
  }, [isFilterFired]);

  console.log(od, hasMore, isLoadingg, fCats);

  return (
    <div className="px-3 mb-100 container" id="parent" dir="rtl">
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
      {(isPManager || isFManager) && (
        <SingleHeader
          title={"لیست سفارشات"}
          location={location?.state?.location}
        />
      )}
      {(isClient || isPManager || isFManager) && (
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
      )}
      {fCats?.length > 0 && (
        <>
          <div className="d-flex ">
            {fCats.map((cat, i) => {
              console.log(cat);
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
        {!isFiltered &&
          (od.length ? (
            od.map((order, index) => {
              return (
                <ClientTaskCard
                  key={index}
                  order={order}
                  isClient={isClient}
                  loadedFrom={"orderList"}
                  isFManager={isFManager}
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
                  isClient={isClient}
                  loadedFrom={"orderList"}
                  isFManager={isFManager}
                />
              );
            })
          ) : (
            <Message>موردی یافت نشد</Message>
          ))}
        <div ref={setter}></div>
      </div>
      {(isClient || isPManager || isFManager) && (
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

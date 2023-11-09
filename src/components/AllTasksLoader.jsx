import React, { useEffect, useState } from "react";
import ClientAssignedCard from "./ClientAssignedCard";
import Message from "../micro-components/Message";
import fetchData from "../util-functions/fetchData";
import { useNavigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import moment from "moment-jalaali";
import FilterPopup from "./FilterPopup";
import PopupBackground from "./PopupBackground";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";
import FilterIcon from "../assets/svg-icons/FilterIcon";
import axiosInstance from "../util-functions/axiosInstance";

const AllTasksLoader = ({ isDirect }) => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const navigate = useNavigate();

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentFilteredPageNumber, setCurrentFilteredPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredTotalPage, setFilteredTotalPages] = useState(1);

  const [totalTasksData, setTotalTasksData] = useState([]);
  const [filteredTotalTasksData, setFilteredTotalTasksData] = useState([]);
  const [isFilterPopupActive, setIsFilterPopupActive] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [assignedEmployeeID, setAssignedEmployeeID] = useState();
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredCats, setFilteredCats] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSom, setIsSom] = useState(false);

  const filterArea = "allTasks";

  //const totalTasksURL = "https://samane.zbbo.net/api/v1/task/all_tasks";
  //const totalTasksHeader = new Headers();
  //totalTasksHeader.append("Authorization", `Bearer ${accessToken}`);
  //const totalTasksFormdata = new FormData();
  //totalTasksFormdata.append("pageNum", currentPageNumber);
  // const totalTasksRequestOptions = {
  //   method: "POST",
  //   headers: totalTasksHeader,
  //   body: totalTasksFormdata,
  //   redirect: "follow",
  // };

  const invoiceStatusOptions = [
    { clientName: "حمید قهرمانی", clientID: 3 }, // به منظور همخوانی با نحوه کانورت در پاپ اپ فیلتر بدین شکل نوشته شده است
    { clientName: "علی قناتی", clientID: 1 },
    { clientName: "نیره بوستانی", clientID: 0 },
  ];

  // async function getTotalTasksData(url, options) {
  //   setIsLoading(true);
  //   const response = await fetchData(url, options);
  //   setTotalTasksData((prevData) => [...prevData, ...response.Tasks]);
  //   setTotalPages(response.total_pages);
  //   setCurrentPageNumber((prevPageNum) => prevPageNum + 1);
  //   setIsLoading(false);
  //   setIsSom(true);
  // }

  // ===============================================
  const getTaskListAxios = async () => {
    Loading.standard("در حال دریافت اطلاعات");
    const response = await axiosInstance.post("/task/all_tasks", {
      pageNum: currentPageNumber,
    });
    setTotalTasksData((prevData) => [
      ...prevData,
      ...response.data.response.Tasks,
    ]);
    setTotalPages(response.data.response.total_pages);
    setCurrentPageNumber((prevPageNum) => prevPageNum + 1);
    setIsLoading(false);
    setIsSom(true);
    console.log(response.data.response);

    Loading.remove();
  };
  // ===============================================

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
  // const getFilteredTotalTasksData = async (event) => {
  //   Loading.standard("در حال دریافت اطلاعات");
  //   event?.preventDefault();
  //   window.scrollTo(0, 0);
  //   setCurrentFilteredPageNumber(1);
  //   setFilteredCats([]);
  //   setIsFiltered(true);
  //   setIsFilterPopupActive(false);
  //   const filterHeader = new Headers();
  //   filterHeader.append("Authorization", `Bearer ${accessToken}`);

  //   let filterFormdata = new FormData();
  //   filterFormdata.append("pageNum", 1);
  //   if (assignedEmployeeID) {
  //     console.log(assignedEmployeeID);
  //     filterFormdata.append("employeeID", assignedEmployeeID.value);
  //     setFilteredCats((prevStates) => [
  //       ...prevStates,
  //       { label: assignedEmployeeID.label, value: "client" },
  //     ]);
  //   }
  //   if (startDate && endDate) {
  //     console.log(typeof startDate);
  //     filterFormdata.append(
  //       "startDate",
  //       typeof startDate === "object" ? startDate?.toUnix() : startDate
  //     );
  //     filterFormdata.append(
  //       "endDate",
  //       typeof endDate === "object" ? endDate?.toUnix() : endDate
  //     );
  //     setFilteredCats((prevStates) => [
  //       ...prevStates,
  //       {
  //         label:
  //           typeof startDate === "object"
  //             ? `${moment
  //                 .unix(startDate?.toUnix())
  //                 .format("jYYYY/jM/jD")} تا ${moment
  //                 .unix(endDate?.toUnix())
  //                 .format("jYYYY/jM/jD")}`
  //             : `${moment.unix(startDate).format("jYYYY/jM/jD")} تا ${moment
  //                 .unix(endDate)
  //                 .format("jYYYY/jM/jD")}`,
  //         value: "date",
  //       },
  //     ]);
  //   }
  //   const filterRequestOptions = {
  //     method: "POST",
  //     headers: filterHeader,
  //     body: filterFormdata,
  //     redirect: "follow",
  //   };

  //   const response = await fetchData(totalTasksURL, filterRequestOptions);
  //   console.log(response);
  //   setCurrentFilteredPageNumber((prevNum) => prevNum + 1);
  //   setFilteredTotalTasksData(response.Tasks);
  //   setFilteredTotalPages(response.total_pages);
  //   Loading.remove();
  // };
  // const getFilteredTotalTasksDataAuto = async () => {
  //   const filterHeader = new Headers();
  //   filterHeader.append("Authorization", `Bearer ${accessToken}`);
  //   const filterFormdata = new FormData();
  //   filterFormdata.append("pageNum", currentFilteredPageNumber);
  //   if (assignedEmployeeID) {
  //     filterFormdata.append("invoiceStatusID", assignedEmployeeID.value);
  //   }
  //   if (startDate && endDate) {
  //     filterFormdata.append("startDate", startDate?.toUnix());
  //     filterFormdata.append("endDate", endDate?.toUnix());
  //   }
  //   const filterRequestOptions = {
  //     method: "POST",
  //     headers: filterHeader,
  //     body: filterFormdata,
  //     redirect: "follow",
  //   };
  //   const response = await fetchData(totalTasksURL, filterRequestOptions);
  //   setCurrentFilteredPageNumber((prevNum) => prevNum + 1);
  //   setFilteredTotalTasksData((prevItems) => [...prevItems, ...response.Tasks]);
  //   setFilteredTotalPages(response.total_pages);
  //   console.log(response);
  // };

  const getFilteredTaskListAxios = async (e) => {
    e?.preventDefault();
    window.scrollTo(0, 0);
    setCurrentFilteredPageNumber(1);
    setFilteredCats([]);
    setIsFiltered(true);
    setIsFilterPopupActive(false);

    const formdata = new FormData();
    if (assignedEmployeeID) {
      console.log(assignedEmployeeID);
      formdata.append("employeeID", assignedEmployeeID.value);
      setFilteredCats((prevStates) => [
        ...prevStates,
        { label: assignedEmployeeID.label, value: "client" },
      ]);
    }
    if (startDate && endDate) {
      console.log(typeof startDate);
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
      const response = await axiosInstance.post("/task/all_tasks", formdata, {
        headers: {
          "Content-Type": "multipart/fomr-data",
        },
      });
      setCurrentFilteredPageNumber((prevNum) => prevNum + 1);
      setFilteredTotalTasksData(response.data.response.Tasks);
      setFilteredTotalPages(response.data.response.total_pages);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getAutoFilteredTaskListAxios = async () => {
    const formdata = new FormData();
    if (assignedEmployeeID) {
      formdata.append("employeeID", assignedEmployeeID.value);
    }
    if (startDate && endDate) {
      formdata.append("startDate", startDate?.toUnix());
      formdata.append("endDate", endDate?.toUnix());
    }
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/task/all_tasks", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCurrentFilteredPageNumber((prevNum) => prevNum + 1);
      setFilteredTotalTasksData((prevItems) => [
        ...prevItems,
        ...response.data.response.Tasks,
      ]);
      setFilteredTotalPages(response.data.response.total_pages);
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
      //getTotalTasksData(totalTasksURL, totalTasksRequestOptions);
      getTaskListAxios();
    } else if (
      isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      isSom
    ) {
      //getFilteredTotalTasksDataAuto();
      getAutoFilteredTaskListAxios();
    }
  };
  const handleCapReduction = (cat) => {
    if (isFiltered) {
      console.log(cat);
      if (cat.value == "client") {
        setIsSubmitted(true);
        setAssignedEmployeeID(null);
      } else if (cat.value == "date") {
        setIsSubmitted(true);
        setStartDate(null);
        setEndDate(null);
      }
    }
    console.log(filteredCats.length);
  };

  useEffect(() => {
    if (accessToken === null) {
      navigate("/");
    }
    if (!isFiltered) {
      //getTotalTasksData(totalTasksURL, totalTasksRequestOptions);
      getTaskListAxios();
    }
    if (isFiltered) {
      getFilteredTaskListAxios();
    }
  }, [isFiltered]);
  useEffect(() => {
    // console.log("second useEffect fired");
    if (totalPages >= currentPageNumber && !isFiltered) {
      window.addEventListener("scroll", handleScroll);
    }
    if (filteredTotalPage >= currentFilteredPageNumber && isFiltered) {
      // console.log("filtered fired");
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPageNumber, currentFilteredPageNumber]);
  useEffect(() => {
    // console.log("newuseeffectfired");
    if (isSubmitted) {
      getFilteredTaskListAxios();
      setIsSubmitted(false);
    }
  }, [isSubmitted, assignedEmployeeID, startDate, endDate]);

  return (
    totalTasksData.length > 0 && (
      <div className="px-3 mb-100">
        {isFilterPopupActive && (
          <>
            <FilterPopup
              setIsFilterPopupActive={setIsFilterPopupActive}
              clientsList={invoiceStatusOptions}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              startDate={startDate}
              endDate={endDate}
              handleFilter={getFilteredTaskListAxios}
              clientName={assignedEmployeeID}
              setClientName={setAssignedEmployeeID}
              setIsFilter={setIsFiltered}
              setIsSubmitted={setIsSubmitted}
              filterArea={filterArea}
              // isDirect={isDirect}
            />
            <PopupBackground
              isPopupActive={setIsFilterPopupActive}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              setStatusField={setAssignedEmployeeID}
            />
          </>
        )}
        {filteredCats.length > 0 ? (
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
        ) : (
          <h4 className="bold-xxlarge m-3 px-2">وظیفه‌ها</h4>
        )}

        <div>
          {!isFiltered &&
            (totalTasksData ? (
              totalTasksData.map((task, index) => {
                return <ClientAssignedCard key={index} order={task} />;
              })
            ) : (
              <Message>موردی یافت نشد</Message>
            ))}
          {isFiltered &&
            (filteredTotalTasksData ? (
              filteredTotalTasksData.map((task, index) => {
                return <ClientAssignedCard key={index} order={task} />;
              })
            ) : (
              <Message>موردی یافت نشد</Message>
            ))}
          {isLoading && <Message>درحال بارگذاری</Message>}
        </div>
        <span
          className={`drop-shadow has-pointer ${
            isDirect === undefined ? "fixed-bottom-30" : "fixed-bottom-80"
          }`}
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

export default AllTasksLoader;

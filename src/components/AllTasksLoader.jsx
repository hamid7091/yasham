import React, { useEffect, useState, useMemo, useCallback } from "react";
import ClientAssignedCard from "./ClientAssignedCard";
import Message from "../micro-components/Message";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import moment from "moment-jalaali";
import FilterPopup from "./FilterPopup";
import PopupBackground from "./PopupBackground";
import BLCloseBtn from "../assets/svg-icons/BLCloseBtn";
import FilterIcon from "../assets/svg-icons/FilterIcon";
import axiosInstance from "../util-functions/axiosInstance";
import SingleHeader from "./SingleHeader";
import useAuth from "../micro-components/useAuth";
import ErrorPage from "./ErrorPage";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllTasksLoader = ({ isDirect }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading,
    isError,
    errorItself,
    hasAccess,
    isReady,
    setErrorItself,
    setIsError,
    setIsLoading,
  } = useAuth([
    "employee",
    "project_manager",
    "client",
    "financial_manager",
    "reception",
    "supervisor",
    "supper_administrator",
    "administrator",
  ]);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentFilteredPageNumber, setCurrentFilteredPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredTotalPage, setFilteredTotalPages] = useState(1);
  const [employees, setEmployees] = useState();

  const [totalTasksData, setTotalTasksData] = useState([]);
  const [filteredTotalTasksData, setFilteredTotalTasksData] = useState([]);
  const [isFilterPopupActive, setIsFilterPopupActive] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [assignedEmployeeID, setAssignedEmployeeID] = useState();
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredCats, setFilteredCats] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSom, setIsSom] = useState(false);

  const employeeOptions = useMemo(() => {
    if (!employees) return [];

    return employees.map((employee) => ({
      clientName: employee.fullName,
      clientID: employee.user_id,
    }));
  }, [employees]);
  // ===============================================
  const getTaskListAxios = async () => {
    try {
      const response = await axiosInstance.post("/task/all_tasks", {
        pageNum: currentPageNumber,
      });

      console.log(response.data.response);
      response.data.response.Tasks &&
        setTotalTasksData((prevData) => [
          ...prevData,
          ...response.data.response.Tasks,
        ]);
      setTotalPages(response.data.response.total_pages);
      setCurrentPageNumber((prevPageNum) => prevPageNum + 1);
      setIsSom(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setErrorItself(error);
    }
  };

  const getFilteredTaskListAxios = async (e) => {
    e?.preventDefault();
    window.scrollTo(0, 0);
    setCurrentFilteredPageNumber(1);
    setFilteredCats([]);
    setIsFiltered(true);
    setIsFilterPopupActive(false);

    const formdata = new FormData();

    if (assignedEmployeeID) {
      formdata.append("userID", assignedEmployeeID.value);
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
      const response = await axiosInstance.post("/task/all_tasks", formdata);
      setCurrentFilteredPageNumber((prevNum) => prevNum + 1);
      setFilteredTotalTasksData(response.data.response.Tasks);
      setFilteredTotalPages(response.data.response.total_pages);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  // ===============================================

  const getEmployees = async () => {
    try {
      const response = await axiosInstance.post("/user/get_employees", {
        taskID: 1,
      });
      setEmployees(response.data.response);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    }
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
      const response = await axiosInstance.post("/task/all_tasks", formdata);
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

  const handleScroll = useCallback(() => {
    console.log("fired");
    if (
      !isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      isSom
    ) {
      getTaskListAxios();
    } else if (
      isFiltered &&
      document.documentElement.offsetHeight -
        window.innerHeight -
        document.documentElement.scrollTop <
        1 &&
      isSom
    ) {
      getAutoFilteredTaskListAxios();
    }
  }, [isFiltered, isSom]);
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
    getEmployees();
  }, []);
  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/");
    }
    if (!isFiltered) {
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
  useEffect(() => {
    if (location.state) {
      setAssignedEmployeeID(location.state);
      setIsFiltered(true);
      //location.state = null;
    }
  }, []);

  useEffect(() => {
    isReady && !isLoading && !hasAccess && navigate("/unauthorized");
  }, [isLoading]);

  Loading.remove();
  return (
    <>
      {isLoading && Loading.standard("در حال دریافت اطلاعات")}
      {!isLoading &&
        (!isError ? (
          <div className="container px-3 mb-100" dir="rtl">
            {isFilterPopupActive && (
              <>
                <FilterPopup
                  setIsFilterPopupActive={setIsFilterPopupActive}
                  clientsList={employeeOptions}
                  handleStartDateChange={handleStartDateChange}
                  handleEndDateChange={handleEndDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  handleFilter={getFilteredTaskListAxios}
                  clientName={assignedEmployeeID}
                  setClientName={setAssignedEmployeeID}
                  setIsSubmitted={setIsSubmitted}
                  renderedFrom={"AllTasksLoader"}
                />
                <PopupBackground
                  isPopupActive={setIsFilterPopupActive}
                  handleStartDateChange={handleStartDateChange}
                  handleEndDateChange={handleEndDateChange}
                  setStatusField={setAssignedEmployeeID}
                />
              </>
            )}
            {isDirect === undefined && (
              <SingleHeader
                title={"لیست وظیفه ها"}
                location={location?.state?.location}
              />
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
                (totalTasksData.length ? (
                  totalTasksData.map((task, index) => {
                    return <ClientAssignedCard key={index} order={task} />;
                  })
                ) : (
                  <Message>موردی یافت نشد</Message>
                ))}
              {isFiltered &&
                (filteredTotalTasksData?.length ? (
                  filteredTotalTasksData.map((task, index) => {
                    return <ClientAssignedCard key={index} order={task} />;
                  })
                ) : (
                  <Message>موردی یافت نشد</Message>
                ))}
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
        ) : (
          <ErrorPage error={errorItself} />
        ))}
    </>
  );
};

export default AllTasksLoader;

{
  /* <div className="rounded-5 p-4 mt-3 bg-white">
        <Skeleton
          width={"30%"}
          inline={true}
          height={40}
          style={{ marginLeft: "0.5rem" }}
        />
        <Skeleton
          width={60}
          inline={true}
          circle={true}
          height={60}
          style={{ float: "left" }}
        />
        <Skeleton
          width={"80%"}
          height={20}
          borderRadius={"1rem"}
          style={{ marginBottom: "2rem" }}
        />
        <Skeleton height={60} style={{ marginBottom: "0.3rem" }} />
      </div> */
}

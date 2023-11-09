import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import Calendar30C from "../assets/svg-icons/Calendar30C";
import EmployeeCard from "./EmployeeCard";
import FilterDatePopup from "./FilterDatePopup";
import PopupBackground from "./PopupBackground";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import fetchData from "../util-functions/fetchData";
import usePredefinedDats from "../micro-components/usePredefinedDates";
import moment from "moment-jalaali";
const PerformanceReport = () => {
  const accessToken = window.localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const {
    ts,
    tsu,
    te,
    teu,
    ys,
    ysu,
    ye,
    yeu,
    tms,
    tmsu,
    pms,
    pmsu,
    pme,
    pmeu,
    tws,
    twsu,
    pws,
    pwsu,
    pwe,
    pweu,
    tys,
    tysu,
    pys,
    pysu,
    pye,
    pyeu,
  } = usePredefinedDats();
  const [isFilterPopupActive, setIsFilterPopupActive] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startDateFront, setStartDateFront] = useState();
  const [endDateFront, setEndtDateFront] = useState();

  const busiestEmployeeCards = [
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیانی",
      employeeID: 6969,
      doneTasks: 12,
      assignedTasks: 14,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قناتیفر",
      employeeID: 6968,
      doneTasks: 11,
      assignedTasks: 13,
    },
    {
      employeeAvatar:
        "https://samane.zbbo.net/wp-content/uploads/2023/07/IMG_5593.jpeg",
      employeeName: "علی قنات لو",
      employeeID: 6967,
      doneTasks: 10,
      assignedTasks: 12,
    },
  ];

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
  const URL = "123";
  const getNewFilteredData = async (event) => {
    Loading.standard("در حال دریافت اطلاعات");
    event?.preventDefault();
    window.scrollTo(0, 0);
    setIsFilterPopupActive(false);
    const filterHeader = new Headers();
    filterHeader.append("Authorization", `Bearer ${accessToken}`);
    const filterFormdata = new FormData();
    if (typeof startDate === "object") {
      filterFormdata.append("startDate", startDate?.toUnix());
      filterFormdata.append("endDate", endDate?.toUnix());
      setStartDateFront(moment.unix(startDate?.toUnix()).format("jYYYY/jM/jD"));
      setEndtDateFront(moment.unix(endDate?.toUnix()).format("jYYYY/jM/jD"));
    } else {
      filterFormdata.append("startDate", startDate);
      filterFormdata.append("endDate", endDate);
    }

    const filterRequestOptions = {
      method: "POST",
      headers: filterHeader,
      body: filterFormdata,
      redirect: "follow",
    };

    const response = await fetchData(URL, filterRequestOptions);
    Loading.remove();
    console.log(response);
    console.log(startDate);
    // console.log(startDate.toUnix());
    console.log(endDate);
  };
  const RedirectToAllEmployess = () => {
    navigate("/allEmployees");
  };
  const setPredefinedDate = (pDateCode) => {
    console.log(pDateCode);
    switch (pDateCode) {
      case "امروز":
        setStartDate(tsu);
        setEndDate(teu);
        setStartDateFront(ts);
        setEndtDateFront(ts);
        break;
      case "دیروز":
        setStartDate(ysu);
        setEndDate(yeu);
        setStartDateFront(ys);
        setEndtDateFront(ys);
        break;
      case "هفته جاری":
        setStartDate(twsu);
        setEndDate(teu);
        setStartDateFront(tws);
        setEndtDateFront(te);
        break;
      case "هفته پیش":
        setStartDate(pwsu);
        setEndDate(pweu);
        setStartDateFront(pws);
        setEndtDateFront(pwe);
        break;
      case "ماه جاری":
        setStartDate(tmsu);
        setEndDate(teu);
        setStartDateFront(tms);
        setEndtDateFront(te);
        break;
      case "ماه پیش":
        setStartDate(pmsu);
        setEndDate(pmeu);
        setStartDateFront(pms);
        setEndtDateFront(pme);
        break;
      case "سال جاری":
        setStartDate(tysu);
        setEndDate(teu);
        setStartDateFront(tys);
        setEndtDateFront(te);
        break;
      case "سال پیش":
        setStartDate(pysu);
        setEndDate(pyeu);
        setStartDateFront(pys);
        setEndtDateFront(pye);
        break;
    }
  };

  useEffect(() => {
    setStartDateFront(tms);
    setEndtDateFront(te);
  }, [te, tms]);

  console.log(startDate);
  console.log(endDate);
  console.log(startDateFront);
  console.log(endDateFront);

  return (
    <div className="container px-3" dir="rtl">
      {isFilterPopupActive && (
        <>
          <FilterDatePopup
            setIsFilterPopupActive={setIsFilterPopupActive}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            startDate={startDate}
            endDate={endDate}
            handleFilter={getNewFilteredData}
            setPredefinedDate={setPredefinedDate}
          />
          <PopupBackground
            isPopupActive={setIsFilterPopupActive}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            setStatusField={() => {}}
          />
        </>
      )}
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2">
        <div className="bold-xlarge">گزارش کارکرد</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <div className="mt-2">
        <div
          className="d-flex align-items-center bg-white rounded-5 p-3 mb-4 has-pointer"
          onClick={() => setIsFilterPopupActive(true)}
        >
          <span className="flex-grow-1">
            <span className="ms-4">
              <span className="lgrey-default-bold ms-2">از</span>
              <span className="bold-large">{startDateFront}</span>
            </span>
            <span>
              <span className="lgrey-default-bold ms-2">تا</span>
              <span className="bold-large">{endDateFront}</span>
            </span>
          </span>
          <span className="has-pointer">
            <Calendar30C />
          </span>
        </div>
        <div className="mb-4">
          <div className="me-3 mb-3">
            <span className="bold-xlarge">پر‌مشغله‌ترین کارمندان </span>
            <span className="grey-thin-bold">(بیشترین عهده‌داری)</span>
          </div>
          <div>
            {busiestEmployeeCards.map((employee, index) => {
              return <EmployeeCard employee={employee} key={index} />;
            })}
          </div>
          <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3 has-pointer">
            <span
              className="btn-royal-bold rounded-pill flex-grow-1 py-3 text-center"
              onClick={RedirectToAllEmployess}
            >
              مشاهده کل کارمندان
            </span>
          </div>
        </div>
        <div>
          <div className="me-3 mb-3">
            <span className="bold-xlarge">پر‌کارترین کارمندان </span>
            <span className="grey-thin-bold">(بیشترین اتمام وظیفه)</span>
          </div>
          <div>
            {busiestEmployeeCards.map((employee, index) => {
              return <EmployeeCard employee={employee} key={index} />;
            })}
          </div>
          <div className="d-flex justify-content-between align-items-center px-1 py-2 mt-3 has-pointer">
            <span
              className="btn-royal-bold rounded-pill flex-grow-1 py-3 text-center"
              onClick={RedirectToAllEmployess}
            >
              مشاهده کل کارمندان
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReport;

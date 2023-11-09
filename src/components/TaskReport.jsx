import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import moment from "moment-jalaali";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import Calendar30C from "../assets/svg-icons/Calendar30C";
import FilterDatePopup from "./FilterDatePopup";
import PopupBackground from "./PopupBackground";
import usePredefinedDats from "../micro-components/usePredefinedDates";
import fetchData from "../util-functions/fetchData";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const TaskReport = () => {
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

  useEffect(() => {
    setStartDateFront(tms);
    setEndtDateFront(te);
  }, [te, tms]);
  // ----------------------------------------------------------------

  // ----------------------------------------------------------------

  const data = [
    {
      name: "انجام شده",
      value: parseInt("40"),
    },
    {
      name: "در انتظار",
      value: parseInt("10"),
    },
    {
      name: "در حال انجام",
      value: parseInt("30"),
    },
  ];
  // const p = (parseInt("40") / (parseInt("40") + parseInt("60"))) * 100;

  // const roundedNum = useMathRound(p);
  // console.log(roundedNum);
  const COLORS = ["var(--green)", "var(--gray)", "var(--yellow)"];

  // ----------------------------------------------------------------
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
      <header className="d-flex bg-default rounded-bottom-5 align-items-center justify-content-between position-sticky top-0 py-3 mt-2 ">
        <div className="bold-xlarge">گزارش وظایف</div>
        <Link to="/">
          <BackArrow />
        </Link>
      </header>
      <div
        className="d-flex align-items-center bg-white rounded-5 p-3 mb-4 has-pointer mt-2"
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
      <div className="bg-white rounded-5 p-3 mb-3">
        <div className=" p-3">
          <span className="bold-xlarge">گزارش کلی</span>
        </div>
        <ResponsiveContainer
          width="100%"
          height="85%"
          aspect={1.3}
          style={{ pointerEvents: "none" }}
        >
          <PieChart width={"100%"}>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="middle"
              align="right"
              height={36}
              layout="vertical"
              wrapperStyle={{
                direction: "ltr",
                top: "42%",
                height: "auto",
                right: 0,
                color: "#000",
                fontWeight: "var(--font-bold)",
                fontSize: "14px",
              }}
              iconType="square"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-5 py-4 px-5 d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex flex-column align-items-center ">
          <span className="dborder-thin-ulgrey royal-xlarge-bold pb-2 mb-2">
            کل
          </span>
          <span className="grey-xlarge-bold">100</span>
        </div>
        <div className="d-flex flex-column align-items-center ">
          <span className="dborder-thin-ulgrey royal-xlarge-bold pb-2 mb-2">
            ثابت
          </span>
          <span className="grey-xlarge-bold">30</span>
        </div>
        <div className="d-flex flex-column align-items-center ">
          <span className="dborder-thin-ulgrey royal-xlarge-bold pb-2 mb-2">
            متحرک
          </span>
          <span className="grey-xlarge-bold">70</span>
        </div>
      </div>
      <div className="bg-white rounded-5 p-4 d-flex flex-column gap-3 mb-3">
        <div>
          <span className="bold-xlarge">وضعیت دپارتمان ها</span>
        </div>
        <div className="table-container">
          <table className="task-report-table">
            <thead>
              <tr>
                <th className="bg-white"></th>
                <th className="royal-default-bold500">انجام شده</th>
                <th className="royal-default-bold500">در حال انجام</th>
                <th className="royal-default-bold500">درانتظار</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="bg-ulroyal royal-default-bold500">ثابت</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
              </tr>
              <tr className="">
                <td className="bg-ulroyal royal-default-bold500">متحرک</td>
                <td>20</td>
                <td>20</td>
                <td>20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          <span className="bold-xlarge pe-2">لیست وظیفه‌ها</span>
        </div>
      </div>
    </div>
  );
};

export default TaskReport;

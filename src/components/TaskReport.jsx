import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../assets/svg-icons/BackArrow";
import moment from "moment-jalaali";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import Calendar30C from "../assets/svg-icons/Calendar30C";
import FilterDatePopup from "./FilterDatePopup";
import PopupBackground from "./PopupBackground";
import usePredefinedDats from "../micro-components/usePredefinedDates";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";
import ClientAssignedCard from "./ClientAssignedCard";
import SingleHeader from "./SingleHeader";

const TaskReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const [reportData, setReportData] = useState();

  const Report = {
    data: {
      response: {
        generalReport: { done: 10, ongoing: 15, pending: 20 },
        departmentTasks: { fixed: 10, mobile: 15, total: 25 },
        departmentDetail: {
          fixed: { done: 10, ongoing: 15, pending: 20 },
          mobile: { done: 20, ongoing: 25, pending: 45 },
        },
        cards: [
          {
            taskID: 454,
            taskType: "Direct Implant PFZ",
            client: "دکتر نسیم  خسرونژاد",
            date: "1402-8-18",
            step: "گچ",
            percentage: 4,
            patientFullName: "نیما  ولی نژاد",
          },
          {
            taskID: 454,
            taskType: "Direct Implant PFZ",
            client: "دکتر نسیم  خسرونژاد",
            date: "1402-8-18",
            step: "گچ",
            percentage: 4,
            patientFullName: "نیما  ولی نژاد",
          },
        ],
      },
    },
  };

  const [isLoading, setIsLoading] = useState(true);
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
    const formdata = new FormData();
    if (typeof startDate === "object") {
      formdata.append("startDate", startDate?.toUnix());
      formdata.append("endDate", endDate?.toUnix());
      setStartDateFront(moment.unix(startDate?.toUnix()).format("jYYYY/jM/jD"));
      setEndtDateFront(moment.unix(endDate?.toUnix()).format("jYYYY/jM/jD"));
    } else {
      formdata.append("startDate", startDate);
      formdata.append("endDate", endDate);
    }
    try {
      console.log(startDate);
      console.log(endDate);
      const response = await axiosInstance.post(
        "/activity/task-report",
        formdata
      );
      setReportData(response.data.response);
      Loading.remove();
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };
  const getReportData = async () => {
    console.log(startDate);
    console.log(endDate);
    try {
      Loading.standard("در حال دریافت اطلاعات");
      const response = await axiosInstance.post("/activity/task-report", {
        startDate,
        endDate,
      });
      // const response = {
      //   data: {
      //     response: {
      //       generalReport: { done: 10, ongoing: 15, pending: 20 },
      //       departmentTasks: { fixed: 10, mobile: 15, total: 25 },
      //       departmentDetail: {
      //         fixed: { done: 10, ongoing: 15, pending: 20 },
      //         mobile: { done: 20, ongoing: 25, pending: 45 },
      //       },
      //       cards: [
      //         {
      //           taskID: 454,
      //           taskType: "Direct Implant PFZ",
      //           client: "دکتر نسیم  خسرونژاد",
      //           date: "1402-8-18",
      //           step: "گچ",
      //           percentage: 4,
      //           patientFullName: "نیما  ولی نژاد",
      //         },
      //         {
      //           taskID: 454,
      //           taskType: "Direct Implant PFZ",
      //           client: "دکتر نسیم  خسرونژاد",
      //           date: "1402-8-18",
      //           step: "گچ",
      //           percentage: 4,
      //           patientFullName: "نیما  ولی نژاد",
      //         },
      //       ],
      //     },
      //   },
      // };
      setReportData(response.data.response);
      console.log(response.data.response);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  useEffect(() => {
    if (!isLoading) {
      !isPManager && navigate("/unauthorized");
    }
  }, [isPManager]);
  useEffect(() => {
    if (window.localStorage.getItem("AccessToken") === null) {
      navigate("/login");
    } else {
      getUser();
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      console.log("fired");
      getReportData();
    }
  }, [isLoading]);
  useEffect(() => {
    setStartDateFront(tms);
    setEndtDateFront(te);
    setStartDate(tmsu);
    setEndDate(teu);
  }, [te, tms]);

  // ----------------------------------------------------------------

  // ----------------------------------------------------------------

  const data = useMemo(() => {
    console.log("fired");
    return [
      {
        name: "انجام شده",
        value: +reportData?.generalReport.done,
      },
      {
        name: "در انتظار",
        value: +reportData?.generalReport.pending,
      },
      {
        name: "در حال انجام",
        value: +reportData?.generalReport.ongoing,
      },
    ];
  }, [reportData]);
  const COLORS = useMemo(() => {
    return ["var(--green)", "var(--gray)", "var(--yellow)"];
  }, []);

  // ----------------------------------------------------------------

  return (
    <div className="container px-3 mt-100" dir="rtl">
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
      <SingleHeader title={"گزارش وظایف"} location={location.state} />
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
          <span className="grey-xlarge-bold">
            {reportData?.departmentTasks.total}
          </span>
        </div>
        <div className="d-flex flex-column align-items-center ">
          <span className="dborder-thin-ulgrey royal-xlarge-bold pb-2 mb-2">
            ثابت
          </span>
          <span className="grey-xlarge-bold">
            {reportData?.departmentTasks.fixed}
          </span>
        </div>
        <div className="d-flex flex-column align-items-center ">
          <span className="dborder-thin-ulgrey royal-xlarge-bold pb-2 mb-2">
            متحرک
          </span>
          <span className="grey-xlarge-bold">
            {reportData?.departmentTasks.mobile}
          </span>
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
                <td>{reportData?.departmentDetail.fixed.done}</td>
                <td>{reportData?.departmentDetail.fixed.ongoing}</td>
                <td>{reportData?.departmentDetail.fixed.pending}</td>
              </tr>
              <tr className="">
                <td className="bg-ulroyal royal-default-bold500">متحرک</td>
                <td>{reportData?.departmentDetail.mobile.done}</td>
                <td>{reportData?.departmentDetail.mobile.ongoing}</td>
                <td>{reportData?.departmentDetail.mobile.pending}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div>
          <span className="bold-xlarge pe-2">لیست وظیفه‌ها</span>
          {reportData?.cards.map((card, index) => {
            return <ClientAssignedCard key={index} order={card} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskReport;

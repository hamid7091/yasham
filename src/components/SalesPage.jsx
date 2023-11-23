import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePredefinedDats from "../micro-components/usePredefinedDates";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import moment from "moment-jalaali";
import fetchData from "../util-functions/fetchData";
import FilterDatePopup from "./FilterDatePopup";
import PopupBackground from "./PopupBackground";
import Calendar30C from "../assets/svg-icons/Calendar30C";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ClientTaskCard from "./ClientTaskCard";
import Message from "../micro-components/Message";
import axiosInstance from "../util-functions/axiosInstance";
import useRoleSetter from "../micro-components/useRoleSetter";

const SalesPage = () => {
  const mockResponse = {
    data: {
      response: {
        salesReport: {
          count: 15,
          income: 2500000,
          profit: 1500000,
        },
        chartData: [
          {
            date: "08/01",
            sale: 120000,
          },
          {
            date: "08/02",
            sale: 180000,
          },
          {
            date: "08/03",
            sale: 100000,
          },
          {
            date: "08/04",
            sale: 150000,
          },
          {
            date: "08/05",
            sale: 190000,
          },
          {
            date: "08/06",
            sale: 170000,
          },
          {
            date: "08/07",
            sale: 195000,
          },
          {
            date: "08/08",
            sale: 250000,
          },
          {
            date: "08/09",
            sale: 350000,
          },
          {
            date: "08/10",
            sale: 20,
          },
          {
            date: "08/11",
            sale: 450000,
          },
          {
            date: "08/12",
            sale: 230000,
          },
          {
            date: "08/13",
            sale: 125000,
          },
          {
            date: "08/14",
            sale: 135000,
          },
          {
            date: "08/15",
            sale: 145000,
          },
          {
            date: "08/16",
            sale: 120000,
          },
          {
            date: "08/17",
            sale: 50000,
          },
          {
            date: "08/18",
            sale: 20,
          },
          {
            date: "08/19",
            sale: 650000,
          },
          {
            date: "08/20",
            sale: 352000,
          },
          {
            date: "08/21",
            sale: 685000,
          },
          {
            date: "08/22",
            sale: 124000,
          },
          {
            date: "08/23",
            sale: 368000,
          },
          {
            date: "08/24",
            sale: 754000,
          },
          {
            date: "08/25",
            sale: 365000,
          },
          {
            date: "08/26",
            sale: 20,
          },
          {
            date: "08/27",
            sale: 124000,
          },
          {
            date: "08/28",
            sale: 354000,
          },
          {
            date: "08/29",
            sale: 496000,
          },
          {
            date: "08/30",
            sale: 321000,
          },
        ],
        orderTypeData: [
          { taskType: "PFZ", count: 12, income: 235000 },
          { taskType: "ایمپلنت", count: 8, income: 135000 },
          { taskType: "PFM", count: 5, income: 120000 },
        ],
        departmentReport: {
          fixed: {
            all: 25,
            income: 2500000,
            profit: 1500000,
          },
          mobile: {
            all: 35,
            income: 4500000,
            profit: 2500000,
          },
        },
        orders: [
          {
            orderID: 123456,
            patientName: "حمید قهرمانی",
            date: "1402-06-12",
            price: 250000,
            invoiceStatus: "1",
            invoiceID: "35",
          },
        ],
      },
    },
  };

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

  const [salesReport, setSalesReport] = useState();
  const [chartData, setChartData] = useState();
  const [orderTypeData, setOrderTypeData] = useState();
  const [departmentReport, setDepartmentReport] = useState();
  const [orders, setOrders] = useState();

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
        setEndtDateFront(ye);
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

  const getSaleData = async (event) => {
    console.log(startDate, endDate);
    event?.preventDefault();
    const formdata = new FormData();
    window.scrollTo(0, 0);
    setIsFilterPopupActive(false);
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
      Loading.standard("در حال دریافت اطلاعات");
      // const response = await axiosInstance.post("/order/sale-report",formdata)
      const response = mockResponse;
      setSalesReport(response.data.response.salesReport);
      setChartData(response.data.response.chartData);
      setDepartmentReport(response.data.response.departmentReport);
      setOrderTypeData(response.data.response.orderTypeData);
      setOrders(response.data.response.orders);
      Loading.remove();
    } catch (error) {
      console.error(error);
      Loading.remove();
    }
  };

  // const getNewFilteredData = async (event) => {
  //   Loading.standard("در حال دریافت اطلاعات");
  //   event?.preventDefault();
  //   window.scrollTo(0, 0);
  //   setIsFilterPopupActive(false);
  //   const filterHeader = new Headers();
  //   filterHeader.append("Authorization", `Bearer ${accessToken}`);
  //   const filterFormdata = new FormData();
  //   if (typeof startDate === "object") {
  //     filterFormdata.append("startDate", startDate?.toUnix());
  //     filterFormdata.append("endDate", endDate?.toUnix());
  //     setStartDateFront(moment.unix(startDate?.toUnix()).format("jYYYY/jM/jD"));
  //     setEndtDateFront(moment.unix(endDate?.toUnix()).format("jYYYY/jM/jD"));
  //   } else {
  //     filterFormdata.append("startDate", startDate);
  //     filterFormdata.append("endDate", endDate);
  //   }

  //   const filterRequestOptions = {
  //     method: "POST",
  //     headers: filterHeader,
  //     body: filterFormdata,
  //     redirect: "follow",
  //   };

  //   // const response = await fetchData(URL, filterRequestOptions);
  //   const response = mockResponse;
  //   setSalesReport(response.salesReport);
  //   setChartData(response.chartData);
  //   setDepartmentReport(response.departmentReport);
  //   setOrderTypeData(response.orderTypeData);
  //   setOrders(response.orders);
  //   Loading.remove();

  //   console.log(response);
  //   console.log(startDate);
  //   // console.log(startDate.toUnix());
  //   console.log(endDate);
  // };

  useEffect(() => {
    setStartDateFront(tms);
    setEndtDateFront(te);
    setStartDate(tmsu);
    setEndDate(teu);
  }, [te, tms]);
  useEffect(() => {
    getSaleData();
    getUser();
  }, []);

  // console.log(departmentReport);

  return (
    salesReport && (
      <div className="px-3 mb-100">
        {isFilterPopupActive && (
          <>
            <FilterDatePopup
              setIsFilterPopupActive={setIsFilterPopupActive}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              startDate={startDate}
              endDate={endDate}
              handleFilter={getSaleData}
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
        <section
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
        </section>
        <section>
          <div className="bg-white rounded-5 p-4">
            <div className="mb-4">
              <span className="bold-xlarge">گزارش فروش</span>
            </div>
            <div className="d-flex align-items-center justify-content-between ">
              <div className="d-flex flex-column align-items-center ">
                <span className="royal-xlarge-bold ">تعداد</span>
                <span className="grey-xlarge-bold tborder-thin-ulgrey">
                  {salesReport.count}
                </span>
              </div>
              <div className="d-flex flex-column align-items-center ">
                <span className="royal-xlarge-bold ">درآمد</span>
                <span className="grey-xlarge-bold tborder-thin-ulgrey">
                  {salesReport.income / 1000000} میلیون
                </span>
              </div>
              <div className="d-flex flex-column align-items-center ">
                <span className="royal-xlarge-bold ">سود</span>
                <span className="grey-xlarge-bold tborder-thin-ulgrey">
                  {salesReport.profit / 1000000} میلیون
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="my-3">
          <div className="bg-white rounded-5 py-4 pe-4">
            <ResponsiveContainer
              width="100%"
              height="100%"
              aspect={1.5}
              style={{ pointerEvents: "none" }}
            >
              <BarChart width="100%" data={chartData}>
                {/* <CartesianGrid strokeDasharray="1 3" /> */}
                <XAxis
                  dataKey="date"
                  angle={90}
                  // minTickGap={1}
                  height={50}
                  tickMargin={20}
                />
                <YAxis tickMargin={38} />
                <Tooltip />
                {/* <Legend /> */}
                <Bar
                  dataKey="sale"
                  fill="var(--blue-royal)"
                  barSize={10}
                  background={true}

                  //   label={{ fill: "red", fontSize: 20 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section>
          <div className="bg-white rounded-5 p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <span className="bold-xlarge">بیشترین سفارش کار</span>
              {/* <span className="grey-thin-bold">مشاهده همه</span> */}
            </div>
            <div className="d-flex flex-column gap-3">
              {orderTypeData.map((data, index) => {
                return (
                  <div
                    className="d-flex align-items-center justify-content-between"
                    key={index}
                  >
                    <span className="d-flex align-items-center gap-1">
                      <span
                        className=""
                        style={{
                          width: "25px",
                          height: "25px",
                          background: "var(--blue-royal)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="bold-default">{data.taskType} : </span>
                      <span className="bold-default">{data.count} عدد</span>
                    </span>
                    <span className="lgrey-default-bold">
                      {data.income / 100000} میلیون
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="my-3">
          <div className="bg-white rounded-5 px-2 py-4">
            <div className=" pe-4 mb-4">
              <span className="bold-xlarge">گزارش دپارتمان‌ها</span>
            </div>
            <div className="table-container">
              <table className="task-report-table">
                <thead>
                  <tr>
                    <th className="bg-white"></th>
                    <th className="royal-default-bold500">تعداد</th>
                    <th className="royal-default-bold500">درآمد</th>
                    <th className="royal-default-bold500">سود</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="bg-ulroyal royal-default-bold500">ثابت</td>
                    <td>{departmentReport.fixed.all}</td>
                    <td>{departmentReport.fixed.income / 1000000} میلیون</td>
                    <td>{departmentReport.fixed.profit / 1000000} میلیون</td>
                  </tr>
                  <tr className="">
                    <td className="bg-ulroyal royal-default-bold500">متحرک</td>
                    <td>{departmentReport.mobile.all}</td>
                    <td>{departmentReport.mobile.income / 1000000} میلیون</td>
                    <td>{departmentReport.mobile.profit / 1000000} میلیون</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section>
          <div className="d-flex align-items-center justify-content-between px-4 pt-3">
            <span className="bold-xlarge">آخرین سفارشات</span>
            <Link to={"/orderList"}>
              <span className="grey-thin-bold">همه سفارشات</span>
            </Link>
          </div>
          {orders ? (
            orders.map((order, index) => {
              return (
                <ClientTaskCard
                  key={index}
                  order={order}
                  isClient={isClient}
                  isFManager={isFManager}
                />
              );
            })
          ) : (
            <Message>موردی یافت نشد</Message>
          )}
        </section>
      </div>
    )
  );
};

export default SalesPage;

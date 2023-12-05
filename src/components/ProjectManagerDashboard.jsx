import React, { PureComponent } from "react";
import LeftArrow from "../assets/svg-icons/LeftArrow";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useLocation, useNavigate } from "react-router-dom";

const ProjectManagerDashboard = ({
  dailyOrders,
  dailyTaskReport,
  employeeStatus,
  customerSatisfaction,
}) => {
  console.log(dailyOrders);
  console.log(dailyTaskReport);
  console.log(employeeStatus);
  console.log(customerSatisfaction);

  const navigate = useNavigate();
  const location = useLocation();
  // chart data -------------------------
  const RADIAN = Math.PI / 180;
  const data = [
    { name: "آرای زیر 2", value: 30, color: "var(--red)" },
    { name: "آرای بالای 2", value: 70, color: "var(--green)" },
  ];
  const cx = 60;
  const cy = 110;
  const iR = 50;
  const oR = 100;
  const value = customerSatisfaction?.rate * 20;
  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 1 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 90;
    const y0 = cy + 20;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle key={x0} cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        key={y0}
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />,
    ];
  };
  // chart data -------------------------

  const handleNavgate = () => {
    navigate("/orderList", {
      state: { searchToday: "searchToday" },
    });
  };
  const handleNavigationToAllTask = () => {
    const second = document.getElementById("second");
    second.click();
  };

  console.log(dailyOrders);
  console.log(dailyTaskReport);
  console.log(employeeStatus);
  console.log(customerSatisfaction);
  return (
    <div className="px-3 mb-100">
      <div>
        <div className="bg-white rounded-5 p-3 text-center dborder-thick-royal">
          <div className="mb-2">
            <span className="grey-xxlarge-bold">سفارشات امروز :</span>
            <span className="bold-xxlarge">{dailyOrders?.ordersCount}</span>
          </div>
          <span className="has-pointer" onClick={handleNavgate}>
            <span className="royal-large-bold ms-2">مشاهده سفارشات</span>
            <span>
              <LeftArrow />
            </span>
          </span>
        </div>
      </div>
      <hr className="my-4" />
      <div>
        <div className="bg-white rounded-5 p-3 text-center">
          <div className="d-flex align-items-center justify-content-between mb-4 px-4">
            <span className="bold-xlarge">گزارش وظایف امروز</span>
            <span
              className="grey-thin-bold has-pointer"
              onClick={handleNavigationToAllTask}
            >
              مشاهده همه
            </span>
          </div>
          <div className="d-flex align-items-center gap-4 justify-content-center">
            <div className="d-flex flex-column">
              <span className="royal-xlarge-bold dborder-thin-ulgrey">
                در انتظار
              </span>
              <span className="grey-xlarge-bold">
                {dailyTaskReport?.pending}
              </span>
            </div>
            <div className="d-flex flex-column">
              <span className="royal-xlarge-bold dborder-thin-ulgrey">
                در حال انجام
              </span>
              <span className="grey-xlarge-bold">
                {dailyTaskReport?.ongoing}
              </span>
            </div>
            <div className="d-flex flex-column">
              <span className="royal-xlarge-bold dborder-thin-ulgrey">
                انجام شده{" "}
              </span>
              <span className="grey-xlarge-bold">{dailyTaskReport?.done}</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4 px-4">
          <span className="bold-xlarge">وضعیت کارمندان</span>
          <span
            className="grey-thin-bold has-pointer"
            onClick={() => {
              navigate("/allEmployees");
            }}
          >
            مشاهده همه
          </span>
        </div>
        <div
          className="bg-white rounded-pill p-4 drop-shadow mb-3"
          // DO NOT DELETE
          // onClick={() => {
          //   navigate("/allEmployees", {
          //     state: employeeStatus?.busiestEmployee,
          //   });
          // }}
        >
          <span className="royal-large">پر مشغله ترین فرد </span>
          <span className="grey-large-bold500">
            {employeeStatus?.busiestEmployee.employeeName}
          </span>
        </div>
        <div
          className="bg-white rounded-pill p-4 drop-shadow"
          // DO NOT DELETE
          // onClick={() => {
          //   navigate("/allEmployees", {
          //     state: employeeStatus?.mostHardworkingEmployee,
          //   });
          // }}
        >
          <span className="royal-large">پرکارترین فرد </span>
          <span className="grey-large-bold500">
            {employeeStatus?.mostHardworkingEmployee.employeeName}
          </span>
        </div>
      </div>
      {/* DO NOT DELETE */}
      {/* <hr className="my-4" />
      <div>
        <div className="bg-white p-3 rounded-5">
          <div className="d-flex align-items-center justify-content-between mb-4 px-4">
            <span className="bold-xlarge">رضایت‌مندی مشتریان</span>
            <span className="grey-thin-bold has-pointer">مشاهده همه</span>
          </div>
          <div>
            <ResponsiveContainer
              width="100%"
              height="80%"
              aspect={2.1}
              style={{ pointerEvents: "none" }}
            >
              <PieChart width={"100%"}>
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={data}
                  //   cx={cx}
                  cy={cy}
                  innerRadius={iR}
                  outerRadius={oR}
                  fill="#8884d8"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="top"
                  align="middle"
                  layout="horizontal"
                  wrapperStyle={{
                    direction: "ltr",
                    display: "flex",
                    justifyContent: "center",
                    height: "auto",
                    color: "#000",
                    fontWeight: "var(--font-bold)",
                    fontSize: "14px",
                  }}
                  iconType="square"
                />
                {needle(value, data, cx, cy, iR, oR, "var(--gray-light)")}
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center">
            <span className="royal-xxlarge-bold500">
              {customerSatisfaction?.rate}
            </span>
          </div>
          <div className="text-center">
            <span className="grey-default-thin">از 600 رای ثبت شده</span>
          </div>
        </div>
      </div> */}
      {/* DO NOT DELETE */}
    </div>
  );
};

export default ProjectManagerDashboard;

import moment from "moment-jalaali";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FinancialManagerDashboard = ({
  dailyOrders,
  financialBusinessInfo,
  financialWeelyChartData,
}) => {
  const navigate = useNavigate();

  const dateArray = Object.keys(financialWeelyChartData);
  const saleArray = Object.values(financialWeelyChartData);

  const jDateArray = [];
  dateArray.forEach((date) => {
    const jDate = moment(date, "YYYY-MM-DD").format("jMM/jDD");
    jDateArray.push(jDate);
  });
  console.log(jDateArray);

  const desiredDataFormat = [];
  jDateArray.forEach((date, index) => {
    desiredDataFormat.push({
      date: date,
      sale: saleArray[index],
    });
  });

  console.log(desiredDataFormat);

  return (
    <div className="container px-3 mb-100" dir="rtl">
      <section className="mb-3">
        <div className="bg-white rounded-5 p-3">
          <table className="task-report-table">
            <thead>
              <tr>
                <th className="royal-default-bold500">سفارشات امروز</th>
                <th className="royal-default-bold500">درآمد امروز</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td>{dailyOrders.ordersCount} عدد</td>
                <td>{dailyOrders.dailyIncome / 1000000} میلیون</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <hr />
      <section className="mb-3">
        <div className="bg-white rounded-5 p-3">
          <div className="bold-xlarge mb-3 p-2">فروش هفته جاری</div>
          <div>
            <ResponsiveContainer
              width="100%"
              height="100%"
              aspect={1.5}
              style={{ pointerEvents: "none" }}
            >
              <BarChart width="100%" data={desiredDataFormat}>
                {/* <CartesianGrid strokeDasharray="1 3" /> */}
                <XAxis
                  dataKey="date"
                  angle={90}
                  padding={{ left: 15 }}
                  tickLine={false}
                  // minTickGap={1}
                  height={50}
                  tickMargin={20}
                />
                <YAxis tickMargin={35} />
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
        </div>
      </section>
      <hr />
      <section>
        <div className="d-flex justify-content-between px-1 mb-3">
          <div>
            <span className="bold-xlarge">وضعیت کسب و کارها</span>
          </div>
          <div>
            <span
              className="grey-thin-bold has-pointer"
              onClick={() => navigate("/allBusinesses")}
            >
              مشاهده همه
            </span>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center justify-content-between bg-white rounded-pill p-4 mb-3">
            <div>
              <span className="royal-large">بیشترین سود </span>
              <span className="grey-large-bold500">
                {financialBusinessInfo.mostProfit.businessName}
              </span>
            </div>
            <div>
              <span className="lgrey-default-bold">
                {financialBusinessInfo.mostProfit.value} تومان
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between bg-white rounded-pill p-4 mb-3">
            <div>
              <span className="royal-large">بیشترین سفارش </span>
              <span className="grey-large-bold500">
                {financialBusinessInfo.mostOrders.businessName}
              </span>
            </div>
            <div>
              <span className="lgrey-default-bold">
                {financialBusinessInfo.mostOrders.value} عدد
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between bg-white rounded-pill p-4 mb-3">
            <div>
              <span className="royal-large">بدهکارترین </span>
              <span className="grey-large-bold500">
                {financialBusinessInfo.mostDebt.businessName}
              </span>
            </div>
            <div>
              <span className="lgrey-default-bold">
                {financialBusinessInfo.mostDebt.value} سفارش
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialManagerDashboard;

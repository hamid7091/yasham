import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import InventoryItemCard from "./InventoryItemCard";
import { Popover, ArrowContainer } from "react-tiny-popover";
import QuestionIcon from "../assets/svg-icons/QuestionIcon";
import useMathRound from "../micro-components/UseMathRound";

const InventoryDashboard = ({ dashboardData, setLocation }) => {
  console.log(dashboardData);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const data = [
    {
      name: "موجودی کافی",
      value: parseInt(dashboardData.overallStockStatus.sufficient),
    },
    {
      name: "رو به اتمام",
      value: parseInt(dashboardData.overallStockStatus.inSufficient),
    },
  ];
  const p =
    (parseInt(dashboardData.overallStockStatus.inSufficient) /
      (parseInt(dashboardData.overallStockStatus.sufficient) +
        parseInt(dashboardData.overallStockStatus.inSufficient))) *
    100;
  console.log(p);

  const roundedNum = useMathRound(p);
  console.log(roundedNum);
  const COLORS = ["var(--green)", "var(--red-l)"];

  return (
    <div className="mt-3 mb-100 px-3">
      <div className="bg-white rounded-5 p-4">
        <div className="d-flex align-items-center gap-3">
          <span className="bold-xlarge">موجودی انبار</span>
          <Popover
            isOpen={isPopoverOpen}
            positions={["bottom", "top"]}
            containerStyle={{
              maxWidth: "576px",
            }}
            onClickOutside={() => {
              setIsPopoverOpen(!isPopoverOpen);
            }}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={"rgba(0,0,0,0.75"}
                arrowSize={10}
                arrowStyle={{ opacity: 0.7 }}
                className="popover-arrow-container"
                arrowClassName="popover-arrow"
              >
                <p
                  className="p-2 rounded-1"
                  style={{
                    border: "2px solid #000",
                    backgroundColor: "#000",
                    opacity: "0.75",
                    color: "#fff",
                  }}
                >
                  اعداد تعداد آیتم های انبار است
                </p>
              </ArrowContainer>
            )}
          >
            <span
              className="has-pointer"
              onClick={() => {
                setIsPopoverOpen(!isPopoverOpen);
              }}
            >
              <QuestionIcon />
            </span>
          </Popover>
        </div>
        <ResponsiveContainer
          width="100%"
          // height="85%"
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
        <div className="text-center">
          <span className="grey-default-bold500">
            موجودی {roundedNum.roundedNum} درصد از انبار روبه اتمام است
          </span>
        </div>
      </div>
      <hr />
      <div className="d-flex align-items-center justify-content-between mt-4 px-2 mb-2">
        <span className="bold-xlarge">آیتم‌های رو به اتمام</span>
        <span
          className="grey-thin-bold has-pointer"
          onClick={() => {
            const second = document.getElementById("second");
            second.click();
          }}
        >
          همه محصولات
        </span>
      </div>
      {dashboardData.inSufficientStocks.map((data, index) => {
        return <InventoryItemCard key={index} data={data} />;
      })}
    </div>
  );
};

export default InventoryDashboard;

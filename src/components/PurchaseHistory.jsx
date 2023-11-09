import React from "react";
import RestockCard from "./RestockCard";

const PurchaseHistory = ({ data, unit }) => {
  console.log(data);
  return (
    <div className="pb-3">
      {data.map((item, index) => {
        return <RestockCard key={index} data={item} unit={unit} />;
      })}
    </div>
  );
};

export default PurchaseHistory;

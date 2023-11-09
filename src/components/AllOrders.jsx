import React from "react";
import HistoryCard from "./HistoryCard";

const AllOrders = ({ orderData }) => {
  console.log(orderData);

  return (
    orderData && (
      <div className="mt-3 mb-100">
        {orderData.map((order, index) => (
          <HistoryCard key={index} order={order} />
        ))}
      </div>
    )
  );
};

export default AllOrders;

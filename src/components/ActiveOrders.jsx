import React from "react";
import HistoryCard from "./HistoryCard";
import Message from "../micro-components/Message";

const ActiveOrders = ({ orderData }) => {
  console.log(orderData);
  const activeOrders = orderData.filter((order) => order.status === "active");
  return orderData ? (
    <div className="mt-3">
      {activeOrders.map((order, index) => (
        <HistoryCard key={index} order={order} />
      ))}
    </div>
  ) : (
    <Message>سفارش فعال وجود ندارد</Message>
  );
};

export default ActiveOrders;

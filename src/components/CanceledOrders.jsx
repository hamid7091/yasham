import React from "react";
import HistoryCard from "./HistoryCard";
import Message from "../micro-components/Message";

const CanceledOrders = ({ orderData }) => {
  console.log(orderData);
  const canceledOrders = orderData.filter(
    (order) => order.status === "canceled"
  );
  return canceledOrders.length > 0 ? (
    <div className="mt-3">
      {canceledOrders.map((order, index) => (
        <HistoryCard key={index} order={order} />
      ))}
    </div>
  ) : (
    <Message>سفارشی لغو نشده است</Message>
  );
};

export default CanceledOrders;

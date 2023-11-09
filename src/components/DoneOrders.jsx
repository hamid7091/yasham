import React from "react";
import HistoryCard from "./HistoryCard";
import Message from "../micro-components/Message";

const DoneOrders = ({ orderData }) => {
  console.log(orderData);
  const finishedOrders = orderData.filter((order) => order.status === "done");
  console.log(finishedOrders);
  return finishedOrders.length > 0 ? (
    <div className="mt-3">
      {finishedOrders.map((order, index) => (
        <HistoryCard key={index} order={order} />
      ))}
    </div>
  ) : (
    <Message>سفارشی به اتمام نرسیده است</Message>
  );
};

export default DoneOrders;

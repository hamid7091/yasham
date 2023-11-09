import { useState } from "react";

function useCart(initialOrders) {
  console.log(initialOrders);
  const [selectedOrdersIDs, setSelectedOrdersIDs] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  function addToCart(order) {
    setSelectedOrdersIDs((prevIDs) => [...prevIDs, order.orderID]);
    setTotalPrice((prevPrice) => prevPrice + order.price);
  }
  function removeFromCart(order) {
    setSelectedOrdersIDs((prevIDs) =>
      prevIDs.filter((id) => id !== order.orderID)
    );
    setTotalPrice((prevPrice) => prevPrice - order.price);
  }
  function isInCart(order) {
    return selectedOrdersIDs.includes(order.orderID);
  }

  return { selectedOrdersIDs, totalPrice, addToCart, removeFromCart, isInCart };
}

export default useCart;

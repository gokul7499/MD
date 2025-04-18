import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const OrderContext = createContext();

// 2. Create the provider component
export const OrderProvider = ({ children }) => {
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState([]);

  // Function to cancel an order by ID
  const cancelOrder = (orderId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  // Function to add a new order
  const addOrder = (order) => {
    setOrderCount(prev => prev + 1);
    setOrders(prev => [...prev, order]);
  };

  return (
    <OrderContext.Provider value={{ orderCount, orders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// 3. Custom hook to use the context
export const useOrders = () => useContext(OrderContext);

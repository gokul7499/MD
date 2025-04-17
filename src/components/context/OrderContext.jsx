import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const cancelOrder = (orderId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };
  
  const addOrder = (order) => {
    setOrderCount(prev => prev + 1);
    setOrders(prev => [...prev, order]);
  };

  return (
    <OrderContext.Provider value={{ orderCount, orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
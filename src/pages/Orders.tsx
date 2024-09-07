import { useEffect, useState } from 'react';
import { fetchOrders } from '../api/api';
import OrderCard from '../components/OrderCard';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Orders;

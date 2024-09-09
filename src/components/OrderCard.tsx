import { Card, CardContent, Typography, Button } from '@mui/material';
import { Order } from '../types';
import { useState } from 'react';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [showItems, setShowItems] = useState(false); // Для показа товаров

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">Заказ №{order.id}</Typography>
        <Typography>Товары: {order.items.length}</Typography>
        <Typography>Сумма: {order.totalAmount} ₽</Typography>
        <Typography>
          Дата: {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
        <Typography>
          Статус: {order.status === 'completed' ? 'Завершён' : 'В ожидании'}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => setShowItems(!showItems)}
        >
          {showItems ? 'Скрыть товары' : 'Показать товары'}
        </Button>
        {showItems && (
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                <Typography>
                  {item.name} - {item.price} ₽ x {item.count}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;

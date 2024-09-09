import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [showItems, setShowItems] = useState(false); // Для показа товаров
  const navigate = useNavigate();

  // Функция для перехода на страницу объявления
  const handleItemClick = (itemId: string) => {
    navigate(`/advertisements/${itemId}`); // Переход на страницу объявления по его ID
  };

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

        {/* Список товаров */}
        {showItems && (
          <Box sx={{ marginTop: 2 }}>
            {order.items.map((item) => (
              <Box
                key={item.id}
                sx={{ cursor: 'pointer', marginBottom: 1 }}
                onClick={() => handleItemClick(item.id)}
              >
                <Typography sx={{ color: 'blue' }} variant="body1">
                  {item.name} - {item.price} ₽ x {item.count}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;

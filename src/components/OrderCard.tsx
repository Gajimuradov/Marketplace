import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';
import { updateOrderStatus } from '../api/api'; // Предполагаем, что существует функция для обновления статуса заказа

interface OrderCardProps {
  order: Order;
  onUpdateOrder: (updatedOrder: Order) => void; // Функция для обновления заказа
}

const OrderCard = ({ order, onUpdateOrder }: OrderCardProps) => {
  const [showItems, setShowItems] = useState(false); // Для показа товаров
  const navigate = useNavigate();

  // Функция для перехода на страницу объявления
  const handleItemClick = (itemId: string) => {
    navigate(`/advertisements/${itemId}`); // Переход на страницу объявления по его ID
  };

  // Рассчитываем общую сумму заказа
  const calculateTotalAmount = () => {
    return order.items.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  };

  // Функция для завершения заказа
  const handleCompleteOrder = async () => {
    const updatedOrder = {
      ...order,
      status: 'completed',
      finishedAt: new Date().toISOString(), // Устанавливаем дату завершения
    };

    try {
      await updateOrderStatus(order.id, updatedOrder); // Обновляем заказ через API
      onUpdateOrder(updatedOrder); // Обновляем заказ в состоянии
    } catch (error) {
      console.error('Ошибка при завершении заказа:', error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">Заказ №{order.id}</Typography>
        <Typography>Товары: {order.items.length}</Typography>
        <Typography>Сумма: {calculateTotalAmount()} ₽</Typography>
        <Typography>
          Дата создания: {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
        {order.finishedAt && (
          <Typography>
            Дата закрытия: {new Date(order.finishedAt).toLocaleDateString()}
          </Typography>
        )}
        <Typography>
          Статус: {order.status === 'completed' ? 'Завершён' : 'В ожидании'}
        </Typography>

        {/* Кнопка для завершения заказа, если статус "В ожидании" */}
        {order.status === 'pending' && (
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={handleCompleteOrder}
          >
            Завершить заказ
          </Button>
        )}

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
                {/* Ограничиваем длину названия товара до 20 символов */}
                <Typography sx={{ color: 'blue' }} variant="body1">
                  {item.name.length > 20
                    ? `${item.name.slice(0, 20)}...`
                    : item.name}{' '}
                  - {item.price} ₽ x {item.count}
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

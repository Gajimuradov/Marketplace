import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, OrderStatus } from '../types';
import { updateOrderStatus } from '../api/api';

interface OrderCardProps {
  order: Order;
  onUpdateOrder: (updatedOrder: Order) => void;
}

const OrderCard = ({ order, onUpdateOrder }: OrderCardProps) => {
  const [showItems, setShowItems] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (itemId: string) => {
    navigate(`/advertisements/${itemId}`);
  };

  const totalAmount = useMemo(() => {
    return (
      order.items?.reduce(
        (total, item) => total + item.price * item.count,
        0
      ) || 0
    );
  }, [order.items]);

  // Функция для изменения статуса на "Завершён" (Archived)
  const handleCompleteOrder = async () => {
    try {
      await updateOrderStatus(order.id, {
        ...order,
        status: OrderStatus.Archived, // Статус "Архив" как завершение заказа
        finishedAt: new Date().toISOString(),
      });
      onUpdateOrder({
        ...order,
        status: OrderStatus.Archived,
        finishedAt: new Date().toISOString(),
      }); // Обновляем заказ в состоянии
    } catch (error) {
      console.error('Ошибка при завершении заказа:', error);
    }
  };

  // Определяем статус заказа в текстовом виде
  const getStatusText = (status: number) => {
    switch (status) {
      case OrderStatus.Created:
        return 'Создан';
      case OrderStatus.Paid:
        return 'Оплачен';
      case OrderStatus.Transport:
        return 'В пути';
      case OrderStatus.DeliveredToThePoint:
        return 'Доставлен в пункт';
      case OrderStatus.Received:
        return 'Получен';
      case OrderStatus.Archived:
        return 'Завершён';
      case OrderStatus.Refund:
        return 'Возврат';
      default:
        return 'Неизвестный статус';
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">Заказ №{order.id}</Typography>
        <Typography>Товары: {order.items?.length || 0}</Typography>
        <Typography>Сумма: {totalAmount} ₽</Typography>
        <Typography>
          Дата создания: {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
        {order.finishedAt && (
          <Typography>
            Дата закрытия: {new Date(order.finishedAt).toLocaleDateString()}
          </Typography>
        )}
        <Typography>Статус: {getStatusText(order.status)}</Typography>

        {/* Кнопка для завершения заказа только если он не завершен или в возврате */}
        {order.status !== OrderStatus.Archived &&
          order.status !== OrderStatus.Refund && (
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

        {showItems && (
          <Box sx={{ marginTop: 2 }}>
            {order.items?.map((item) => (
              <Box
                key={item.id}
                sx={{ cursor: 'pointer', marginBottom: 1 }}
                onClick={() => handleItemClick(item.id)}
              >
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

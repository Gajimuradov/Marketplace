import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from '@mui/material';
import OrderCard from '../components/OrderCard';
import { fetchOrders } from '../api/api'; // Функция для получения всех заказов
import { Order } from '../types';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState(''); // Фильтрация по статусу
  const [sortBy, setSortBy] = useState(''); // Сортировка по сумме заказа

  // Загрузка заказов с сервера
  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders(filter, sortBy); // Загружаем заказы с фильтром и сортировкой
      setOrders(data);
    } catch (err) {
      setError('Ошибка при загрузке заказов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders(); // Загружаем заказы при изменении фильтров
  }, [filter, sortBy]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Все заказы
      </Typography>

      {/* Фильтрация по статусу */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Фильтрация по статусу</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="pending">В ожидании</MenuItem>
          <MenuItem value="completed">Завершённые</MenuItem>
        </Select>
      </FormControl>

      {/* Сортировка по сумме */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Сортировка по сумме</InputLabel>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <MenuItem value="">Нет сортировки</MenuItem>
          <MenuItem value="asc">По возрастанию</MenuItem>
          <MenuItem value="desc">По убыванию</MenuItem>
        </Select>
      </FormControl>

      {/* Отображение всех заказов */}
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12} sm={6} md={4}>
            <OrderCard order={order} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Orders;

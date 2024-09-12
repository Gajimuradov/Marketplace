import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
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
  const [sortBy, setSortBy] = useState('asc'); // Сортировка по возрастанию (по умолчанию)
  const [searchQuery, setSearchQuery] = useState(''); // Поисковый запрос

  // Загрузка заказов с сервера
  const loadOrders = async () => {
    setLoading(true);
    try {
      let data = await fetchOrders(filter, sortBy, searchQuery); // Загружаем заказы с фильтром, сортировкой и поиском

      // Приведение данных к единому формату
      data = data.map((order) => ({
        ...order,
        totalAmount: order.totalAmount || order.total, // Если нет totalAmount, используем total
      }));

      setOrders(data);
    } catch (err) {
      setError('Ошибка при загрузке заказов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders(); // Загружаем заказы при изменении фильтров, сортировки и поиска
  }, [filter, sortBy, searchQuery]);

  const handleSearch = () => {
    loadOrders(); // Обновляем список заказов при поиске
  };

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
          <MenuItem value="asc">По возрастанию</MenuItem>
          <MenuItem value="desc">По убыванию</MenuItem>
        </Select>
      </FormControl>

      {/* Поле для поиска */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Поиск заказов"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(); // Выполняем поиск при нажатии Enter
          }}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: 2 }}
          onClick={handleSearch}
        >
          Искать
        </Button>
      </Box>

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

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
import { fetchOrders } from '../api/api';
import { Order } from '../types';
import PaginationComponent from '../components/PaginationComponent'; // Импортируем компонент пагинации

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState(''); // Фильтрация по статусу
  const [sortBy, setSortBy] = useState('none');
  const [searchQuery, setSearchQuery] = useState(''); // Поисковый запрос
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);

  // Загрузка заказов с сервера
  const loadOrders = async () => {
    setLoading(true);
    try {
      let data = await fetchOrders(filter, sortBy, searchQuery);
      // Приведение данных к единому формату
      data = data.map((order) => ({
        ...order,
        totalAmount: order.total,
      }));
      setOrders(
        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      ); // Добавляем пагинацию
      setTotalOrders(data.length); // Общее количество заказов для пагинации
    } catch {
      setError('Ошибка при загрузке заказов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders(); // Загружаем заказы при изменении фильтров, сортировки, поиска, пагинации
  }, [filter, sortBy, searchQuery, page, rowsPerPage]);

  const handleSearch = () => {
    loadOrders(); // Обновляем список заказов при поиске
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          <MenuItem value="Created">Создан</MenuItem>
          <MenuItem value="Paid">Оплачен</MenuItem>
          <MenuItem value="Transport">В пути</MenuItem>
          <MenuItem value="DeliveredToThePoint">Доставлен в пункт</MenuItem>
          <MenuItem value="Received">Получен</MenuItem>
          <MenuItem value="Archived">Завершён</MenuItem>
          <MenuItem value="Refund">Возврат</MenuItem>
        </Select>
      </FormControl>

      {/* Сортировка по сумме */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Сортировка по сумме</InputLabel>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <MenuItem value="none">Без сортировки</MenuItem>
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
            if (e.key === 'Enter') handleSearch();
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
            <OrderCard order={order} onUpdateOrder={loadOrders} />
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      <PaginationComponent
        total={totalOrders}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Orders;

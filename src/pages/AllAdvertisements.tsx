import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  Box,
} from '@mui/material';
import AdvertisementCard from '../components/AdvertisementCard';
import { fetchAdvertisements } from '../api/api';
import { Advertisment } from '../types';
import TablePagination from '@mui/material/TablePagination';

const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10); // Количество объявлений на странице
  const [page, setPage] = useState(0); // Текущая страница
  const [totalAdvertisements, setTotalAdvertisements] = useState(0); // Общее количество объявлений

  // Функция для получения общего количества объявлений
  const fetchTotalAdvertisements = async () => {
    try {
      const response = await fetch('http://localhost:3000/advertisements');
      const data = await response.json();
      setTotalAdvertisements(data.length); // Устанавливаем общее количество объявлений
    } catch (error) {
      setError('Ошибка при получении общего количества объявлений');
    }
  };

  // Загрузка объявлений с сервера
  const loadAdvertisements = async () => {
    setLoading(true); // Устанавливаем состояние загрузки
    try {
      const data = await fetchAdvertisements(
        rowsPerPage,
        page * rowsPerPage,
        searchQuery,
        ''
      );
      setAdvertisements(data);
    } catch (err) {
      setError('Ошибка при загрузке объявлений');
    } finally {
      setLoading(false); // Отключаем состояние загрузки
    }
  };

  // Используем useEffect для загрузки данных при изменении пагинации или поиска
  useEffect(() => {
    fetchTotalAdvertisements(); // Получаем общее количество объявлений
    loadAdvertisements(); // Загружаем объявления
  }, [rowsPerPage, page, searchQuery]); // Зависимости для перезагрузки при изменении страницы или количества строк

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Возвращаемся на первую страницу при изменении количества объявлений на странице
  };

  // Если данные загружаются, показываем лоадер
  if (loading) {
    return <CircularProgress />;
  }

  // Если возникла ошибка, показываем сообщение об ошибке
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Все объявления
      </Typography>
      <TextField
        label="Поиск по названию"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Grid container spacing={2}>
        {advertisements.map((ad) => (
          <Grid item key={ad.id} xs={12} sm={6} md={4}>
            <AdvertisementCard ad={ad} />
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      <TablePagination
        component="div"
        count={totalAdvertisements} // Динамическое количество объявлений
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Объявлений на странице"
      />
    </Box>
  );
};

export default AllAdvertisements;

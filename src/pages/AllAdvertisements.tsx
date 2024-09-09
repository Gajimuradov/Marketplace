import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Импортируем иконку лупы
import TablePagination from '@mui/material/TablePagination';
import AdvertisementCard from '../components/AdvertisementCard';
import { useState, useEffect } from 'react';
import { fetchAdvertisements } from '../api/api'; // Импорт функции API
import { Advertisment } from '../types';

const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10); // Количество объявлений на странице
  const [page, setPage] = useState(0); // Текущая страница
  const [totalAdvertisements, setTotalAdvertisements] = useState(0); // Общее количество объявлений

  useEffect(() => {
    const loadAdvertisements = async () => {
      setLoading(true);
      try {
        const data = await fetchAdvertisements(
          rowsPerPage,
          page * rowsPerPage,
          searchQuery,
          ''
        );
        setAdvertisements(data);
        setTotalAdvertisements(data.length);
      } catch (err) {
        setError('Ошибка при загрузке объявлений');
      } finally {
        setLoading(false);
      }
    };

    loadAdvertisements();
  }, [rowsPerPage, page, searchQuery]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Сброс на первую страницу при изменении количества строк
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
        Все объявления
      </Typography>

      {/* Поле для поиска с иконкой лупы */}
      <TextField
        label="Поиск объявления..."
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={2}>
        {advertisements.map((ad) => (
          <Grid item key={ad.id} xs={12} sm={6} md={4}>
            <AdvertisementCard ad={ad} />
          </Grid>
        ))}
      </Grid>

      {/* Пагинация, выровненная по центру */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <TablePagination
          component="div"
          count={totalAdvertisements} // Общее количество объявлений
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Объявлений на странице"
        />
      </Box>
    </Box>
  );
};

export default AllAdvertisements;

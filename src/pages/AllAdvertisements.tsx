// AllAdvertisements.tsx
import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
  Box,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from '@mui/material/TablePagination';
import AdvertisementCard from '../components/AdvertisementCard';
import AddAdvertisementModal from '../components/AddAdvertisementModal'; // Импортируем модальное окно
import { fetchAdvertisements } from '../api/api';
import { Advertisment } from '../types';

const AllAdvertisements = () => {
  // Состояния и функции компонента
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [totalAdvertisements, setTotalAdvertisements] = useState(0);
  const [openAddModal, setOpenAddModal] = useState(false); // Состояние для модального окна

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

  useEffect(() => {
    loadAdvertisements();
  }, [rowsPerPage, page, searchQuery]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    loadAdvertisements(); // Обновляем список объявлений после добавления нового
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

      {/* Кнопка для добавления нового объявления */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddModal}
        sx={{ mb: 2 }}
      >
        Добавить объявление
      </Button>

      {/* Модальное окно для добавления объявления */}
      <AddAdvertisementModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
      />

      {/* Поле для поиска */}
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

      {/* Отображение объявлений */}
      <Grid container spacing={2}>
        {advertisements.map((ad) => (
          <Grid item key={ad.id} xs={12} sm={6} md={4}>
            <AdvertisementCard ad={ad} />
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <TablePagination
          component="div"
          count={totalAdvertisements}
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

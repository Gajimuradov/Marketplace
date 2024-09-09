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
import AddAdvertisementModal from '../components/AddAdvertisementModal';
import { fetchAllAdvertisements } from '../api/api';
import { Advertisment } from '../types';

const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [filteredAdvertisements, setFilteredAdvertisements] = useState<
    Advertisment[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [openAddModal, setOpenAddModal] = useState(false);

  // Загружаем все объявления с сервера
  const loadAllAdvertisements = async () => {
    console.log('Загрузка всех объявлений...');
    setLoading(true);
    try {
      const advertisements = await fetchAllAdvertisements(); // Загружаем все объявления с сервера
      setAdvertisements(advertisements); // Устанавливаем все объявления
      setFilteredAdvertisements(advertisements); // По умолчанию показываем все
    } catch (err) {
      setError('Ошибка при загрузке объявлений');
    } finally {
      setLoading(false);
    }
  };

  // Фильтрация объявлений на основе поискового запроса
  const filterAdvertisements = () => {
    if (searchQuery) {
      const filtered = advertisements.filter((ad) =>
        ad.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAdvertisements(filtered);
      setPage(0); // Сбрасываем на первую страницу после поиска
    } else {
      setFilteredAdvertisements(advertisements); // Если поиск пустой, показываем все объявления
    }
  };

  // Функция для обработки поиска
  const handleSearch = () => {
    filterAdvertisements(); // Фильтруем объявления на основе поискового запроса
  };

  // Нажатие клавиши Enter для запуска поиска
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    loadAllAdvertisements(); // Загружаем все объявления при первом рендере
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Сброс на первую страницу при изменении количества строк
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    loadAllAdvertisements(); // Обновляем список объявлений после добавления нового
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Определяем объявления, которые отображаются на текущей странице
  const paginatedAdvertisements = filteredAdvertisements.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Поиск объявления..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Обработка нажатия клавиши "Enter"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{ ml: 2, height: 56 }} // Задаем ту же высоту, что и у TextField
          onClick={handleSearch} // Кнопка для поиска
        >
          Искать
        </Button>
      </Box>

      {/* Отображение объявлений */}
      <Grid container spacing={2}>
        {paginatedAdvertisements.map((ad) => (
          <Grid item key={ad.id} xs={12} sm={6} md={4}>
            <AdvertisementCard ad={ad} />
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <TablePagination
          component="div"
          count={filteredAdvertisements.length} // Количество отфильтрованных объявлений
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

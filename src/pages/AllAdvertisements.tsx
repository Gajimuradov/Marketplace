import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { fetchAdvertisements, createAdvertisement } from '../api/api';
import AdvertisementCard from '../components/AdvertisementCard';
import { Advertisment } from '../types';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComponent from '../components/PaginationComponent';
import CreateAdvertisementModal from '../components/CreateAdvertisementModal'; // Импортируем модальное окно

const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalAdvertisements, setTotalAdvertisements] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Управление модальным окном
  const [newAdvert, setNewAdvert] = useState<Partial<Advertisment>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
  });

  // Загрузка объявлений с сервера
  const loadAdvertisements = async () => {
    setLoading(true);
    try {
      const data = await fetchAdvertisements(filterCategory, sortOrder);
      const filteredData = data.filter((ad) =>
        ad.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setAdvertisements(filteredData);
      setTotalAdvertisements(filteredData.length);
    } catch {
      setError('Ошибка при загрузке объявлений');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdvertisements();
  }, [filterCategory, sortOrder, page, rowsPerPage]);

  // Открытие и закрытие модального окна
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Обработка изменений в полях формы
  const handleInputChange = (
    field: keyof Advertisment,
    value: string | number
  ) => {
    setNewAdvert((prev) => ({ ...prev, [field]: value }));
  };

  // Сохранение нового объявления
  const handleCreateAdvert = async () => {
    try {
      await createAdvertisement(newAdvert);
      loadAdvertisements(); // Обновление списка объявлений
      handleCloseModal(); // Закрытие модального окна после создания
    } catch (error) {
      console.error('Ошибка при создании объявления', error);
    }
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleSearch = () => {
    loadAdvertisements();
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
        Все объявления
      </Typography>

      {/* Кнопка для создания нового объявления */}
      <Button
        variant="contained"
        sx={{ marginBottom: 2 }}
        onClick={handleOpenModal}
      >
        Создать новое объявление
      </Button>

      {/* Сортировка, иконка сортировки, и поле поиска */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <IconButton onClick={handleSortToggle} sx={{ marginRight: 2 }}>
          <SortIcon />
        </IconButton>

        <FormControl sx={{ marginRight: 2, minWidth: 200 }}>
          <InputLabel>Сортировка</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="all">Все категории</MenuItem>
            <MenuItem value="price">По цене</MenuItem>
            <MenuItem value="views">По просмотрам</MenuItem>
            <MenuItem value="likes">По лайкам</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Поиск объявления..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />

        <Button
          variant="contained"
          sx={{ marginLeft: 2, height: 56, minWidth: 120 }}
          onClick={handleSearch}
        >
          Искать
        </Button>
      </Box>

      {/* Отображение всех объявлений */}
      <Grid container spacing={2}>
        {advertisements
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((ad) => (
            <Grid item key={ad.id} xs={12} sm={6} md={4}>
              <AdvertisementCard ad={ad} />
            </Grid>
          ))}
      </Grid>

      {/* Пагинация */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <PaginationComponent
          total={totalAdvertisements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Модальное окно для создания нового объявления */}
      <CreateAdvertisementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateAdvert}
        newAdvert={newAdvert}
        onInputChange={handleInputChange}
      />
    </Box>
  );
};

export default AllAdvertisements;

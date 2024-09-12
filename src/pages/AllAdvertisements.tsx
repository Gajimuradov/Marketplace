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
  Modal,
  IconButton,
} from '@mui/material';
import { fetchAdvertisements, createAdvertisement } from '../api/api'; // Добавим функцию создания объявления
import AdvertisementCard from '../components/AdvertisementCard';
import { Advertisment } from '../types';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComponent from '../components/PaginationComponent';

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Для отображения модального окна
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
      setAdvertisements(data);
      setTotalAdvertisements(data.length); // Обновляем количество объявлений для пагинации
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
      await createAdvertisement(newAdvert); // Отправка нового объявления на сервер
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
        {/* Иконка сортировки */}
        <IconButton onClick={handleSortToggle} sx={{ marginRight: 2 }}>
          <SortIcon />
        </IconButton>

        {/* Сортировка по параметрам */}
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

        {/* Поле поиска */}
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

        {/* Кнопка для поиска */}
        <Button
          variant="contained"
          sx={{ marginLeft: 2, height: 56, minWidth: 120 }} // Делаем кнопку шире
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
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: 'white',
            margin: 'auto',
            width: '400px',
            mt: 8,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Новое объявление
          </Typography>
          <TextField
            label="Название"
            fullWidth
            value={newAdvert.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Цена"
            fullWidth
            type="number"
            value={newAdvert.price}
            onChange={(e) =>
              handleInputChange('price', parseFloat(e.target.value))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Описание"
            fullWidth
            multiline
            rows={4}
            value={newAdvert.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Ссылка на изображение"
            fullWidth
            value={newAdvert.imageUrl}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleCreateAdvert}
          >
            Создать
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AllAdvertisements;

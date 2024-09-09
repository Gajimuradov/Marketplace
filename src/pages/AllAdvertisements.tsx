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
  InputAdornment,
  IconButton,
  Button,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import AdvertisementCard from '../components/AdvertisementCard';
import { fetchAdvertisements } from '../api/api';
import { Advertisment } from '../types';

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

  // Загрузка объявлений с сервера
  const loadAdvertisements = async () => {
    setLoading(true);
    try {
      const data = await fetchAdvertisements(filterCategory, sortOrder);
      setAdvertisements(data);
      setTotalAdvertisements(data.length); // Обновляем количество объявлений для пагинации
    } catch (err) {
      setError('Ошибка при загрузке объявлений');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdvertisements();
  }, [filterCategory, sortOrder, page, rowsPerPage]);

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
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
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

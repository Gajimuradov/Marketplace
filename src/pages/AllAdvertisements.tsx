import { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { fetchAdvertisements } from '../api/api';
import AdvertisementCard from '../components/AdvertisementCard';
import AddAdvertisementModal from '../components/AddAdvertisementModal';
import { Advertisment } from '../types';

const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Поле для хранения поискового запроса
  const [filter, setFilter] = useState(''); // Поле для фильтрации объявлений

  // Функция для загрузки списка объявлений с поисковым запросом и фильтрацией
  const loadAdvertisements = async () => {
    const data = await fetchAdvertisements(10, 0, searchQuery, filter);
    setAdvertisements(data);
  };

  useEffect(() => {
    loadAdvertisements(); // Загружаем объявления при изменении поискового запроса или фильтра
  }, [searchQuery, filter]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    loadAdvertisements(); // Обновляем список после добавления объявления
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Advertisements
      </Typography>

      {/* Поле для поиска по названию */}
      <TextField
        label="Search by name"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Выпадающий список для фильтрации */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Filter by</InputLabel>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="views">Views</MenuItem>
          <MenuItem value="likes">Likes</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleOpen} sx={{ marginBottom: 2 }}>
        Add Advertisement
      </Button>

      {/* Модальное окно для добавления нового объявления */}
      <AddAdvertisementModal open={open} handleClose={handleClose} />

      {/* Отображение всех объявлений в виде карточек */}
      <Grid container spacing={2}>
        {advertisements.map((ad) => (
          <Grid item key={ad.id} xs={12} sm={6} md={4}>
            <AdvertisementCard ad={ad} onDelete={loadAdvertisements} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllAdvertisements;

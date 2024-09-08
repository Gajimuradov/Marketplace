import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { fetchAdvertisements } from '../api/api';
import AdvertisementCard from '../components/AdvertisementCard';
import AddAdvertisementModal from '../components/AddAdvertisementModal'; // Модальное окно для добавления объявления
import { Advertisment } from '../types';

const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [open, setOpen] = useState(false);

  // Функция для обновления списка объявлений
  const loadAdvertisements = async () => {
    const data = await fetchAdvertisements();
    setAdvertisements(data);
  };

  useEffect(() => {
    loadAdvertisements(); // Загружаем объявления при загрузке страницы
  }, []);

  // Открытие и закрытие модального окна
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    loadAdvertisements(); // Обновляем список после добавления объявления
  };

  // Удаление объявления
  const handleDelete = () => {
    loadAdvertisements(); // Обновляем список после удаления объявления
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        All Advertisements
      </Typography>

      {/* Кнопка для открытия модального окна */}
      <Button variant="contained" onClick={handleOpen} sx={{ marginBottom: 2 }}>
        Add Advertisement
      </Button>

      {/* Модальное окно для добавления объявления */}
      <AddAdvertisementModal open={open} handleClose={handleClose} />

      {/* Отображение всех объявлений в виде карточек */}
      <Grid container spacing={2}>
        {advertisements.map((ad) => (
          <Grid item key={ad.id} xs={12} sm={6} md={4}>
            <AdvertisementCard ad={ad} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllAdvertisements;

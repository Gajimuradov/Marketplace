import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Advertisment } from '../types';
import { deleteAdvertisement } from '../api/api'; // Импорт функции для удаления объявления

interface AdvertisementCardProps {
  ad: Advertisment;
  onDelete: () => void;
}

const AdvertisementCard = ({ ad, onDelete }: AdvertisementCardProps) => {
  // Обработчик удаления объявления
  const handleDelete = async () => {
    try {
      await deleteAdvertisement(ad.id); // Удаляем объявление через API
      onDelete(); // Обновляем список объявлений после удаления
    } catch (error) {
      console.error('Failed to delete advertisement:', error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {ad.name}
        </Typography>
        <Typography variant="body1">Price: {ad.price}</Typography>
        <Typography variant="body2">Views: {ad.views}</Typography>
        <Typography variant="body2">Likes: {ad.likes}</Typography>

        {/* Кнопка для перехода на страницу редактирования */}
        <Button
          component={Link}
          to={`/advertisements/edit/${ad.id}`}
          variant="contained"
          sx={{ mt: 1 }}
        >
          Edit
        </Button>

        {/* Кнопка для удаления объявления */}
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{ mt: 1, ml: 2 }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;

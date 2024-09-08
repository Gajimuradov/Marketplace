import { Card, CardContent, Typography, Button } from '@mui/material';
import { Advertisment } from '../types'; // Импорт типа объявления
import { deleteAdvertisement } from '../api/api'; // Функция для удаления объявления
import { useNavigate } from 'react-router-dom'; // Для навигации при редактировании

type AdvertisementCardProps = {
  ad: Advertisment;
  onDelete: () => void; // Функция, которая вызывается при удалении объявления для обновления списка
};

const AdvertisementCard = ({ ad, onDelete }: AdvertisementCardProps) => {
  const navigate = useNavigate();

  // Обработчик удаления объявления
  const handleDelete = async () => {
    try {
      await deleteAdvertisement(ad.id); // Вызов функции API для удаления
      onDelete(); // Обновление списка объявлений после удаления
    } catch (error) {
      console.error('Failed to delete advertisement:', error);
    }
  };

  // Обработчик перехода на страницу редактирования
  const handleEdit = () => {
    navigate(`/advertisements/${ad.id}/edit`); // Переход на страницу редактирования
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{ad.name}</Typography>
        <Typography>Price: {ad.price}</Typography>
        <Typography>Views: {ad.views}</Typography>
        <Typography>Likes: {ad.likes}</Typography>
        {ad.imageUrl && (
          <img
            src={ad.imageUrl}
            alt={ad.name}
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'cover',
              marginTop: '10px',
            }}
          />
        )}
        <Button onClick={handleEdit} variant="contained" sx={{ mt: 2 }}>
          Edit
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{ mt: 2, ml: 2 }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;

import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Advertisment } from '../types';

interface AdvertisementCardProps {
  ad: Advertisment;
}

const AdvertisementCard = ({ ad }: AdvertisementCardProps) => {
  const navigate = useNavigate(); // Хук для навигации

  // Ограничение длины названия
  const truncatedName =
    ad.name.length > 20 ? `${ad.name.slice(0, 20)}...` : ad.name;

  const handleCardClick = () => {
    navigate(`/advertisements/${ad.id}`); // Переход на страницу объявления
  };

  return (
    <Card onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="140"
        image={ad.imageUrl}
        alt={ad.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {truncatedName} {/* Название с ограничением длины */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Цена: {ad.price} ₽
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Просмотры: {ad.views}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Лайки: {ad.likes}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;

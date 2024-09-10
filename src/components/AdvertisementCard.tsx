import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
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

        {/* Добавляем блок с иконками просмотров и лайков */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          {/* Иконка просмотров */}
          <VisibilityIcon sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            {ad.views}
          </Typography>

          {/* Иконка лайков */}
          <FavoriteIcon sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {ad.likes}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;

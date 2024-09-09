import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate для перехода
import { Advertisment } from '../types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface AdvertisementCardProps {
  ad: Advertisment;
}

const AdvertisementCard = ({ ad }: AdvertisementCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/advertisements/${ad.id}`); // Переход на страницу объявления по его ID
  };

  return (
    <Card sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={handleCardClick}>
      {' '}
      {/* Добавляем кликабельность */}
      <CardMedia
        component="img"
        height="140"
        image={ad.imageUrl}
        alt={ad.name}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {ad.name}
        </Typography>
        <Typography>Цена: {ad.price} ₽</Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <VisibilityIcon sx={{ marginRight: 1 }} />
            <Typography>{ad.views}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <FavoriteIcon sx={{ marginRight: 1, color: 'red' }} />
            <Typography>{ad.likes}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;

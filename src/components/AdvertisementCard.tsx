import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
    <Card
      sx={{
        marginBottom: 2,
        cursor: 'pointer',
        width: '100%', // Ширина карточки 100%
        height: '100%', // Высота карточки 100%
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Распределение контента
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={ad.imageUrl}
        alt={ad.name}
        sx={{
          width: '100%',
          height: '0',
          paddingTop: '100%', // Соотношение сторон 1:1, чтобы сделать карточку квадратной
          objectFit: 'cover',
        }}
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

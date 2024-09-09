import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Advertisment } from '../types';

interface AdvertisementCardProps {
  ad: Advertisment;
}

const AdvertisementCard = ({ ad }: AdvertisementCardProps) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      {/* Отображение изображения */}
      <CardMedia
        component="img"
        height="140"
        image={ad.imageUrl} // Используем поле imageUrl для загрузки изображения
        alt={ad.name}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {ad.name}
        </Typography>
        <Typography>Цена: {ad.price} ₽</Typography>
        <Typography>Просмотры: {ad.views}</Typography>
        <Typography>Лайки: {ad.likes}</Typography>
        <Button
          component={Link}
          to={`/advertisements/edit/${ad.id}`}
          variant="contained"
        >
          Редактировать
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;

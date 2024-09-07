import { Card, CardContent, Typography } from '@mui/material';
import { Advertisment } from '../types.ts'; // Используй типы из types.ts

const AdvertisementCard = ({ ad }: { ad: Advertisment }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{ad.name}</Typography>
        <Typography>Price: {ad.price}</Typography>
        <Typography>Views: {ad.views}</Typography>
        <Typography>Likes: {ad.likes}</Typography>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;

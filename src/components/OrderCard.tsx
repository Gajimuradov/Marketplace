import { Card, CardContent, Typography } from '@mui/material';
import { Order } from '../types';

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Order #{order.id}</Typography>
        <Typography>Total: {order.total}</Typography>
        <Typography>Status: {order.status}</Typography>
        <Typography>
          Created at: {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

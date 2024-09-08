import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Seller Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/advertisements">
          Объявления
        </Button>
        <Button color="inherit" component={Link} to="/orders">
          Заказы
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Личный кабинет продавца
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/advertisements">
            Объявления
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            Заказы
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

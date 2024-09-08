import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllAdvertisements from './pages/AllAdvertisements';
import Orders from './pages/Orders';
import EditAdvertisement from './pages/EditAdvertisement'; // Импорт страницы редактирования
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/advertisements" element={<AllAdvertisements />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="/advertisements/edit/:id"
          element={<EditAdvertisement />}
        />{' '}
        {/* Маршрут для редактирования */}
      </Routes>
    </Router>
  );
};

export default App;

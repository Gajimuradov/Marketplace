import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllAdvertisements from './pages/AllAdvertisements';
import AdvertisementDetails from './pages/AdvertisementDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Добавляем маршрут для корневого пути */}
        <Route path="/" element={<AllAdvertisements />} />

        {/* Маршрут для страницы всех объявлений */}
        <Route path="/advertisements" element={<AllAdvertisements />} />

        {/* Маршрут для конкретного объявления */}
        <Route path="/advertisements/:id" element={<AdvertisementDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

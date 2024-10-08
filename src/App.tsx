import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllAdvertisements from './pages/AllAdvertisements';
import AdvertisementDetails from './pages/AdvertisementDetails';
import Orders from './pages/Orders';
import Navbar from './components/Navbar'; // Убедитесь, что Navbar правильно импортирован

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllAdvertisements />} />
        <Route path="/advertisements" element={<AllAdvertisements />} />
        <Route path="/advertisements/:id" element={<AdvertisementDetails />} />
        <Route path="/orders" element={<Orders />} />{' '}
      </Routes>
    </Router>
  );
};

export default App;

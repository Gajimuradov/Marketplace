import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllAdvertisements from './pages/AllAdvertisements';
import Orders from './pages/Orders';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/advertisements" element={<AllAdvertisements />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;

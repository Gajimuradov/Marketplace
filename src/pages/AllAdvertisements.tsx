import { useEffect, useState } from 'react';
import { fetchAdvertisements } from '../api/api';
import AdvertisementCard from '../components/AdvertisementCard';

const AllAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    fetchAdvertisements().then(setAdvertisements);
  }, []);

  return (
    <div>
      {advertisements.map((ad) => (
        <AdvertisementCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
};

export default AllAdvertisements;

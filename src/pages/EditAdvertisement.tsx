import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import { fetchAdvertisements, updateAdvertisement } from '../api/api'; // Импорт API-функций
import { Advertisment } from '../types';

const EditAdvertisement = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID объявления из URL
  const [advert, setAdvert] = useState<Advertisment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загружаем данные объявления по ID
    const loadAdvertisement = async () => {
      try {
        const fetchedAdvert = await fetchAdvertisements(id!);
        setAdvert(fetchedAdvert);
      } catch (error) {
        console.error('Failed to load advertisement:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAdvertisement();
  }, [id]);

  const handleInputChange = (
    field: keyof Advertisment,
    value: string | number
  ) => {
    setAdvert((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSubmit = async () => {
    if (advert) {
      try {
        await updateAdvertisement(advert.id, advert);
        alert('Advertisement updated successfully!');
      } catch (error) {
        console.error('Failed to update advertisement:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    advert && (
      <Box sx={{ padding: 4 }}>
        <TextField
          label="Name"
          fullWidth
          value={advert.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Price"
          fullWidth
          type="number"
          value={advert.price}
          onChange={(e) =>
            handleInputChange('price', parseFloat(e.target.value))
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Image URL"
          fullWidth
          value={advert.imageUrl}
          onChange={(e) => handleInputChange('imageUrl', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Update Advertisement
        </Button>
      </Box>
    )
  );
};

export default EditAdvertisement;

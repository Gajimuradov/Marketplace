import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { fetchAdvertisement, updateAdvertisement } from '../api/api'; // Импорт функций API
import { Advertisment } from '../types';

const AdvertisementDetails = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID объявления из URL
  const navigate = useNavigate(); // Для перехода после успешного редактирования
  const [advert, setAdvert] = useState<Advertisment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false); // Для отслеживания отправки формы

  // Загрузка объявления
  useEffect(() => {
    const loadAdvertisement = async () => {
      try {
        const fetchedAdvert = await fetchAdvertisement(id!); // Получаем объявление по ID
        setAdvert(fetchedAdvert);
      } catch (error) {
        setError('Ошибка при загрузке объявления');
      } finally {
        setLoading(false);
      }
    };
    loadAdvertisement();
  }, [id]);

  // Обработка изменений в полях
  const handleInputChange = (
    field: keyof Advertisment,
    value: string | number
  ) => {
    setAdvert((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  // Обработка отправки формы
  const handleSubmit = async () => {
    if (advert) {
      setSubmitting(true);
      try {
        await updateAdvertisement(id!, advert); // Отправляем обновленные данные
        navigate('/advertisements'); // Возвращаемся на страницу всех объявлений
      } catch (error) {
        setError('Ошибка при обновлении объявления');
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    advert && (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Редактировать объявление
        </Typography>
        <TextField
          label="Название"
          fullWidth
          value={advert.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Цена"
          fullWidth
          type="number"
          value={advert.price}
          onChange={(e) =>
            handleInputChange('price', parseFloat(e.target.value))
          }
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Описание"
          fullWidth
          multiline
          rows={4}
          value={advert.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Ссылка на изображение"
          fullWidth
          value={advert.imageUrl || ''}
          onChange={(e) => handleInputChange('imageUrl', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting}
        >
          {submitting ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </Box>
    )
  );
};

export default AdvertisementDetails;

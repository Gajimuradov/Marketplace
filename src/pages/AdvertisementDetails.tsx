import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
} from '@mui/material';
import { fetchAdvertisement, updateAdvertisement } from '../api/api'; // Функции API
import { Advertisment } from '../types';

const AdvertisementDetails = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID объявления из URL
  const navigate = useNavigate(); // Для перехода после успешного редактирования
  const [advert, setAdvert] = useState<Advertisment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Режим редактирования
  const [editedAdvert, setEditedAdvert] = useState<Partial<Advertisment>>({}); // Для отслеживания изменений
  const [expanded, setExpanded] = useState(false); // Состояние для отображения полного описания

  // Загрузка объявления
  useEffect(() => {
    const loadAdvertisement = async () => {
      try {
        const fetchedAdvert = await fetchAdvertisement(id!); // Получаем объявление по ID
        setAdvert(fetchedAdvert);
        setEditedAdvert(fetchedAdvert); // Инициализируем редактируемое объявление
      } catch (error) {
        setError('Ошибка при загрузке объявления');
      } finally {
        setLoading(false);
      }
    };
    loadAdvertisement();
  }, [id]);

  // Включение режима редактирования
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Сохранение изменений
  const handleSaveClick = async () => {
    setLoading(true);
    try {
      await updateAdvertisement(id!, editedAdvert); // Отправляем обновленные данные
      setAdvert(editedAdvert as Advertisment); // Обновляем состояние
      setIsEditing(false); // Выходим из режима редактирования
      navigate('/advertisements'); // Переход на страницу всех объявлений после сохранения
    } catch (error) {
      setError('Ошибка при обновлении объявления');
    } finally {
      setLoading(false);
    }
  };

  // Обработка изменений в полях редактирования
  const handleInputChange = (
    field: keyof Advertisment,
    value: string | number
  ) => {
    setEditedAdvert((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!advert) {
    return <Typography>Объявление не найдено</Typography>;
  }

  // Ограничение на 100 символов для краткого описания
  const maxDescriptionLength = 100;
  const description = advert.description || ''; // Проверяем наличие описания
  const truncatedDescription =
    description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + '...'
      : description;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Информация об объявлении
      </Typography>
      <Box
        component="img"
        src={advert.imageUrl}
        alt={advert.name}
        sx={{ width: '100%', maxHeight: '400px', objectFit: 'cover', mb: 2 }}
      />

      {!isEditing ? (
        <>
          <Typography variant="h6">Название: {advert.name}</Typography>
          <Typography>Цена: {advert.price} ₽</Typography>

          {/* Описание с кнопкой для раскрытия */}
          <Typography
            variant="body1"
            gutterBottom
            sx={{ wordBreak: 'break-word' }}
          >
            {expanded ? description : truncatedDescription}
          </Typography>
          {description.length > maxDescriptionLength && (
            <Button onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Скрыть' : 'Читать полностью'}
            </Button>
          )}

          <Typography>Просмотры: {advert.views}</Typography>
          <Typography>Лайки: {advert.likes}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleEditClick}>
            Редактировать
          </Button>
        </>
      ) : (
        <>
          {/* В режиме редактирования показываем поля для изменения */}
          <TextField
            label="Название"
            fullWidth
            value={editedAdvert.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Цена"
            fullWidth
            type="number"
            value={editedAdvert.price || 0}
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
            value={editedAdvert.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Ссылка на изображение"
            fullWidth
            value={editedAdvert.imageUrl || ''}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSaveClick}>
            Сохранить изменения
          </Button>
        </>
      )}
    </Box>
  );
};

export default AdvertisementDetails;

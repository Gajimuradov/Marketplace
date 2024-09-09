// AddAdvertisementModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { createAdvertisement } from '../api/api';
import { Advertisment } from '../types';

interface AddAdvertisementModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddAdvertisementModal = ({
  open,
  handleClose,
}: AddAdvertisementModalProps) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !price) {
      alert('Пожалуйста, заполните обязательные поля: название и цена.');
      return;
    }

    setLoading(true);
    try {
      const newAdvert: Partial<Advertisment> = {
        name,
        price: Number(price),
        description,
        imageUrl,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
      };

      await createAdvertisement(newAdvert);
      alert('Объявление успешно добавлено!');
      // Сбросить поля формы
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
      handleClose(); // Закрыть модальное окно и обновить список объявлений
    } catch (error) {
      console.error('Ошибка при добавлении объявления:', error);
      alert('Ошибка при добавлении объявления');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Добавить новое объявление
        </Typography>
        <TextField
          label="Название"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Цена"
          fullWidth
          required
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value ? Number(e.target.value) : '')
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="Описание"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Ссылка на изображение"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Добавить'
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddAdvertisementModal;

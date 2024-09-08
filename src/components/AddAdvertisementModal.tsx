import { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { createAdvertisement } from '../api/api'; // Импорт функции API для создания объявления
import { Advertisment } from '../types'; // Импорт типа для объявления

// Интерфейс пропсов для компонента
interface AddAdvertisementModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddAdvertisementModal = ({
  open,
  handleClose,
}: AddAdvertisementModalProps) => {
  // Локальные состояния для полей формы
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Обработчик отправки формы для создания нового объявления
  const handleSubmit = async () => {
    const newAdvertisement: Omit<
      Advertisment,
      'id' | 'createdAt' | 'views' | 'likes'
    > = {
      name,
      price: parseFloat(price),
      imageUrl,
    };

    try {
      await createAdvertisement({
        ...newAdvertisement,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
      });
      handleClose(); // Закрываем модальное окно после успешного создания объявления
    } catch (error) {
      console.error('Failed to create advertisement:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: 'white',
          margin: 'auto',
          maxWidth: '400px',
          mt: '100px',
        }}
      >
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Price"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Image URL"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Add Advertisement
        </Button>
      </Box>
    </Modal>
  );
};

export default AddAdvertisementModal;

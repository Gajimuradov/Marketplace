import React from 'react';
import { Box, Typography, TextField, Button, Modal } from '@mui/material';
import { Advertisment } from '../types';

interface CreateAdvertisementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newAdvert: Partial<Advertisment>;
  onInputChange: (field: keyof Advertisment, value: string | number) => void;
}

const CreateAdvertisementModal: React.FC<CreateAdvertisementModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  newAdvert,
  onInputChange,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: 'white',
          margin: 'auto',
          width: '400px',
          mt: 8,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Новое объявление
        </Typography>
        <TextField
          label="Название"
          fullWidth
          value={newAdvert.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Цена"
          fullWidth
          type="number"
          value={newAdvert.price}
          onChange={(e) => onInputChange('price', parseFloat(e.target.value))}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Описание"
          fullWidth
          multiline
          rows={4}
          value={newAdvert.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Ссылка на изображение"
          fullWidth
          value={newAdvert.imageUrl}
          onChange={(e) => onInputChange('imageUrl', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={onSubmit}>
          Создать
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateAdvertisementModal;

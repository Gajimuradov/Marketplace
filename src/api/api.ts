// api.ts
import { Advertisment } from '../types';

// Функция для получения всех объявлений
export const fetchAdvertisements = async (limit = 10, start = 0, searchQuery = '', filter = '') => {
  const response = await fetch(`http://localhost:3000/advertisements?_start=${start}&_limit=${limit}&name_like=${searchQuery}&_sort=${filter}`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявлений');
  }
  return await response.json();
};

// Функция для получения конкретного объявления по ID
export const fetchAdvertisement = async (id: string) => {
  const response = await fetch(`http://localhost:3000/advertisements/${id}`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявления');
  }
  return await response.json();
};

// Функция для создания нового объявления
export const createAdvertisement = async (advert: Partial<Advertisment>) => {
  const response = await fetch('http://localhost:3000/advertisements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(advert),
  });

  if (!response.ok) {
    throw new Error('Ошибка при создании объявления');
  }

  return await response.json();
};

// Функция для обновления объявления
export const updateAdvertisement = async (id: string, advert: Partial<Advertisment>) => {
  const response = await fetch(`http://localhost:3000/advertisements/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(advert),
  });

  if (!response.ok) {
    throw new Error('Ошибка при обновлении объявления');
  }

  return await response.json();
};

// Функция для удаления объявления
export const deleteAdvertisement = async (id: string) => {
  const response = await fetch(`http://localhost:3000/advertisements/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Ошибка при удалении объявления');
  }

  return await response.json();
};




// Функция для получения всех заказов с фильтрацией и сортировкой
export const fetchOrders = async (status = '', sortBy = '') => {
  let url = `http://localhost:3000/orders`;

  // Добавляем фильтрацию по статусу
  if (status) {
    url += `?status=${status}`;
  }

  // Добавляем сортировку по сумме заказа
  if (sortBy) {
    const separator = status ? '&' : '?';  // Определяем, нужно ли добавить "&" или "?"
    url += `${separator}_sort=totalAmount&_order=${sortBy}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке заказов');
  }
  return await response.json();
};

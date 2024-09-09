// api.ts
import { Advertisment } from '../types';

// Функция для получения всех объявлений

export const fetchAdvertisements = async (
  filterCategory = 'all',
  sortBy = 'asc'
) => {
  let url = `http://localhost:3000/advertisements`;

  const queryParams = [];

  // Фильтрация по категории
  if (filterCategory !== 'all') {
    queryParams.push(`_sort=${filterCategory}`);
  }

  // Добавляем сортировку
  if (sortBy) {
    queryParams.push(`_order=${sortBy}`);
  }

  // Объединяем параметры в строку
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  const response = await fetch(url);
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
export const updateAdvertisement = async (
  id: string,
  advert: Partial<Advertisment>
) => {
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
export const fetchOrders = async (status = '', sortBy = 'asc') => {
  let url = `http://localhost:3000/orders`;

  // Добавляем фильтрацию по статусу
  if (status) {
    url += `?status=${status}`;
  }

  // Добавляем сортировку по сумме заказа
  if (sortBy) {
    const separator = status ? '&' : '?'; // Определяем, нужно ли добавить "&" или "?"
    url += `${separator}_sort=totalAmount&_order=${sortBy}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке заказов');
  }
  return await response.json();
};

export const fetchAllAdvertisements = async () => {
  const response = await fetch(`http://localhost:3000/advertisements`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявлений');
  }

  const advertisements = await response.json();
  return advertisements; // Возвращаем все объявления
};

export const updateOrderStatus = async (
  orderId: string,
  updatedOrder: Order
) => {
  const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedOrder),
  });

  if (!response.ok) {
    throw new Error('Ошибка при обновлении заказа');
  }

  return await response.json();
};

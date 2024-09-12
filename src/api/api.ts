import { Advertisment, Order, OrderStatus } from '../types';

// Получение всех объявлений с фильтрацией и сортировкой
export const fetchAdvertisements = async (
  filterCategory = 'all',
  sortBy = 'asc'
) => {
  const params = new URLSearchParams();
  if (filterCategory !== 'all') params.append('_sort', filterCategory);
  if (sortBy) params.append('_order', sortBy);

  const response = await fetch(
    `http://localhost:3000/advertisements${params.toString() ? `?${params}` : ''}`
  );
  if (!response.ok) throw new Error('Ошибка при загрузке объявлений');
  return response.json();
};

// Получение конкретного объявления по ID
export const fetchAdvertisement = async (id: string) => {
  const response = await fetch(`http://localhost:3000/advertisements/${id}`);
  if (!response.ok) throw new Error('Ошибка при загрузке объявления');
  return response.json();
};

// Создание нового объявления
export const createAdvertisement = async (advert: Partial<Advertisment>) => {
  const response = await fetch('http://localhost:3000/advertisements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(advert),
  });
  if (!response.ok) throw new Error('Ошибка при создании объявления');
  return response.json();
};

// Обновление объявления по ID
export const updateAdvertisement = async (
  id: string,
  advert: Partial<Advertisment>
) => {
  const response = await fetch(`http://localhost:3000/advertisements/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(advert),
  });
  if (!response.ok) throw new Error('Ошибка при обновлении объявления');
  return response.json();
};

// Удаление объявления по ID
export const deleteAdvertisement = async (id: string) => {
  const response = await fetch(`http://localhost:3000/advertisements/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Ошибка при удалении объявления');
  return response.json();
};

// Получение всех заказов с фильтрацией по статусу и сортировкой
export const fetchOrders = async (
  statusFilter: string = '',
  sortBy: string = 'none',
  searchQuery: string = ''
) => {
  let url = `http://localhost:3000/orders`;
  const queryParams = new URLSearchParams();

  // Фильтрация по статусу
  if (statusFilter) {
    const statusValue = OrderStatus[statusFilter as keyof typeof OrderStatus];
    if (statusValue !== undefined) {
      queryParams.append('status', statusValue.toString());
    }
  }

  // Добавляем сортировку по сумме заказа
  if (sortBy !== 'none') {
    queryParams.append('_sort', 'total');
    queryParams.append('_order', sortBy); // "asc" или "desc"
  }

  // Поиск по заказам
  if (searchQuery) {
    queryParams.append('q', searchQuery); // Пример поиска
  }

  const response = await fetch(`${url}?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке заказов');
  }
  return await response.json();
};

// Обновление статуса заказа
export const updateOrderStatus = async (
  orderId: string,
  updatedOrder: Order
) => {
  const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedOrder),
  });
  if (!response.ok) throw new Error('Ошибка при обновлении заказа');
  return response.json();
};

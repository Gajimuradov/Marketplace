const API_URL = 'http://localhost:3000';

export const fetchAdvertisements = async (limit = 10, start = 0) => {
  const response = await fetch(
    `${API_URL}/advertisements?_start=${start}&_limit=${limit}`
  );
  return await response.json();
};

export const fetchOrders = async () => {
  const response = await fetch(`${API_URL}/orders`);
  return await response.json();
};

export const updateAdvertisement = async (id: string, advert: Advertisment) => {
  const response = await fetch(`http://localhost:3000/advertisements/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(advert),
  });

  if (!response.ok) {
    throw new Error('Failed to update advertisement');
  }

  return await response.json();
};

export const createAdvertisement = async (advert: Advertisment) => {
  const response = await fetch('http://localhost:3000/advertisements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(advert),
  });

  if (!response.ok) {
    throw new Error('Failed to create advertisement');
  }

  return await response.json();
};

export const deleteAdvertisement = async (id: string) => {
  const response = await fetch(`http://localhost:3000/advertisements/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete advertisement');
  }
};

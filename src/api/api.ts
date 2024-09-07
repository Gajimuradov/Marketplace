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

export const createAdvertisement = async (advert) => {
  const response = await fetch(`${API_URL}/advertisements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(advert),
  });
  return await response.json();
};

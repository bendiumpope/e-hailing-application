import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const post = async (url: string, data: any) => {
  const response = await api.post(url, data);
  return response.data;
};

export const get = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

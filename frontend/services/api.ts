import axios from 'axios';
import { RideRequest, RideResponse } from '../types/ride';

// Create API instance
export const api = axios.create({
  baseURL: 'http://localhost:3002',
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const post = async <T = any>(url: string, data: any): Promise<T> => {
  const response = await api.post(url, data);
  return response.data;
};

export const get = async <T = any>(url: string): Promise<T> => {
  const response = await api.get(url);
  return response.data;
};

// Specific API functions for rides
export const createRide = async (rideData: RideRequest): Promise<RideResponse> => {
  return post<RideResponse>('/rides', rideData);
};

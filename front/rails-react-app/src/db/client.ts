import axios, { AxiosResponse } from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const fileClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

client.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  const data = response.data;
  return { ...response.data, data };
});

client.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  const data = response.data;
  return { ...response.data, data };
});

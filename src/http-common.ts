import type { AxiosInstance } from 'axios';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUD_NAME;

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL + CLOUD_NAME,
  headers: {
    accept: '*/*',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
  },
});

export default apiClient;

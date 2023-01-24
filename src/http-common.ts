import type { AxiosInstance } from 'axios';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUD_NAME;

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL + CLOUD_NAME,
  headers: {
    accept: '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type':
      'multipart/form-data; boundary=----WebKitFormBoundaryp6AxLbJ1pNXgOHOw',
  },
});

export default apiClient;

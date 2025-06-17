import axios from 'axios';
import { BASE_URL } from '../constants';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept-Language': 'en',
  },
  timeout: 30000,
});

export const setupAxiosInterceptors = () => {
  instance.interceptors.request.use(
    async config => {
      // Removed token logic
      return config;
    },
    err => {
      console.log('Request Error:', JSON.stringify(err));
      return Promise.reject(err);
    },
  );

  instance.interceptors.response.use(
    response => response,
    async err => {
      if (!err.response) {
        console.error('Network error or no response received:', err.message);
        return Promise.reject(new Error('Network error. Please try again.'));
      }

      return Promise.reject(err);
    },
  );
};

export default instance;

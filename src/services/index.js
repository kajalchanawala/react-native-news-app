import instance from '../api';
import { END_POINT } from '../constants';

export const fetchHealthNews = async () => {
  try {
    const response = await instance.get(END_POINT);
    return response.data.articles || [];
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

import { axiosInstance } from '..';

export const getMovies = async ({ category, page = 1 }) => {
  try {
    const response = await axiosInstance.get(`movie/${category}?language=ko-KR&page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

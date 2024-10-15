import axiosInstance from '..';

export const getMovieDetail = async (movieId) => {
  try {
    const response = await axiosInstance.get(`movie/${movieId}?language=ko-KR`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
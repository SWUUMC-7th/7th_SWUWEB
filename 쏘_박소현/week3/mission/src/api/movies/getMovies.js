import axiosInstance from '..';

export const getMovies = async () => {
  try {
    const response = await axiosInstance.get(`popular?language=en-US&page=1`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
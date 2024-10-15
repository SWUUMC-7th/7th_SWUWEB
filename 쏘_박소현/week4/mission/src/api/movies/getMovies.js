import axiosInstance from '..';

export const getMovies = async (category) => {
  try {
    const response = await axiosInstance.get(`${category}movie/?language=ko-KR&page=1`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
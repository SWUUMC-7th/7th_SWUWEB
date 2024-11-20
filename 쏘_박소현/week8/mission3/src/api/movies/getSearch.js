import { axiosInstance } from '..';

export const getSearch = async (search) => {
  try {
    const response = await axiosInstance.get(`search/movie?query=${search}&language=ko-KR`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
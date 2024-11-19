import { axiosInstance } from "../../api/axios-instance";

const useGetMovies = async ({ category, pageParam }) => {
  const { data } = await axiosInstance.get(`/movie/${category}?language=ko&page=${pageParam}`);
  console.log("영화 받아오는중...");
  return data;
};

export { useGetMovies };

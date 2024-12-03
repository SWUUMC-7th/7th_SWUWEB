import { axiosInstance } from "./axiosInstance";

interface GetMoviesParams {
  category: string;
  pageParam: number;
}

export const getMovies = async ({ category, pageParam }: GetMoviesParams) => {
  const { data } = await axiosInstance.get(`/movie/${category}?language=ko&page=${pageParam}`);
  return data;
};

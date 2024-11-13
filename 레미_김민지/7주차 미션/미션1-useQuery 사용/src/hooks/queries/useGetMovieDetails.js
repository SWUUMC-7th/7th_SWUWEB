import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axios-instance";

const fetchMovieDetails = async (movieId) => {
  const { data } = await axiosInstance.get(`/movie/${movieId}?language=ko`);
  console.log("정보 받아오는중...");
  return data;
};

export const useGetMovieDetails = (movieId) => {
  return useQuery({
    queryKey: ["movie_detail", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    staleTime: 10000,
    cacheTime: 10000,
  });
};

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axios-instance";

const fetchMovieCredits = async (movieId) => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/credits?language=ko`);
  console.log("크레딧 받아오는중...");
  return data;
};

export const useGetMovieCredits = (movieId) => {
  return useQuery({
    queryKey: ["movie_credit", movieId],
    queryFn: () => fetchMovieCredits(movieId),
    staleTime: 10000,
    cacheTime: 10000,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../api/movieApi";
import { MovieDetails } from "../types";

export const useGetMovieDetails = (movieId?: string) => {
  return useQuery<MovieDetails>({
    queryKey: ["movie_details", movieId],
    queryFn: () => getMovieDetails(movieId!),
    staleTime: 10000,
    enabled: !!movieId, // movieId가 있을 때만 쿼리 실행
  });
};

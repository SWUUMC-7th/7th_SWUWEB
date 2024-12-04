import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/movieApi";
import { MovieCredits } from "../types";

export const useGetMovieCredits = (movieId?: string) => {
  return useQuery<MovieCredits>({
    queryKey: ["movie_credits", movieId],
    queryFn: () => getMovieCredits(movieId!),
    staleTime: 10000,
    enabled: !!movieId, // movieId가 있을 때만 요청 실행
  });
};

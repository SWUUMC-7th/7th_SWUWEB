import { axiosInstance } from "./axiosInstance";
import { MovieCredits, MovieDetails } from "./types";

interface GetMoviesParams {
  category: string;
  pageParam: number;
}

export const getMovies = async ({ category, pageParam }: GetMoviesParams) => {
  const { data } = await axiosInstance.get(`/movie/${category}?language=ko&page=${pageParam}`);
  return data;
};

export const getMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  const { data } = await axiosInstance.get(`/movie/${movieId}?language=ko`);
  return data;
};

export const getMovieCredits = async (movieId: string): Promise<MovieCredits> => {
  const { data } = await axiosInstance.get(`/movie/${movieId}/credits?language=ko`);
  return data;
};

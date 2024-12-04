import { useEffect, useState } from "react";
import { getMovies } from "../api/movies/getMovies";
import { getMovieDetail } from "../api/movies/getMovieDetail";
import { getCredits } from "../api/movies/getCredits";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  overview: string;
  poster_path: string;
}

interface Credit {
  id: number;
  name: string;
  profile_path?: string;
  job?: string;
}

interface MovieDetail {
  movie: Movie | null;
  credits: {
    crew: Credit[];
    cast: Credit[];
  };
  data: Movie[];
  isLoading: boolean;
  isError: boolean;
}

const useMovie = (category: string, movieId?: number): MovieDetail => {
  const [data, setData] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [credits, setCredits] = useState<{ crew: Credit[]; cast: Credit[] }>({
    crew: [],
    cast: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (movieId) {
          const movieDetail = await getMovieDetail(movieId);
          const creditsData = await getCredits(movieId);

          setMovie(movieDetail);
          setCredits(creditsData);
        } else {
          const data = await getMovies(category);
          setData(data.results);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, movieId]);

  return { data, movie, credits, isLoading, isError };
};

export default useMovie;

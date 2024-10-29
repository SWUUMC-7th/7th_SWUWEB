import { useEffect, useState } from "react";
import { getMovies } from "../api/movies/getMovies";
import { getMovieDetail } from "../api/movies/getMovieDetail";
import { getCredits } from "../api/movies/getCredits";

const useMovie = (category, movieId) => {
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [credits, setCredits] = useState({});

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

import { useEffect, useState } from "react";
import { getMovies } from "../api/movies/getMovies";
import { getMovieDetail } from "../api/movies/getMovieDetail"; 

const useMovie = (category, movieId) => {
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (movieId) { 
          const movieDetail = await getMovieDetail(movieId);
          setMovie(movieDetail);
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

  return { data, movie, isLoading, isError };
};

export default useMovie;

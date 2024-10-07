import { useEffect, useState } from "react";
import axios from "axios";
import MovieCards from "../components/movieCards";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIES_API}`,
          },
        },
      );
      setMovies(response.data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>높은 평점을 받은 영화</h1>
      {movies.map((movie) => (
        <MovieCards key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default TopRatedMovies;

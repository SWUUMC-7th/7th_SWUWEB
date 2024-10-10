import { useEffect, useState } from "react";
import { MovieGrid } from "../layout/movieGrid";
import axios from "axios";
import MovieCards from "../components/movieCards";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=ko&page=1`,
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
      <h1>인기있는 영화</h1>
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </div>
  );
};

export default PopularMovies;

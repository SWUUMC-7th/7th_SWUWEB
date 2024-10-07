import MovieCards from "../components/movieCards";

import { useEffect, useState } from "react";
import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_MOVIES_API}`,
          },
        },
      );
      setMovies(movies);
    };
    getMovies();
  }, []);

  return (
    <>
      {movies.data?.results.map((movie) => (
        <MovieCards key={movie.id} movie={movie} />
      ))}
    </>
  );
};

export default MoviesPage;

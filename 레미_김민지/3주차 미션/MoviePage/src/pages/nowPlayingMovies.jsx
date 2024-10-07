import { useEffect, useState } from "react";
import axios from "axios";
import MovieCards from "../components/MovieCards";

const NowPlayingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
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
      <h1>현재 상영중인 영화</h1>
      <div>
        {movies.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default NowPlayingMovies;

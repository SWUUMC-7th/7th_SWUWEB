import { useEffect, useState } from "react";
import axios from "axios";
import MovieCards from "../components/movieCards";

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
      <MovieCards movies={movies} />
    </div>
  );
};

export default NowPlayingMovies;

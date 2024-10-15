import {useEffect, useState} from "react";
import { getMovies } from "../api/movies/getMovies";

const useMovie = (category) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovies(category);
        setData(data.results);
      } catch (error) {
        setIsError(true);
      }
      finally{
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return {data, isLoading, isError}
}

export default useMovie
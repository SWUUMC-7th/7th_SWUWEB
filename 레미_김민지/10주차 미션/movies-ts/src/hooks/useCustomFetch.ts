import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";

interface FetchState<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}

const useCustomFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T>({} as T);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(url);
        setData(response.data.results || response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetch;

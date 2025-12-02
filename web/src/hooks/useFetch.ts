import { useState, useEffect } from "react";
import api from "@/services/api";
import { useLoading } from "@/context/LoadingContext";

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
}

const useFetch = <T>(url: string): FetchResult<T> => {
  const { setIsLoading } = useLoading();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(url, { signal });
        setData(response.data.result);
      } catch (error) {
        if ((error as Error).name !== "CanceledError") {
          setError(error as Error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error };
};

export default useFetch;

import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../http.js";

export function useFetch() {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchAvailableMeals();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data" });
      }

      setIsFetching(false);
    }

    fetchData();
  }, []);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}

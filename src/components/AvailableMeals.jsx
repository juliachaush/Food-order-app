import { useState, useEffect } from "react";

import Meals from "./Meals.jsx";
import Error from "./Error.jsx";
import { fetchAvailableMeals } from "../http.js";

export default function AvailableMeals({ onAddToCartClick }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);

      try {
        const meals = await fetchAvailableMeals();
        setAvailableMeals(meals);
        setIsFetching(false);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch meals, please try again later",
        });
        setIsFetching(false);
      }
    }
    fetchMeals();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }
  return (
    <Meals
      meals={availableMeals}
      isLoading={isFetching}
      loadingText="Fetching meals data..."
      fallbackText="No meals available."
      onAddToCartClick={onAddToCartClick}
    />
  );
}

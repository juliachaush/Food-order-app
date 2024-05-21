import { useEffect, useState } from "react";

import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Modal from "./components/Modal.jsx";
import Error from "./components/Error.jsx";
import Form from "./components/Form.jsx";

import { useFetch } from "./hooks/useFetch.js";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [addToCart, setAddToCart] = useState(() => {
    const savedData = localStorage.getItem("meals");
    return savedData ? JSON.parse(savedData) : [];
  });

  const {
    isFetching,
    fetchedData: availableMeals,
    setFetchedData: setAvailableMeals,
    error,
  } = useFetch();

  function removeMealFromCart(meal) {
    if (meal.quantity <= 0) {
      setAddToCart((prevAddToCart) => prevAddToCart.filter(meal));
    }
  }

  function handleAddToCart(meal) {
    const mealWithQuantity = { ...meal, quantity: 1 };

    setAddToCart((prevAddToCart) => {
      const existingMeal = prevAddToCart.find((item) => item.id === meal.id);

      if (existingMeal) {
        return prevAddToCart.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevAddToCart, mealWithQuantity];
      }
    });
  }

  function handleRemoveFromCart(meal) {
    setAddToCart((prevAddToCart) => {
      const existingMeal = prevAddToCart.find((item) => item.id === meal.id);

      if (existingMeal) {
        return prevAddToCart.map((item) =>
          item.id === meal.id && meal.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return [...prevAddToCart];
      }
    });
  }

  const totalQuantity = addToCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleOnCartClick() {
    setCartIsOpen(true);
  }
  function handleCloseCart() {
    setCartIsOpen(false);
  }

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(addToCart));
  }, [addToCart]);

  return (
    <>
      <Form />

      <Header
        onCartClick={handleOnCartClick}
        onCartItemChange={totalQuantity}
      />
      <main>
        {error && <Error title="An error occurred!" message={error.message} />}
        {!error && (
          <Meals
            onAddToCartClick={handleAddToCart}
            meals={availableMeals}
            isLoading={isFetching}
            loadingText="Fetching meals data..."
            fallbackText="No meals available."
          />
        )}
      </main>
      <Modal open={cartIsOpen} close={handleCloseCart}>
        {cartIsOpen && (
          <Cart
            onClose={handleCloseCart}
            addToCart={addToCart}
            onAddQuantity={handleAddToCart}
            onRemoveQuantity={handleRemoveFromCart}
          />
        )}
      </Modal>
    </>
  );
}

export default App;

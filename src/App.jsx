import { useEffect, useState } from "react";

import { useFetch } from "./hooks/useFetch.js";

import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Modal from "./components/Modal.jsx";
import Error from "./components/Error.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [formIsOpen, setFormtIsOpen] = useState(false);
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

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(addToCart));
  }, [addToCart]);

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

  const totalCartSum = addToCart
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  function handleOnCartClick() {
    setCartIsOpen(true);
  }
  function handleCloseCart() {
    setCartIsOpen(false);
  }

  function handleCloseForm() {
    setFormtIsOpen(false);
  }

  function handleGoToChackout() {
    setCartIsOpen(false);
    setFormtIsOpen(true);
  }

  return (
    <>
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
            onCheckout={handleGoToChackout}
            totalCartSum={totalCartSum}
          />
        )}
      </Modal>
      <Modal open={formIsOpen} close={handleCloseForm}>
        {formIsOpen && (
          <Checkout totalCartSum={totalCartSum} onClose={handleCloseForm} />
        )}
      </Modal>
    </>
  );
}

export default App;

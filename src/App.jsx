import { useState } from "react";

import Header from "./components/Header";
import AvailableMeals from "./components/AvailableMeals";
import Cart from "./components/Cart";
import Modal from "./components/Modal";

import { useFetch } from "./hooks/useFetch";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  // const {} = useFetch();

  function handleAddToCart() {}

  function handleOnCartClick() {
    setCartIsOpen(true);
  }

  function handleCloseCart() {
    setCartIsOpen(false);
  }
  return (
    <>
      <Header onCartClick={handleOnCartClick} />
      <AvailableMeals onAddToCartClick={handleAddToCart} />
      <Modal open={cartIsOpen} close={handleCloseCart}>
        {cartIsOpen && <Cart onClose={handleCloseCart} />}
      </Modal>
    </>
  );
}

export default App;

import { useState } from "react";

export default function Cart({
  onClose,
  addToCart,
  onAddQuantity,
  onRemoveQuantity,
}) {
  const totalCartSum = addToCart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const filteredMealsQuantity = addToCart.filter((item) =>
    item.quantity > 0 ? true : false
  );

  console.log(addToCart);
  return (
    <div>
      <h2>Your Cart</h2>
      <ul className="meal-item-actions">
        {filteredMealsQuantity.map((meal) => (
          <li key={addToCart.id} className="cart-item">
            <p>
              {meal.name} {meal.quantity} x ${meal.price}
            </p>
            <div className="cart-item-actions">
              <button onClick={() => onRemoveQuantity(meal)}>-</button>
              <p>{meal.quantity}</p>
              <button onClick={() => onAddQuantity(meal)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="modal-actions meal-item-actions">${totalCartSum}</div>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        <button className="button">Go to checkout</button>
      </div>
    </div>
  );
}

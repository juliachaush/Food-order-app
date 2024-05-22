import { useState } from "react";

export default function Cart({
  onClose,
  addToCart,
  onAddQuantity,
  onRemoveQuantity,
  onCheckout,
  totalCartSum,
}) {
  const filteredMealsQuantity = addToCart.filter((item) =>
    item.quantity > 0 ? true : false
  );

  console.log(addToCart);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul className="meal-item-actions">
        {filteredMealsQuantity.map((meal) => (
          <li key={meal.id} className="cart-item">
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
        <button className="button" onClick={onCheckout}>
          Go to checkout
        </button>
      </div>
    </div>
  );
}

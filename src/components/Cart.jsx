import { useState } from "react";
import { currencyFormatter } from "../util/formatting";

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
              {meal.name} {meal.quantity} x{" "}
              {currencyFormatter.format(meal.price)}
            </p>
            <div className="cart-item-actions">
              <button onClick={() => onRemoveQuantity(meal)}>-</button>
              <p>{meal.quantity}</p>
              <button onClick={() => onAddQuantity(meal)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="modal-actions meal-item-actions">
        {currencyFormatter.format(totalCartSum)}
      </div>
      <p className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        {filteredMealsQuantity.length > 0 && (
          <button className="button" onClick={onCheckout}>
            Go to checkout
          </button>
        )}
      </p>
    </div>
  );
}

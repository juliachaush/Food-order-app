export default function Cart({ onClose }) {
  return (
    <div>
      <h3>Your Cart</h3>
      <ul className="meal-item-actions">
        <li className="cart-item">
          <p>Sea food</p>
          <div className="cart-item-actions">
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
        </li>
      </ul>
      <div className="modal-actions meal-item-actions">$53.97</div>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        <button className="button">Go to checkout</button>
      </div>
    </div>
  );
}

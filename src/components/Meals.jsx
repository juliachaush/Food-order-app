import { currencyFormatter } from "../util/formatting";

export default function Meals({
  meals,
  isLoading,
  loadingText,
  fallbackText,
  onAddToCartClick,
}) {
  const maxLength = 100;

  return (
    <section>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && meals.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}
      {!isLoading && meals.length > 0 && (
        <ul id="meals">
          {meals.map((meal) => (
            <li key={meal.id} className="meal-item">
              <img
                src={`http://localhost:3000/${meal.image}`}
                alt={meal.name}
              />
              <h3>{meal.name}</h3>
              <p className="meal-item-price">
                {currencyFormatter.format(meal.price)}
              </p>
              <p className="meal-item-description meal-item-actions">
                {meal.description.length > maxLength
                  ? meal.description.slice(0, maxLength)
                  : meal.description}
              </p>

              <button
                className="button meal-item-actions"
                onClick={() => onAddToCartClick(meal)}
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

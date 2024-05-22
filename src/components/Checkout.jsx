import Input from "./Input";
import { useInput } from "../hooks/useInput";

import { isEmail, isNotEmpty } from "../util/validation";

export default function Checkout({ totalCartSum, onClose, addToCart }) {
  const {
    value: emailValue,
    handleInputChange: handlEmailChange,
    handleInputBlure: handlEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: fullNameValue,
    handleInputChange: handlFullNameChange,
    handleInputBlure: handlFullNameBlur,
    hasError: fullNameHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: streetValue,
    handleInputChange: handlstreetChange,
    handleInputBlure: handlstreetBlur,
    hasError: streetHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: postalCodeValue,
    handleInputChange: handlPostalCodeChange,
    handleInputBlure: handlPostalCodeBlur,
    hasError: postalCodeHasError,
  } = useInput("", (value) => isNotEmpty(value));

  const {
    value: cityValue,
    handleInputChange: handlCityChange,
    handleInputBlure: handlCityBlur,
    hasError: cityHasError,
  } = useInput("", (value) => isNotEmpty(value));

  function handleSubmit(event) {
    event.preventDefault();

    if (
      emailHasError ||
      fullNameHasError ||
      streetHasError ||
      postalCodeHasError ||
      cityHasError
    ) {
      return;
    }

    const orderData = {
      name: fullNameValue,
      email: emailValue,
      street: streetValue,
      "postal-code": postalCodeValue,
      city: cityValue,
    };

    const filteredMealsQuantity = addToCart.filter((item) =>
      item.quantity > 0 ? true : false
    );

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: filteredMealsQuantity,
          customer: orderData,
        },
      }),
    });

    console.log(emailValue, fullNameValue);
  }
  return (
    <form className="control" onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <p>Total amount ${totalCartSum}</p>

      <Input
        label="Full Name"
        id="name"
        type="text"
        name="fullName"
        onBlur={handlFullNameBlur}
        onChange={handlFullNameChange}
        value={fullNameValue}
        error={fullNameHasError && "Please enter a valid fullName"}
      />
      <Input
        label="E-Mail Adress"
        id="email"
        type="email"
        name="email"
        onBlur={handlEmailBlur}
        onChange={handlEmailChange}
        value={emailValue}
        error={emailHasError && "Please enter a valid email"}
      />
      <Input
        label="Street"
        id="street"
        type="text"
        name="street"
        onBlur={handlstreetBlur}
        onChange={handlstreetChange}
        value={streetValue}
        error={streetHasError && "Please enter a valid street"}
      />
      <div className="control-row">
        <Input
          label="Postal Code"
          id="postal-code"
          type="text"
          name="postalCode"
          onBlur={handlPostalCodeBlur}
          onChange={handlPostalCodeChange}
          value={postalCodeValue}
          error={postalCodeHasError && "Please enter a valid Postal Code"}
        />
        <Input
          label="City"
          id="city"
          type="text"
          name="city"
          onBlur={handlCityBlur}
          onChange={handlCityChange}
          value={cityValue}
          error={cityHasError && "Please enter a valid City"}
        />
      </div>

      <p className="modal-actions">
        <button className="text-button" onClose={onClose}>
          Close
        </button>
        <button className="button">Go to checkout</button>
      </p>
    </form>
  );
}

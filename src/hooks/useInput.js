import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  const [didEdit, setDidiEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidiEdit(false);
  }

  function handleInputBlure() {
    setDidiEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlure,
    hasError: didEdit && !valueIsValid,
  };
}

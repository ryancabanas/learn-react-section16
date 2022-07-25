import { useState } from 'react';

const useInput2 = (valueValidator) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = valueValidator(enteredValue);
  const inputHasError = !valueIsValid && isTouched;

  const changeHandler = (event) => setEnteredValue(event.target.value);
  const blurHandler = () => setIsTouched(true);

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    valueIsValid,
    inputHasError,
    changeHandler,
    blurHandler,
    reset,
  };
};

export default useInput2;

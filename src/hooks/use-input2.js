import { useReducer } from 'react';

const initialInputState = {
  enteredValue: '',
  isTouched: false,
};

const inputReducer = (prevState, action) => {
  if (action.type === 'INPUT') {
    return { ...prevState, enteredValue: action.value };
  } else if (action.type === 'BLUR') {
    return { ...prevState, isTouched: true };
  } else if (action.type === 'RESET') {
    return { ...prevState, enteredValue: '', isTouched: false };
  } else {
    return initialInputState;
  }
};

const useInput2 = (valueValidator) => {
  const [inputState, inputDispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  const valueIsValid = valueValidator(inputState.enteredValue);
  const inputHasError = !valueIsValid && inputState.isTouched;

  const changeHandler = (event) => {
    inputDispatch({ type: 'INPUT', value: event.target.value });
  };

  const blurHandler = () => {
    inputDispatch({ type: 'BLUR' });
  };

  const reset = () => {
    inputDispatch({ type: 'RESET' });
  };

  return {
    value: inputState.enteredValue,
    valueIsValid,
    inputHasError,
    changeHandler,
    blurHandler,
    reset,
  };
};

export default useInput2;

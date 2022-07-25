import { useState } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHander,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  // Email states
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // Email validation
  const emailRegEx = /^[\w.]+[+]*[\w.]*@\w+\.\w+$/;
  const enteredEmailIsValid = emailRegEx.test(enteredEmail.trim());
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  // Form validation tracking
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // Email functions
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredEmailTouched(true);

    if (nameInputHasError || !enteredEmailIsValid) {
      return;
    }

    console.log(`Name: ${enteredName.trim()}`);
    console.log(`Email: ${enteredEmail.trim()}`);

    resetNameInput();

    setEnteredEmail('');

    setEnteredEmailTouched(false);
  };

  // Name CSS class
  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  // Email CSS class
  const emailInputClasses = emailInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          value={enteredName}
          onBlur={nameBlurHander}
        />
        {nameInputHasError && (
          <p className="error-text">
            Name must not be empty, or all whitespace.
          </p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          value={enteredEmail}
          onBlur={emailInputBlurHandler}
        />
        {emailInputIsInvalid && <p className="error-text">Email is invalid.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

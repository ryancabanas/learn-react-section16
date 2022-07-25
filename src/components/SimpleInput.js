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

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHander,
    reset: resetEmailInput,
  } = useInput((value) => {
    const emailRegEx = /^[\w.]+[+]*[\w.]*@\w+\.\w+$/;
    return emailRegEx.test(value.trim());
  });

  // Form validation tracking
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (nameInputHasError || !enteredEmailIsValid) {
      return;
    }

    console.log(`Name: ${enteredName.trim()}`);
    console.log(`Email: ${enteredEmail.trim()}`);

    resetNameInput();
    resetEmailInput();
  };

  // Name CSS class
  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  // Email CSS class
  const emailInputClasses = emailInputHasError
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
          onChange={emailChangeHandler}
          value={enteredEmail}
          onBlur={emailBlurHander}
        />
        {emailInputHasError && <p className="error-text">Email is invalid.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

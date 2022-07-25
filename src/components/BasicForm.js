import useInput2 from '../hooks/use-input2';

const BasicForm = (props) => {
  const {
    value: firstName,
    valueIsValid: firstNameIsValid,
    inputHasError: firstNameHasError,
    changeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput2((value) => value.trim() !== '');

  const {
    value: lastName,
    valueIsValid: lastNameIsValid,
    inputHasError: lastNameHasError,
    changeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput2((value) => value.trim() !== '');

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);

    resetFirstName();
    resetLastName();
  };

  const formIsValid = firstNameIsValid && lastNameIsValid;

  const firstNameClasses = firstNameHasError
    ? 'form-control invalid'
    : 'form-control';

  const lastNameClasses = lastNameHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={firstName}
          />
          {firstNameHasError && (
            <p className="error-text">Cannot be empty, or all whitespace</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={lastName}
          />
          {lastNameHasError && (
            <p className="error-text">Cannot be empty, or all whitespace</p>
          )}
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="email">E-Mail Address</label>
        <input type="email" id="email" />
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

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

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    console.log(`First Name: ${firstName}`);
    resetFirstName();
  };

  const formIsValid = firstNameIsValid;

  const firstNameClasses = firstNameHasError
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
        <div className="form-control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />
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

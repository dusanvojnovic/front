import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../UIElements/Button';
import Input from './Input';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import Modal from '../UIElements/Modal';
import { useHttpClient } from '../../hooks/http-hook';
import useForm from '../../hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../validators/validators';
import { AuthContext } from '../../context/auth-context';

import classes from './Form.module.css';

const Form = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        authCtx.login(responseData.id, responseData.token);
        history.push(`/`);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/signup',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            username: formState.inputs.username.value,
            password: formState.inputs.password.value,
            confirmedPassword: formState.inputs.confirmedPassword.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        authCtx.login(responseData.userId, responseData.token);
        history.push(`/`);
      } catch (err) {}
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          username: undefined,
          confirmedPassword: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: '',
            isValid: false,
          },
          confirmedPassword: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((previousMode) => !previousMode);
  };

  return (
    <>
      {error && (
        <Modal
          show
          header="An Error Occured!"
          onButtonClick={clearError}
          onClick={clearError}
        >
          {error}
        </Modal>
      )}
      <div className={classes.formContainer}>
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={formSubmitHandler}>
          <input type="hidden" value="prayer" />
          <div className={classes.formInputs}>
            <label htmlFor="userEmail">email</label>
            <Input
              id="email"
              type="email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="please enter a valid email address"
              onInput={inputHandler}
              autocomplete="off"
            />
          </div>
          {!isLoginMode && (
            <div className={classes.formInputs}>
              <label htmlFor="password">username</label>
              <Input
                id="username"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a username"
                onInput={inputHandler}
                autocomplete="off"
              />
            </div>
          )}
          <div className={classes.formInputs}>
            <label htmlFor="password">password</label>
            <Input
              id="password"
              type="password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="please enter a valid password (at least 6 characters)"
              onInput={inputHandler}
              autocomplete="off"
            />
          </div>
          {!isLoginMode && (
            <div className={classes.formInputs}>
              <label htmlFor="password">confirm password</label>
              <Input
                id="confirmedPassword"
                type="password"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please confirm your password"
                onInput={inputHandler}
                autocomplete="off"
              />
            </div>
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'login' : 'signup'}
          </Button>
        </form>
        <Button class={classes.last} onClick={switchModeHandler}>
          switch to {isLoginMode ? 'signup' : 'login'}
        </Button>
      </div>
    </>
  );
};

export default Form;

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../../shared/components/UIElements/Button';
import Input from '../../../shared/components/Form/Input';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import useForm from '../../../shared/hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../shared/validators/validators';
import { AuthContext } from '../../../shared/context/auth-context';

import classes from './AddMovieForm.module.css';

const AddMovieForm = () => {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      year: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const movieId = Math.floor(Math.random() * 1000) + 1;

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/movies`,
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          year: formState.inputs.year.value,
          description: formState.inputs.description.value,
          imageUrl: formState.inputs.image.value,
          movieId: movieId,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      history.push(`/${authCtx.userId}/movies`);
    } catch (err) {
      console.log(err);
    }
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
            <label htmlFor="title">title</label>
            <Input
              element="input"
              id="title"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="please enter a movie title"
              onInput={inputHandler}
              autocomplete="off"
            />
          </div>
          <div className={classes.formInputs}>
            <label htmlFor="year">year</label>
            <Input
              element="input"
              id="year"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="please enter a movie year"
              onInput={inputHandler}
              autocomplete="off"
            />
          </div>
          <div className={classes.formInputs}>
            <label htmlFor="description">description</label>
            <Input
              id="description"
              type="text"
              element="textarea"
              className={classes.textarea}
              rows="3"
              validators={[VALIDATOR_MINLENGTH(10)]}
              errorText="please enter a movie description(min 10 characters)"
              onInput={inputHandler}
              autocomplete="off"
            />
          </div>
          <div className={classes.formInputs}>
            <label htmlFor="image">image url</label>
            <Input
              element="input"
              id="image"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="please enter a movie image url"
              onInput={inputHandler}
              autocomplete="off"
            />
          </div>
          <Button
            onClick={formSubmitHandler}
            type="submit"
            disabled={!formState.isValid}
          >
            add movie
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddMovieForm;

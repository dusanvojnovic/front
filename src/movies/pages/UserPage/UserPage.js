import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useHttpClient } from '../../../shared/hooks/http-hook';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../../shared/components/UIElements/Modal';
import MoviesList from '../../components/MoviesList/MoviesList';
import Button from '../../../shared/components/UIElements/Button';
import classes from './UserPage.module.css';

const UserPage = () => {
  const [loadedMovies, setLoadedMovies] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;
  const history = useHistory();

  const goToSearchPageHandler = () => {
    history.push('/search');
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/movies/user/${userId}`
        );
        setLoadedMovies(responseData.movies);
      } catch (err) {}
    };
    fetchMovies();
  }, [sendRequest, userId]);

  const deleteMovieHandler = (deletedMovieId) => {
    setLoadedMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== deletedMovieId)
    );
  };

  return (
    <div className={classes.page}>
      {error && (
        <Modal
          show
          header="Ooops!"
          onClick={clearError}
          onButtonClick={clearError}
          errorModal
        >
          {error}
        </Modal>
      )}
      {isLoading && <LoadingSpinner asOverlay />}
      <div className={classes.welcomeMessage}>
        <p className={classes.textMessage}>
          Add movie to your
          <span className={classes.title}>&nbsp;WatchList</span>
        </p>
        <Button onClick={goToSearchPageHandler}>add movie</Button>
      </div>
      {!isLoading && loadedMovies && (
        <div className={classes.movies}>
          <MoviesList items={loadedMovies} onDeleteMovie={deleteMovieHandler} />
        </div>
      )}
    </div>
  );
};

export default UserPage;

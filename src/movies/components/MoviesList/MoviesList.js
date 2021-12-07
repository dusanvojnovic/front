import MovieCard from '../MovieCard/MovieCard';

import classes from './MovieList.module.css'

const MoviesList = (props) => {
  return (
    <ul className={classes.moviesList}>
      {props.items.map((movie) => (
        <MovieCard
          imageUrl={movie.imageUrl}
          id={movie.id}
          title={movie.title}
          description={movie.description}
          year={movie.year}
          key={movie.description}
          onClick={props.onClick}
          onDelete={props.onDeleteMovie}
        />
      ))}
    </ul>
  );
};

export default MoviesList;

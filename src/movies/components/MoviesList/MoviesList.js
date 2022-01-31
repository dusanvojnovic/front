import MovieCard from '../MovieCard/MovieCard';

const MoviesList = (props) => {
  return (
    <section>
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
    </section>
  );
};

export default MoviesList;

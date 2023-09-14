import PropTypes from "prop-types";

function Card({ movie }) {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  console.log(movie);

  return (
    <div className="movie-card" data-testid="movie-card">
      {movie.poster_path && (
        <img
          src={`${IMAGE_URL}${movie.poster_path}`}
          data-testid="movie-poster"
          alt=""
        />
      )}
      <h5 data-testid="movie-title">{movie.title}</h5>
    </div>
  );
}

Card.propTypes = {
  movie: PropTypes.object,
};
export default Card;

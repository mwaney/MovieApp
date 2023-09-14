import PropTypes from "prop-types";

function Card({ movie, onCardClick }) {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  const handleCardClick = () => {
    onCardClick(movie);
  };

  return (
    <div
      className="movie-card"
      data-testid="movie-card"
      onClick={handleCardClick}
    >
      {movie.poster_path ? (
        <img
          src={`${IMAGE_URL}${movie.poster_path}`}
          data-testid="movie-poster"
          alt=""
        />
      ) : (
        <div className="movie-placeholder">No Image Found</div>
      )}
      <h5 data-testid="movie-title">{movie.title}</h5>
    </div>
  );
}

Card.propTypes = {
  movie: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
export default Card;

import PropTypes from "prop-types";
import Rating from "./Rating";
import Genres from "./Genres";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const APIKEY = import.meta.env.VITE_APIKEY;

function Card({ movie, onCardClick }) {
  const [isClicked, setIsClicked] = useState(false);
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  const handleCardClick = () => {
    onCardClick(movie);
  };

  const utcDate = () => {
    const releaseDate = new Date(movie.release_date);
    const year = releaseDate.getUTCFullYear();
    return year;
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const badgeClass = `badge ${isClicked && "clicked"}`;
  return (
    <div
      data-testid="movie-card"
      className="movie-card"
      onClick={handleCardClick}
    >
      <div className={badgeClass} onClick={handleClick}>
        <FontAwesomeIcon icon={faHeart} />
      </div>
      {/* {movie.poster_path ? (
        <img
          data-testid="movie-poster"
          src={`${IMAGE_URL}${movie.poster_path}`}
          alt=""
        />
      ) : (
        <div className="movie-placeholder">No Image Found</div>
      )} */}

      <Link to={`/movies/${movie.id}`}>
        {movie.poster_path ? (
          <img
            data-testid="movie-poster"
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt=""
          />
        ) : (
          <div className="movie-placeholder">No Image Found</div>
        )}
      </Link>
      <p data-testid="movie-release-date" className="p-3 m-2 text-gray-200">
        Release Date: {utcDate()}
      </p>

      <h5
        data-testid="movie-title"
        className="text-gray-900 text-base font-bold"
      >
        {movie.title}
      </h5>
      <Rating className="text-gray-900 text-2xs" selectedMovie={movie} />

      <Genres className="text-gray-400" apiKey={APIKEY} movieId={movie.id} />
    </div>
  );
}

Card.propTypes = {
  movie: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
export default Card;

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

  // const utcDate = () => {
  //   console.log(movie.release_date);
  //   const releaseDate = new Date(movie.release_date);
  //   const formattedDate = releaseDate.toISOString().split("T")[0];
  //   return formattedDate;
  // };
  function utcDate(dateString) {
    try {
      // Attempt to create a Date object from the dateString
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // Handle the case where the date is invalid (e.g., dateString is not a valid date)
        return "Invalid Date";
      }
      // Convert the valid date to UTC format
      return date.toISOString().split("T")[0];
    } catch (error) {
      // Handle any other errors that might occur during date processing
      console.error("Error processing date:", error);
      return "Error"; // You can customize the error message as needed
    }
  }

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

      <Link to={`/movies/${movie.id}`}>
        {movie.poster_path ? (
          <img
            data-testid="movie-poster"
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt=""
          />
        ) : (
          <img data-testid="movie-poster" src="/poster" alt="" />
        )}
      </Link>
      <p data-testid="movie-release-date" className="">
        {utcDate(movie.release_date)}
      </p>

      <h5 data-testid="movie-title" className="">
        {movie.title}
      </h5>
      <Rating className="card-rate" selectedMovie={movie} />

      <Genres className="" apiKey={APIKEY} movieId={movie.id} />
    </div>
  );
}

Card.propTypes = {
  movie: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
export default Card;

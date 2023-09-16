import PropTypes from "prop-types";

function Rating({ selectedMovie, className }) {
  function generateRandomRating() {
    const minRating = 60; // Minimum rating (60%)
    const maxRating = 100; // Maximum rating (100%)

    // Generate a random whole number between minRating and maxRating (inclusive)
    const rating =
      Math.floor(Math.random() * (maxRating - minRating + 1)) + minRating;

    return rating;
  }

  // Example usage
  const randomRating = generateRandomRating();

  return (
    <div className={`rating ${className}`}>
      <div className="imdb-rating center">
        <img src="src/assets/IMDB.png" alt="" className="imdb-img" />
        {(selectedMovie?.vote_average * 10).toFixed(1)}/100
      </div>
      {selectedMovie && ( // Conditional rendering
        <div className="rt-rating center">
          <img src="src/assets/rotten_tomato.png" alt="" className="rt-img" />
          {randomRating}%
        </div>
      )}
    </div>
  );
}

Rating.propTypes = {
  selectedMovie: PropTypes.object,
  className: PropTypes.string,
};
export default Rating;

import PropTypes from "prop-types";

function Rating({ selectedMovie }) {
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
    <div className="rating flex gap-2">
      <div className="imdb-rating flex items-center mr-6">
        <img src="src/assets/IMDB.png" alt="" className="w-8 h-4 mr-2" />
        <p>{(selectedMovie?.vote_average * 10).toFixed(1)}/100</p>
      </div>
      {selectedMovie && ( // Conditional rendering
        <div className="rt-rating flex items-center">
          <img
            src="src/assets/rotten_tomato.png"
            alt=""
            className="w-4 h-4 mr-2"
          />
          <p>{randomRating}%</p>
        </div>
      )}
    </div>
  );
}

Rating.propTypes = {
  selectedMovie: PropTypes.object,
};
export default Rating;

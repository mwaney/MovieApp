import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const Genres = ({ apiKey, movieId }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Fetch the list of genres for the specific movie using its ID
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: apiKey,
        },
      })
      .then((response) => {
        // Extract the list of genres from the response
        const fetchedGenres = response.data.genres;
        setGenres(fetchedGenres);
      })
      .catch((error) => {
        console.error("Error fetching movie genres:", error);
      });
  }, [apiKey, movieId]);

  return (
    <div>
      <span>
        {genres.map((genre, index) => (
          <span style={{ color: "gray" }} key={genre.id}>
            {genre.name}
            {index < genres.length - 1 && ", "}
          </span>
        ))}
      </span>
    </div>
  );
};

Genres.propTypes = {
  movieId: PropTypes.number,
  apiKey: PropTypes.string,
};
export default Genres;

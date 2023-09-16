import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const APIKEY = import.meta.env.VITE_APIKEY;

function fetchCurrentMovieData(currentMovieIndex, movies, setCurrentMovie) {
  if (movies.length > 0) {
    const currentMovieId = movies[currentMovieIndex].id;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${currentMovieId}?api_key=${APIKEY}`
      )
      .then((response) => {
        if (response.status === 200) {
          setCurrentMovie(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
        setCurrentMovie(null);
      });
  }
}

function Header({
  movies,
  fetchMovies,
  selectedMovie,
  currentMovie,
  setCurrentMovie,
}) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const memoizedFetchCurrentMovieData = useCallback(() => {
    fetchCurrentMovieData(currentMovieIndex, movies, setCurrentMovie);
  }, [currentMovieIndex, movies, setCurrentMovie]);

  useEffect(() => {
    memoizedFetchCurrentMovieData();

    let intervalId;

    const createInterval = () => {
      intervalId = setInterval(() => {
        setCurrentMovieIndex((prevIndex) =>
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);
    };

    createInterval();

    return () => {
      clearInterval(intervalId);
    };
  }, [memoizedFetchCurrentMovieData, movies]);

  const IMAGE_URL = "https://image.tmdb.org/t/p/original";
  const currentImageUrl =
    (selectedMovie?.backdrop_path || currentMovie?.backdrop_path) &&
    `${IMAGE_URL}${
      selectedMovie?.backdrop_path || currentMovie?.backdrop_path
    }`;

  const searchMovies = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetchMovies(search)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  function trimOverview(overview) {
    if (overview && overview.length > 200) {
      return overview.slice(0, 200) + "...";
    }
    return overview;
  }

  return (
    <div
      data-testid="movie-poster"
      className="custom-header-container"
      style={{
        backgroundImage: `url(${currentImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        height: "500px",
      }}
    >
      <div className="container-header">
        <div className="custom-container">
          <div className="custom-logo">
            <img src="tv.png" alt="logo" className="custom-logo-image" />
            <h2 className="custom-logo-text">MovieBox</h2>
          </div>
          <form onSubmit={searchMovies} className="custom-search-form">
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What do you want to watch?"
              className="custom-search-input"
            />
            <button className="custom-search-button">
              {isLoading ? (
                <div className="custom-spinner"></div>
              ) : (
                <FontAwesomeIcon icon={faSearch} />
              )}
            </button>
          </form>
          <div className="custom-sign-in">
            <p className="custom-sign-in-text">Sign in</p>
            <FontAwesomeIcon icon={faBars} className="custom-bars-icon" />
          </div>
        </div>
        <div className="custom-details-container">
          <aside className="custom-details">
            <div className="custom-title">
              <h2 className="custom-header-title">
                {selectedMovie ? selectedMovie.title : "Loading..."}
              </h2>
            </div>
            <Rating
              data-testid="movie-title"
              className="header-rate"
              selectedMovie={selectedMovie}
            />
            <div className="custom-description" data-testid="movie-overview">
              <p>
                {selectedMovie
                  ? trimOverview(selectedMovie.overview)
                  : "Loading..."}
              </p>
            </div>
            <Link
              to={`/movies/${selectedMovie?.id}`}
              className="custom-watch-trailer"
            >
              <span className="custom-play-icon center">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="custom-play-icon-text"
                />
              </span>
              <span>WATCH TRAILER</span>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  movies: PropTypes.array,
  fetchMovies: PropTypes.func,
  selectedMovie: PropTypes.object,
  currentMovie: PropTypes.object,
  setCurrentMovie: PropTypes.func,
};

export default Header;

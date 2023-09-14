import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const APIKEY = import.meta.env.VITE_APIKEY;

function fetchCurrentMovieData(currentMovieIndex, movies, setCurrentMovie) {
  console.log("Received movies in fetchCurrentMovieData:", movies);
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

  // Wrap fetchCurrentMovieData in useCallback
  const memoizedFetchCurrentMovieData = useCallback(() => {
    fetchCurrentMovieData(currentMovieIndex, movies, setCurrentMovie);
  }, [currentMovieIndex, movies, setCurrentMovie]);

  useEffect(() => {
    // Fetch data for the current movie when the component mounts
    memoizedFetchCurrentMovieData();

    const interval = setInterval(() => {
      // Increment the index or reset to 0 if it reaches the end
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change movie every 10 seconds (10000 milliseconds)

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [memoizedFetchCurrentMovieData, movies]);

  const IMAGE_URL = "https://image.tmdb.org/t/p/original";
  const currentImageUrl =
    (selectedMovie && selectedMovie.backdrop_path) ||
    (currentMovie && currentMovie.backdrop_path)
      ? `${IMAGE_URL}${
          (selectedMovie && selectedMovie.backdrop_path) ||
          (currentMovie && currentMovie.backdrop_path) ||
          ""
        }`
      : "";

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(search);
  };

  return (
    <div
      className="py-4 header-container"
      style={{
        backgroundImage: `url(${currentImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto flex justify-between items-start">
        <div className="flex items-center">
          <img src="src/assets/tv.png" alt="logo" className="w-8 h-8 mr-2" />
          <h2 className="text-white text-lg font-semibold">MovieBox</h2>
        </div>
        <form
          onSubmit={searchMovies}
          className="flex items-center bg-white bg-opacity-30 rounded-lg p-2 space-x-2 w-120"
        >
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What do you want to watch?"
            className="bg-transparent border-none focus:outline-none w-80 px-4 py-2 rounded-lg border-2 border-gray-300"
          />
          <button
            type="submit"
            className="flex items-center justify-center w-10 h-10"
          >
            {" "}
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <div className="text-white flex items-center">
          <p className="mr-4">Sign in</p>
          <FontAwesomeIcon
            icon={faBars}
            className="w-6 h-6 rounded-full bg-red-500 p-2"
          />
        </div>
      </div>
      <div className="container mx-auto mt-24 ml-21">
        <aside className="flex flex-col items-start max-w-[404px] gap-4">
          <div className="title">
            <h2 className="text-white text-2xl font-bold header-title">
              {selectedMovie ? selectedMovie.title : "Loading..."}
            </h2>
          </div>
          <div className="rating flex gap-2">
            <div className="imdb-rating flex items-center mr-6">
              <img src="src/assets/IMDB.png" alt="" className="w-8 h-4 mr-2" />
              <p className="text-white">86.0</p>
            </div>
            <div className="rt-rating flex items-center">
              <img
                src="src/assets/rotten_tomato.png"
                alt=""
                className="w-4 h-4 mr-2"
              />
              <p className="text-white">97%</p>
            </div>
          </div>
          <div className="description text-white">
            <p>{selectedMovie ? selectedMovie.overview : "Loading..."}</p>
          </div>
          <button className="bg-red-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
            <span className="bg-white rounded-full p-2 w-10">
              <FontAwesomeIcon icon={faPlay} className="text-red-700" />
            </span>
            <span>WATCH TRAILER</span>
          </button>
        </aside>
      </div>
    </div>
  );
}

Header.propTypes = {
  movies: PropTypes.array,
  fetchMovies: PropTypes.func,
  selectedMovie: PropTypes.object,
  currentMovie: PropTypes.object,
  setCurrentMovie: PropTypes.func, // Add setCurrentMovie prop
};

export default Header;

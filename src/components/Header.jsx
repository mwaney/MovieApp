// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faBars, faPlay } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useState, useCallback } from "react";
// import PropTypes from "prop-types";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Rating from "./Rating";

// const APIKEY = import.meta.env.VITE_APIKEY;

// function fetchCurrentMovieData(currentMovieIndex, movies, setCurrentMovie) {
//   if (movies.length > 0) {
//     const currentMovieId = movies[currentMovieIndex].id;
//     axios
//       .get(
//         `https://api.themoviedb.org/3/movie/${currentMovieId}?api_key=${APIKEY}`
//       )
//       .then((response) => {
//         if (response.status === 200) {
//           setCurrentMovie(response.data);
//         } else {
//           throw new Error("Failed to fetch data");
//         }
//       })
//       .catch((error) => {
//         // Handle errors
//         console.log(error);
//         setCurrentMovie(null);
//       });
//   }
// }

// function Header({
//   movies,
//   fetchMovies,
//   selectedMovie,
//   currentMovie,
//   setCurrentMovie,
// }) {
//   const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
//   const [search, setSearch] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   // const navigate = useNavigate();

//   // Wrap fetchCurrentMovieData in useCallback
//   const memoizedFetchCurrentMovieData = useCallback(() => {
//     fetchCurrentMovieData(currentMovieIndex, movies, setCurrentMovie);
//   }, [currentMovieIndex, movies, setCurrentMovie]);

//   useEffect(() => {
//     // Fetch data for the current movie when the component mounts
//     memoizedFetchCurrentMovieData();

//     let intervalId; // Declare a variable to hold the interval ID

//     // Create a new interval whenever `movies` changes
//     const createInterval = () => {
//       intervalId = setInterval(() => {
//         // Increment the index or reset to 0 if it reaches the end
//         setCurrentMovieIndex((prevIndex) =>
//           prevIndex === movies.length - 1 ? 0 : prevIndex + 1
//         );
//       }, 10000); // Change movie every 10 seconds (10000 milliseconds)
//     };

//     createInterval(); // Initial interval creation

//     // Clear the interval on component unmount and when `movies` changes
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [memoizedFetchCurrentMovieData, movies]);

//   const IMAGE_URL = "https://image.tmdb.org/t/p/original";
//   const currentImageUrl =
//     (selectedMovie?.backdrop_path || currentMovie?.backdrop_path) &&
//     `${IMAGE_URL}${
//       selectedMovie?.backdrop_path || currentMovie?.backdrop_path
//     }`;

//   const searchMovies = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     fetchMovies(search)
//       .then(() => setIsLoading(false))
//       .catch(() => setIsLoading(false));
//   };

//   // const handleWatchTrailerClick = async (selectedMovie) => {
//   //   // Check if selectedMovie and selectedMovie.videos exist
//   //   if (selectedMovie && selectedMovie.videos) {
//   //     console.log(selectedMovie.videos);
//   //     const trailer = await selectedMovie.videos.results.find(
//   //       (vid) => vid.name === "Official Trailer"
//   //     );

//   //     if (trailer) {
//   //       const videoId = trailer.key;

//   //       // Use the navigate function to navigate to the Trailer component and pass the videoId as a parameter
//   //       navigate(`/trailer/${videoId}`);
//   //     } else {
//   //       console.error("Official Trailer not found");
//   //     }
//   //   } else {
//   //     console.error("No selected movie or video data available");
//   //   }
//   // };

//   return (
//     <div
//       data-testid="movie-poster"
//       className="py-4 header-container"
//       style={{
//         backgroundImage: `url(${currentImageUrl})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="container mx-auto flex justify-between items-start">
//         <div className="flex items-center">
//           <img src="src/assets/tv.png" alt="logo" className="w-8 h-8 mr-2" />
//           <h2 className="text-white text-lg font-semibold">MovieBox</h2>
//         </div>
//         <form
//           onSubmit={searchMovies}
//           className="flex items-center bg-transparent border-2 border-white rounded-lg p-2 space-x-2 w-120"
//         >
//           <input
//             type="text"
//             name="search"
//             id="search"
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="What do you want to watch?"
//             className="bg-transparent border-none focus:outline-none w-80 px-4 py-2 rounded-lg border-2"
//           />
//           <button
//             type="submit"
//             className="flex items-center justify-center w-10 h-10"
//           >
//             {isLoading ? (
//               // Show a loading indicator while isLoading is true
//               <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
//             ) : (
//               // Show the search icon when isLoading is false
//               <FontAwesomeIcon icon={faSearch} />
//             )}
//           </button>
//         </form>
//         <div className="text-white flex items-center">
//           <p className="mr-4 font-bold">Sign in</p>
//           <FontAwesomeIcon
//             icon={faBars}
//             className="w-6 h-6 rounded-full bg-red-500 p-2"
//           />
//         </div>
//       </div>
//       <div className="container mx-auto mt-24 ml-21">
//         <aside className="flex flex-col items-start max-w-[404px] gap-4">
//           <div className="title">
//             <h2 className="text-white text-2xl font-bold header-title">
//               {selectedMovie ? selectedMovie.title : "Loading..."}
//             </h2>
//           </div>
//           <Rating selectedMovie={selectedMovie} />

//           <div className="description text-white">
//             <p>{selectedMovie ? selectedMovie.overview : "Loading..."}</p>
//           </div>
//           <Link
//             to={`/movies/${selectedMovie?.id}`}
//             className="bg-red-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
//           >
//             <span className="bg-white rounded-full p-2 w-10">
//               <FontAwesomeIcon
//                 icon={faPlay}
//                 className="text-red-700 text-2xl mr-4"
//               />
//             </span>
//             <span>WATCH TRAILER</span>
//           </Link>
//         </aside>
//       </div>
//     </div>
//   );
// }

// Header.propTypes = {
//   movies: PropTypes.array,
//   fetchMovies: PropTypes.func,
//   selectedMovie: PropTypes.object,
//   currentMovie: PropTypes.object,
//   setCurrentMovie: PropTypes.func, // Add setCurrentMovie prop
// };

// export default Header;

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
            <img
              src="src/assets/tv.png"
              alt="logo"
              className="custom-logo-image"
            />
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

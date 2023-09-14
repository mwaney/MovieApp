import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";

const APIKEY = import.meta.env.VITE_APIKEY;

// function App() {
//   const [moviesData, setMoviesData] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   const URL = "https://api.themoviedb.org/3";

//   const fetchMovies = async (searchKey) => {
//     const type = searchKey ? "search" : "discover";
//     const { data } = await axios.get(`${URL}/${type}/movie`, {
//       params: {
//         api_key: APIKEY,
//         query: searchKey,
//       },
//     });
//     setMoviesData(data.results);
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const handleCardClick = (movie) => {
//     setSelectedMovie(movie);
//   };

//   const showMovies = () => {
//     return moviesData.map((movie) => (
//       <Card key={movie.id} movie={movie} onCardClick={handleCardClick} />
//     ));
//   };
//   return (
//     <>
//       <Header
//         movies={moviesData}
//         selectedMovie={selectedMovie}
//         fetchMovies={fetchMovies}
//       />
//       <div className="movielist-container">{showMovies()}</div>
//     </>
//   );
// }

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const URL = "https://api.themoviedb.org/3";

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const { data } = await axios.get(`${URL}/${type}/movie`, {
      params: {
        api_key: APIKEY,
        query: searchKey,
      },
    });
    setMoviesData(data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const showMovies = () => {
    return moviesData.map((movie) => (
      <Card key={movie.id} movie={movie} onCardClick={handleCardClick} />
    ));
  };

  return (
    <>
      {/* Pass setCurrentMovie as a prop to Header */}
      <Header
        movies={moviesData}
        fetchMovies={fetchMovies}
        selectedMovie={selectedMovie}
        currentMovie={selectedMovie}
        setCurrentMovie={setSelectedMovie}
      />
      <div className="movielist-container">{showMovies()}</div>
    </>
  );
}

export default App;

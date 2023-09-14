import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";

const APIKEY = import.meta.env.VITE_APIKEY;

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const URL = "https://api.themoviedb.org/3";
  const fetchMovies = async () => {
    const { data } = await axios.get(`${URL}/discover/movie`, {
      params: {
        api_key: APIKEY,
      },
    });
    setMoviesData(data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const showMovies = () => {
    return moviesData.map((movie) => <Card key={movie.id} movie={movie} />);
  };
  return (
    <>
      <Header />
      <div className="movielist-container">{showMovies()}</div>
    </>
  );
}

export default App;

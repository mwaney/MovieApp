import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Header from "./Header";
import Spinner from "./Spinner";
import Trailer from "./Trailer";
import Footer from "./Footer";

const APIKEY = import.meta.env.VITE_APIKEY;

function Home() {
  const [moviesData, setMoviesData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  const URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    if (initialLoad) {
      fetchTopRatedMovies(); // Fetch top-rated movies only on initial load
      setInitialLoad(false);
    } else {
      if (searchQuery) {
        // If search query is provided, fetch movies by search
        fetchMovies(searchQuery);
      } else {
        // If no search query, fetch top-rated movies again
        fetchTopRatedMovies();
      }
    }
  }, [searchQuery, initialLoad]);

  const fetchTopRatedMovies = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/movie/top_rated`, {
        params: {
          api_key: APIKEY,
          language: "en-US",
          page: 1,
        },
      });
      setMoviesData(data.results);
    } catch (error) {
      console.error("Error fetching top-rated movies", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovies = async (searchKey) => {
    setIsLoading(true);
    try {
      const type = searchKey ? "search" : "discover";
      const { data } = await axios.get(`${URL}/${type}/movie`, {
        params: {
          api_key: APIKEY,
          query: searchKey || "top_rated",
        },
      });
      setMoviesData(data.results);
      console.log("Fetched data:", data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies", error);
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovie = async (id) => {
    try {
      const { data } = await axios.get(`${URL}/movie/${id}`, {
        params: {
          api_key: APIKEY,
          append_to_response: "videos",
        },
      });

      // Extract the video information from the response
      const videos = data.videos?.results || [];

      // Set the selected movie along with the video information
      setSelectedMovie({
        ...data,
        videos,
      });

      return data;
    } catch (error) {
      // Handle error
      console.error("Error fetching movie details", error);
      return null;
    }
  };

  const selectMovie = async (movie) => {
    const movieItem = await fetchMovie(movie.id);
    console.log(movieItem);
    setSelectedMovie(movieItem);
  };

  const showMovies = () => {
    const moviesWithPoster = moviesData.filter((movie) => movie.poster_path);
    const first10Movies = moviesWithPoster.slice(0, 10);

    return first10Movies.map((movie) => (
      <Card key={movie.id} movie={movie} onCardClick={selectMovie} />
    ));
  };

  const showTrailer = () => {
    const trailer = selectedMovie?.videos?.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    if (trailer) {
      // Use the Link component to create a link to the trailer page
      return <Trailer selectedMovie={selectedMovie} />;
    } else {
      return null;
    }
  };

  const handleSearch = async (searchKey) => {
    setSearchQuery(searchKey);
    try {
      await fetchMovies(searchKey);
    } catch (error) {
      // Handle error here
      console.error("Error fetching movies", error);
    }
  };

  return (
    <div>
      <Header
        movies={moviesData}
        fetchMovies={handleSearch}
        selectedMovie={selectedMovie}
        currentMovie={selectedMovie}
        setCurrentMovie={setSelectedMovie}
      />
      <div className="mid-sec">
        <h4 className="featured">Featured Movie</h4>
        <a href="" className="seemore">
          See more &gt;{" "}
        </a>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="movielist-container">{showMovies()}</div>
      )}

      {selectedMovie?.videos ? showTrailer() : null}
      <Footer />
    </div>
  );
}

export default Home;

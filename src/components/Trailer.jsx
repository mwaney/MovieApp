import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";

const APIKEY = import.meta.env.VITE_APIKEY;
const URL = "https://api.themoviedb.org/3";
function Trailer() {
  const [videoData, setVideoData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id); // Get the videoId from the URL parameter

  useEffect(() => {
    // Define an async function to fetch video data
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`${URL}/movie/${id}`, {
          params: {
            api_key: APIKEY,
            append_to_response: "videos, credits,releases",
          },
        });

        console.log(data);

        // Extract the video information from the response
        const videos = data.videos?.results || [];
        const credits = data.credits;

        // Set the selected movie along with the video information
        setVideoData({
          ...data,
          videos,
          credits,
        });

        return data;
      } catch (error) {
        // Handle error
        console.error("Error fetching movie details", error);
        return null;
      }
    };
    fetchMovie(); // Call the function to fetch video data
  }, [id]);

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Create the formatted string
    let formattedRuntime = "";
    if (hours > 0) {
      formattedRuntime += hours + "h ";
    }
    if (remainingMinutes > 0) {
      formattedRuntime += remainingMinutes + "m";
    }

    return formattedRuntime;
  }
  function getPGRating(countriesData) {
    if (countriesData && countriesData.length > 0) {
      const pgRatingCountry = countriesData.find((country) => {
        return country.certification === "PG";
      });

      if (pgRatingCountry) {
        return pgRatingCountry.certification;
      }
    }

    return "PG Rating Not Available";
  }

  function playTrailer() {
    console.log(videoData);
    const trailer = videoData.videos.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer ? trailer.key : videoData.videos[0].key;
    return (
      <YouTube
        videoId={key}
        opts={{ width: "100%", height: "500px", playerVars: { autoplay: 1 } }}
      />
    );
  }
  const home = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <aside className="menu">
        <div className="logo" onClick={home}>
          <img src="../src/assets/tv.png" alt="logo" className="w-8 h-8 mr-2" />
          <h2 className="text-gray-900 ml-2 text-3xl font-bold">MovieBox</h2>
        </div>
        <ul>
          <li className="menu-items">
            <img src="../src/assets/Home.png" alt="" />
            Home
          </li>
          <li className="menu-items active">
            <img src="../src/assets/Movie Projector.png" alt="" />
            Movies
          </li>
          <li className="menu-items">
            <img src="../src/assets/TV Show.png" alt="" />
            TV Series
          </li>
          <li className="menu-items">
            <img src="../src/assets/Calendar.png" alt="" />
            Upcoming
          </li>
          <div className="promo">
            <h5>Play move quizes and earn free tickets</h5>
            <p>50k people are playing now</p>
            <button className="start-playing">Start playing</button>
          </div>
        </ul>

        <div className="flex items-center mt-6">
          <img src="../src/assets/Logout.png" alt="" /> <span>Log Out</span>
        </div>
      </aside>
      {videoData ? (
        <main className="flex-1">
          <div className="video">{playTrailer()}</div>
          <div className="flex items-center justify-start movie-details">
            <p data-testid="movie-title" className="mr-2">
              {videoData?.title}
            </p>
            {"  "} •{" "}
            <p className="mr-2" data-testid="movie-release-date">
              {new Date(videoData.release_date).getUTCFullYear()}
            </p>{" "}
            • {getPGRating(videoData.releases?.countries)} •{" "}
            <p className="mr-2" data-testid="movie-runtime">
              {formatRuntime(videoData?.runtime)}
            </p>
            <div className="genre">
              {videoData?.genres.map((genre, index) => (
                <button key={index} className="genreBtn">
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
          <div className="review" data-testid="movie-overview">
            {videoData?.overview}
          </div>
          <div className="lower flex space-x-4">
            <div className="credits">
              <p>
                Director: <span> Joseph Kosinski</span>
              </p>
              <p>
                Writers: <span>Jim Cash, Jack Epps Jr, Peter Craig</span>
              </p>
              <p>
                Stars: <span>Tom Cruise, Jennifer Connelly, Miles Teller</span>
              </p>

              <div className="dropdown flex space-x-4">
                <button className="dropdown-button">Top rated movie #65</button>
                <div className="dropdown-content">
                  <a href="#">Award 9 nominations</a>
                </div>
              </div>
            </div>

            <div className="bottom-left">
              <button className="leftBtn1">
                <img src="../src/assets/Two Tickets.png" alt="" />
                See Showtimes
              </button>
              <button className="leftBtn2">
                <img src="../src/assets/List.png" alt="" />
                More Watch options
              </button>
              <img
                src="../src/assets/Rectangle 37.png"
                alt=""
                className="mt-4"
              />
            </div>
          </div>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Trailer;

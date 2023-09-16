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

  useEffect(() => {
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
    fetchMovie();
  }, [id]);

  // function formatRuntime(minutes) {
  //   const hours = Math.floor(minutes / 60);
  //   const remainingMinutes = minutes % 60;

  //   // Create the formatted string
  //   let formattedRuntime = "";
  //   if (hours > 0) {
  //     formattedRuntime += hours + "h ";
  //   }
  //   if (remainingMinutes > 0) {
  //     formattedRuntime += remainingMinutes + "m";
  //   }

  //   return formattedRuntime;
  // }
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <div className="container">
      <aside className="menu">
        <div className="logo" onClick={home}>
          <img src="/tv.png" alt="logo" className="logo-img" />
          <h2 className="logotext">MovieBox</h2>
        </div>
        <ul>
          <li className="menu-items">
            <img src="/Home.png" alt="" />
            Home
          </li>
          <li className="menu-items active">
            <img src="/Movie Projector.png" alt="" />
            Movies
          </li>
          <li className="menu-items">
            <img src="/TV Show.png" alt="" />
            TV Series
          </li>
          <li className="menu-items">
            <img src="/Calendar.png" alt="" />
            Upcoming
          </li>
          <div className="promo">
            <h5>Play move quizes and earn free tickets</h5>
            <p>50k people are playing now</p>
            <button className="start-playing">Start playing</button>
          </div>
        </ul>

        <div className="logout center">
          <img src="/Logout.png" alt="" /> <span>Log Out</span>
        </div>
      </aside>
      {videoData ? (
        <main className="">
          <div className="video">{playTrailer()}</div>
          <div className="movie-details">
            <p data-testid="movie-title" className="movie-stats">
              {videoData?.title}
            </p>
            {"  "} •{" "}
            <p className="movie-stats" data-testid="movie-release-date">
              {formatDate(videoData.release_date)}
            </p>{" "}
            • {getPGRating(videoData.releases?.countries)} •{" "}
            <p className="movie-stats" data-testid="movie-runtime">
              {videoData?.runtime} minutes
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
          <div className="lower">
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

              <div className="dropdown">
                <button className="dropdown-button">Top rated movie #65</button>
                <div className="dropdown-content">
                  <a href="#">Award 9 nominations</a>
                  <img src="/Expand Arrow.png" alt="" />
                </div>
              </div>
            </div>

            <div className="bottom-left">
              <button className="leftBtn1">
                <img src="/Two Tickets.png" alt="" />
                See Showtimes
              </button>
              <button className="leftBtn2">
                <img src="/List.png" alt="" />
                More Watch options
              </button>
              <img src="/Rectangle 37.png" alt="" className="lastImg" />
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

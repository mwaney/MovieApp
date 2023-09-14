import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faPlay } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="py-4 header-container">
      <div className="container mx-auto flex justify-between items-start">
        {" "}
        {/* Added items-start */}
        {/* Left Section */}
        <div className="flex items-center">
          <img src="src/assets/tv.png" alt="logo" className="w-8 h-8 mr-2" />
          <h2 className="text-white text-lg font-semibold">MovieBox</h2>
        </div>
        <form className="flex items-center bg-white bg-opacity-30 rounded-lg p-2 space-x-2 w-120">
          <input
            type="text"
            name="search"
            id="search"
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
        {" "}
        {/* Added container for aside */}
        <aside className="flex flex-col items-start max-w-[404px] gap-4">
          {/* Rest of your aside content */}
          <div className="title">
            <h2 className="text-white text-2xl font-bold">
              John Wick 3 : <br />
              Parabellum
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
            <p>
              John Wick is on the run after killing a member of the
              international assassins' guild, and with a $14 million price tag
              on his head, he is the target of hit men and women everywhere.
            </p>
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

export default Header;

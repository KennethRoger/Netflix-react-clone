import React, { useState, useEffect, useContext } from "react";
import {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getComedies,
  getActionMovies,
  getScaryMovies,
  getAnimationMovies,
  IMAGE_BASE,
} from "../../../../api.js";
import { SearchContext } from "../Home.jsx";
import Modal from "../../Modal.jsx"

function Main() {
  const { searchResults } = useContext(SearchContext);

  const [popularMovie, setPopularMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [comedies, setComedies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [scaryMovies, setScaryMovies] = useState([]);
  const [animeMovies, setAnimeMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPopularMovie = async () => {
    const movies = await getPopularMovies();
    setPopularMovie(movies[Math.floor(Math.random() * movies.length)]);
  };

  const fetchTrendingMovies = async () => {
    const movies = await getTrendingMovies();
    setTrendingMovies(movies);
  };

  const fetchTopRatedMovies = async () => {
    const movies = await getTopRatedMovies();
    setTopRatedMovies(movies);
  };

  const fetchComedies = async () => {
    const movies = await getComedies();
    setComedies(movies);
  };

  const fetchActionMovies = async () => {
    const movies = await getActionMovies();
    setActionMovies(movies);
  };

  const fetchScaryMovies = async () => {
    const movies = await getScaryMovies();
    setScaryMovies(movies);
  };

  const fetchAnimationMovies = async () => {
    const movies = await getAnimationMovies();
    setAnimeMovies(movies);
  };

  useEffect(() => {
    fetchPopularMovie();
    fetchTrendingMovies();
    fetchTopRatedMovies();
    fetchComedies();
    fetchActionMovies();
    fetchScaryMovies();
    fetchAnimationMovies();
  }, []);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <main className="bg-black text-white">
      {searchResults?.length > 0 ? (
        <section className="px-16 py-14">
          <h2 className="text-4xl font-semibold mb-5 mt-20">Search Results</h2>
          <div className="grid grid-cols-5 gap-20">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-[300px] min-h-[400px] transform transition-transform hover:scale-110 cursor-pointer"
                onClick={() => handleCardClick(movie)}
              >
                <img
                  src={`${IMAGE_BASE}${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          {popularMovie && (
            <section className="relative h-[100vh] text-white">
              <img
                src={`${IMAGE_BASE}${popularMovie.backdrop_path}`}
                alt={popularMovie.title}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black"></div>
              <div className="relative z-10 p-8 sm:p-16 h-full flex flex-col justify-center">
                <h1 className="text-5xl font-bold">{popularMovie.title}</h1>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    className="px-8 py-2 bg-white text-black font-semibold rounded hover:bg-gray-300 transition"
                    onClick={() => handleCardClick(popularMovie)}
                  >
                    Play
                  </button>
                  <button
                    className="px-8 py-2 bg-gray-500 font-semibold rounded hover:bg-gray-600 transition"
                    onClick={() => handleCardClick(popularMovie)}
                  >
                    More Info
                  </button>
                </div>
                <p className="text-gray-400 mt-4">
                  Rating: {popularMovie.vote_average} | Release Date:{" "}
                  {popularMovie.release_date}
                </p>
                <p className="mt-2 max-w-xl">{popularMovie.overview}</p>
              </div>
            </section>
          )}

          <MovieRow title="Trending Now" movies={trendingMovies} handleCardClick={handleCardClick} />
          <MovieRow title="Top Rated" movies={topRatedMovies} handleCardClick={handleCardClick} />
          <MovieRow title="Comedies" movies={comedies} handleCardClick={handleCardClick} />
          <MovieRow title="Action" movies={actionMovies} handleCardClick={handleCardClick} />
          <MovieRow title="Scary" movies={scaryMovies} handleCardClick={handleCardClick} />
          <MovieRow title="Animated" movies={animeMovies} handleCardClick={handleCardClick} />
        </>
      )}

      {isModalOpen && selectedMovie && (
        <Modal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </main>
  );
}

function MovieRow({ title, movies, handleCardClick }) {
  return (
    <section className="px-16 py-14">
      <h2 className="text-4xl font-semibold mb-5">{title}</h2>
      <div className="flex space-x-10 overflow-x-scroll scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[300px] min-h-[400px] transform transition-transform hover:scale-110 cursor-pointer"
            onClick={() => handleCardClick(movie)}
          >
            <img
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Main;

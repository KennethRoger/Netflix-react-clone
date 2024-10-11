import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { getMovieTrailer } from "../../api";

const Modal = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      setIsLoading(true);
      const key = await getMovieTrailer(movie.id);
      setTrailerKey(key);
      setIsLoading(false);
    };

    fetchTrailer();
  }, [movie.id]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div className="bg-gray-800 relative rounded-lg p-4 w-[50%]">
        <button onClick={onClose} className="absolute top-2 right-3 text-white text-5xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
        {isLoading ? (
          <p className="text-white text-center p-4">Loading trailer...</p>
        ) : trailerKey ? (
          <YouTube videoId={trailerKey} className="mt-4 p-10" />
        ) : (
          <p className="text-white p-10">Trailer not available</p>
        )}
        <div className="mt-4">
          <p className="text-gray-400">Rating: {movie.vote_average}</p>
          <p className="text-gray-400">Release Date: {movie.release_date}</p>
          <p className="text-gray-400">Description: {movie.overview}</p>
          {/* <p className="text-gray-400">Genre: {movie.genre_ids.join(", ")}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;

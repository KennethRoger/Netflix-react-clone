export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const ENDPOINTS = {
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&include_adult=false&vote_average.gte=8`,
  trending: `${BASE_URL}/trending/all/day?api_key=${API_KEY}&include_adult=false`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&include_adult=false`,
  comedies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&include_adult=false`,
  action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&include_adult=false`,
  scary: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&include_adult=false`,
  animation: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&include_adult=false`,
};

const fetchMovies = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPopularMovies = () => fetchMovies(ENDPOINTS.popular);
export const getTrendingMovies = () => fetchMovies(ENDPOINTS.trending);
export const getTopRatedMovies = () => fetchMovies(ENDPOINTS.topRated);
export const getComedies = () => fetchMovies(ENDPOINTS.comedies);
export const getActionMovies = () => fetchMovies(ENDPOINTS.action);
export const getScaryMovies = () => fetchMovies(ENDPOINTS.scary);
export const getAnimationMovies = () => fetchMovies(ENDPOINTS.animation);

export const getMovieTrailer = async (movieId) => {
  const endpoint = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch trailer");
    }
    const data = await response.json();
    const trailer = data.results.find(video => video.type === "Trailer");
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const IMAGE_BASE = IMAGE_BASE_URL;

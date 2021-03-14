import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODBkZWY3OGQxMmI0NGRjYjRlOTZlNTRhNjNkM2RjNiIsInN1YiI6IjYwMjljMTRhY2E0ZjY3MDAzZGQzZmQ1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lgUe6pPfMynL9R4tDlIHiv6cywzZulgmjz-p8njm32w';

const apiMovies = async () => {
  const response = await axios.get('/trending/all/day?');
  return response.data.results;
};

const apiSearch = async movieName => {
  try {
    const response = await axios.get(`/search/movie?&query=${movieName}`);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

const apiMovieDetails = async id => {
  const response = await axios.get(`/movie/${id}`);
  //console.log(response);
  return response.data;
};

const apiCast = async id => {
  const response = await axios.get(`/movie/${id}/credits`);
  return response.data.cast;
};

const apiReviews = async id => {
  const response = await axios.get(`/movie/${id}/reviews`);
  return response.data.results;
};

export { apiMovies, apiSearch, apiMovieDetails, apiCast, apiReviews };

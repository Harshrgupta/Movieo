import http from "./httpService";
import { apiUrl } from "../config.json";
const endPoint = apiUrl + "movies/";
export function getMovies() {
  return http.get(endPoint);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(endPoint + movie._id, body);
  } else {
    return http.post(endPoint, movie);
  }
}

export function getMovie(movieId) {
  return http.get(endPoint + movieId);
}

export function deleteMovies(movieId) {
  return http.delete(endPoint + movieId);
}

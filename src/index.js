import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_MOVIE_DETAILS", fetchMovieDetails);
  yield takeEvery("FETCH_GENRES", fetchGenres);
  yield takeEvery("ADD_MOVIE", addMovie);
  yield takeEvery("DELETE_MOVIE", deleteMovie);
  // yield takeEvery("FETCH_EDIT_MOVIE"), editMovieDetails;
}

// function* editMovieDetails(action) {
//   try {
//     yield axios.put(`/api/edit/${action.payload}`);
//     yield put({ type: "SET_EDIT_MOVIE" });
//   } catch (err) {
//     console.log("Error in editing movie", err);
//   }
// }

function* deleteMovie(action) {
  try {
    yield axios.delete(`/api/movie/${action.payload}`);
    yield put({ type: "FETCH_MOVIES" });
  } catch (error) {
    console.log("error with DELETE saga request", error);
  }
}

function* addMovie(action) {
  // submit new movie information to database
  try {
    yield axios.post("api/movie", action.payload);
    yield put({
      type: "FETCH_MOVIES",
    });
  } catch (err) {
    console.log("ERROR IN POST ADD MOVIE", err);
  }
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const response = yield axios.get("/api/movie");
    console.log("get all:", response.data);
    // send SET MOVIES to reducer- payload is the response from db route
    yield put({ type: "SET_MOVIES", payload: response.data });
  } catch {
    console.log("get all error");
  }
}
function* fetchGenres() {
  // get genres from the DB
  try {
    const response = yield axios.get("/api/genre");
    console.log("GET genres:", response.data);
    // send SET GENRES to reducer- payload is the response from db route
    yield put({ type: "SET_GENRES", payload: response.data });
  } catch (err) {
    console.log("Error getting genres", err);
  }
}

// fetchMovieDetails saga
function* fetchMovieDetails(action) {
  console.log("action.payload", action.payload);
  // set movie details type goes to reducer- using id as action payload
  try {
    const response = yield axios.get(`/api/details/${action.payload}`);
    console.log("get movie details:", response.data);
    yield put({ type: "SET_MOVIE_DETAILS", payload: response.data });
  } catch (err) {
    console.log("Error getting movie details", err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

////////////////////////////////////////////////////////////////////////////////////////////////

////                           REDUCERS                           //////////

////////////////////////////////////////////////////////////////////////////////////////////////
const movieDetails = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIE_DETAILS":
      return action.payload;
    default:
      return state;
  }
};
// edit movie reducer
// const editMovie = (
//   state = { title: "", poster: "", description: "" },
//   action
// ) => {
//   switch (action.type) {
//     case "SET_EDIT_MOVIE":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// Used to store movies returned from the server
const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genresReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    moviesReducer,
    genresReducer,
    movieDetails,
    // editMovie,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

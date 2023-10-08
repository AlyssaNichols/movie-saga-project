import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('DELETE_MOVIE', deleteMovie);
}

function* deleteMovie(action){
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
        yield axios.post('api/movie', action.payload);
        yield put({
            type: 'FETCH_MOVIES'
        })
    } catch (err) {
        console.log('ERROR IN POST ADD MOVIE', err);
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }   
}
function* fetchGenres() {
    // get genres from the DB
    try {
      const genres = yield axios.get('/api/genre');
      console.log('GET genres:', genres.data);
      yield put({ type: 'SET_GENRES', payload: genres.data })
    } catch (err) {
      console.log('Error getting genres', err);
    }
  } //

function* fetchMovieDetails(action){
        console.log('action.payload', action.payload);
        // get movie details associated with movieId
        // title, description, poster, genres
        try{
          const response = yield axios.get(`/api/details/${action.payload}`);
          console.log('get movie details:', response.data);
          yield put({ type: 'SET_MOVIE_DETAILS', payload: response.data});
        } catch (err) {
          console.log('Error getting movie details', err);
        } 
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();



////////////////////////////////////////////////////////////////////////////////////////////////

////                           REDUCERS                           //////////

////////////////////////////////////////////////////////////////////////////////////////////////
const movieDetails = ( state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
          return action.payload;
        default:
          return state;
    }
}

// Used to store movies returned from the server
const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genresReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        moviesReducer,
        genresReducer,
        movieDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

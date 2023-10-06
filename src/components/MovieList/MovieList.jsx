import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';


function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movieList = useSelector(store => store.moviesReducer);


    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movieList.map(movie => {
                    return (
                        <div key={movie.id} onClick={() => history.push(`/details/${movie.id}`)}>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}  />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;
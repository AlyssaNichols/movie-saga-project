import { useHistory, useParams } from "react-router-dom";

export default function MovieDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const paramsObject = useParams();
  const movieDetails = useSelector((store) => store.movieDetails);
  console.log(movieDetails);

  // movieDetails state object as variables
  const movieTitle = movieDetails.title;
  const moviePoster = movieDetails.poster;
  const movieGenres = movieDetails.genres;
  const movieDescription = movieDetails.description;

  useEffect(() => {
    dispatch({
      type: "FETCH_MOVIE_DETAILS",
      payload: paramsObject.id,
    });
  }, []);

  function goBack() {
    history.push("/");
  }

  return (
    <>
      <h2>Title: {movieTitle}</h2>
      <img src={moviePoster} />
      <h2>Genres: {movieGenres}</h2>
      <h2>{movieDescription}</h2>
      <button onClick={goBack}>Back</button>
    </>
  );
}

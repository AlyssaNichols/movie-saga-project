import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function MovieDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const paramsObject = useParams();
  const movieDetails = useSelector((store) => store.movieDetails);

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
    <div>
      <h1>{movieDetails.title} Details</h1>
      <br />
      <br />
      <Container>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card style={{ display: "flex", justifyContent: "center" }}>
                <CardMedia
                  component="img"
                  alt={movieDetails.title}
                  style={{
                    width: "60%",
                    height: "50%", // Set the desired height (half the parent height)
                    objectFit: "cover", // Maintain aspect ratio and fill the Card
                  }}
                  image={movieDetails.poster}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                style={{
                  height: "100%",
                  width: "90%", // Set the desired height (half the parent height)
                }}
              >
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {movieDetails.title
                      ? `Title: ${movieDetails.title}`
                      : "No Movie Title Listed"}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Genres:{" "}
                    {movieDetails.genres && movieDetails.genres.length > 0 ? (
                      <span>{movieDetails.genres.join(", ")}</span>
                    ) : (
                      <span>No Genres Listed</span>
                    )}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {movieDetails.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBack />}
                    onClick={goBack}
                  >
                    Back
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
////old code before styling
// import { useHistory, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// export default function MovieDetails() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const paramsObject = useParams();
//   const movieDetails = useSelector((store) => store.movieDetails);
//   console.log(movieDetails);

//   // movieDetails state object as variables
//   const movieTitle = movieDetails.title;
//   const moviePoster = movieDetails.poster;
//   const movieGenreList = movieDetails.genres;
//   const movieDescription = movieDetails.description;

//   useEffect(() => {
//     dispatch({
//       type: "FETCH_MOVIE_DETAILS",
//       payload: paramsObject.id
//     });
//   }, []);

//   function goBack() {
//     history.push("/");
//   }

//   return (
//     <>
//       <h2>{movieTitle ? `Title: ${movieTitle}` : 'No Movie Title Listed'}</h2>
//       <img src={moviePoster} />
//       <h2>
//         Genres: {' '}
//         {movieGenreList && movieGenreList.length > 0 ? (
//           <span>{movieGenreList.join(", ")}</span>
//         ) : (
//           <span>No Genres Listed</span>
//         )}
//       </h2>
//       <p>{movieDescription}</p>
//       <button onClick={goBack}>Back</button>
//     </>
//   );
// }

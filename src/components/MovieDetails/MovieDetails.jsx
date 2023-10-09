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
  // getting movieDetails from the movieDetails reducer
  const movieDetails = useSelector((store) => store.movieDetails);
  // useEffect to fetch the movie details from the fetchMovieDetails saga that sends the call to the movie details reducer
  useEffect(() => {
    dispatch({
      type: "FETCH_MOVIE_DETAILS",
      payload: paramsObject.id,
    });
  }, []);

  // go back function for the back button- could just do it inline too i suppose
  function goBack() {
    history.push("/");
  }

  function editDetails() {
    history.push(`/edit/${paramsObject.id}`);
    // dispatch({ type: "SET_EDIT_MOVIE", payload:  });
  }

  // if no movie title is selected (so basically using the navbar to go to movie details) -
  // then it will show to please select a movie to see details

  if (!movieDetails.title) {
    return (
      <>
        <br /> <h1>Please Select a Movie to See Details</h1>
      </>
    );
  }
  // otherwise if movie is selected it will navigate to the details page of that movie
  return (
    <div>
      <br />
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
                  width: "100%",
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
                    Back to List
                  </Button> {""}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={editDetails}
                  >
                    Edit Details
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
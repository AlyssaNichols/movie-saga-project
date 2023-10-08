import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieList.css";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movieList = useSelector((store) => store.moviesReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  const useStyles = makeStyles({
    card: {
      width: "230px",
      height: "400px",
      marginBottom: "40px",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      transition: "transform 0.2s", // Add a transform transition
      "&:hover": {
        transform: "scale(1.03)", // Add a slight scale-up effect on hover
      },
    },
    image: {
      height: "80%",
      objectFit: "cover",
    },
  });
  const classes = useStyles();

  return (
    <main>
      <h1>Movie List</h1>
      <button className="addMovieButton"
        onClick={() => history.push(`/addMovie/`)}
      >
        Add Movie Form
      </button>
      <section className="movies">
        {movieList.map((movie) => {
          return (
            <div
              style={{ marginLeft: "40px", marginRight: "40px" }}
              key={movie.id}
            >
              <Card
                onClick={() => history.push(`/details/${movie.id}`)}
                className={classes.card}
              >
                <CardMedia
                  component="img"
                  className={classes.card}
                  alt={movie.title}
                  image={movie.poster}
                  title={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
              <Button
                variant="outlined"
                color="error"
                style={{ marginTop: "-30px", marginBottom: "40px" }}
                startIcon={<DeleteIcon />}
                onClick={() =>
                  dispatch({ type: "DELETE_MOVIE", payload: movie.id })
                }
              >
                Delete
              </Button>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;

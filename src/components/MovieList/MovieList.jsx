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

export default function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  // getting the movieList from moviesReducer
  const movieList = useSelector((store) => store.moviesReducer);
// useEffect to fetch all movies. This goes to the fetchMovies saga and sends a put call to teh moviesReducer
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  // MUI custom styling for the cards
  const useStyles = makeStyles({
    card: {
      width: "230px",
      height: "400px",
      marginBottom: "40px",
      backgroundColor: 'black',
      borderRadius: "5px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      transition: "transform 0.2s", // Add a transform transition
      "&:hover": {
        transform: "scale(1.03)", // Add a slight scale-up effect on hover
      },
    },
    image: {
      height: "100%",
      objectFit: "cover",
    },
    movieContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap", // Allow movies to wrap to the next line
      marginLeft: "-20px", // Counteract default Card margin
      marginRight: "-20px", // Counteract default Card margin
    },
    // Define a class for the title that will be shown on hover
    titleOnHover: {
      visibility: "hidden",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0,
      padding: '10px',
      transition: "opacity 0.3s ease-in-out",
    },
    
    // Apply this class when the card is hovered to show the title
    cardHovered: {
      "&:hover": {
        "& $titleOnHover": {
          visibility: "visible",
          opacity: '.7',
        },
      },
    },
  });
  // variable for the styling
  const classes = useStyles();
// what is returned on the page. Cards of all the movies that
  return (
    <main>
      <br />
      <h1 className="listHeader">Movie Collection</h1>
      <hr />
      <br />
      <button
        className="addMovieButton"
        onClick={() => history.push(`/addMovie/`)}
      >
        Add Movie
      </button>
      <br />
      <hr /> 
      <br />
      <section className={classes.movieContainer}>
        {movieList.map((movie) => {
          return (
            <div
              style={{ marginLeft: "40px", marginRight: "40px" }}
              key={movie.id}
            >
              <Card
                onClick={() => history.push(`/details/${movie.id}`)}
                className={`${classes.card} ${classes.cardHovered}`}
              >
                <CardMedia 
                  component="img"
                  className={classes.image}
                  alt={movie.title}
                  image={movie.poster}
                  title={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{fontSize: '16px', color: 'white' }} >
                  <span className={classes.titleOnHover}>{movie.title}</span>
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


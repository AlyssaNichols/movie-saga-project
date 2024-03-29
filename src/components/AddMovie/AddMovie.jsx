import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

export default function AddMovie() {
  const history = useHistory();
  const dispatch = useDispatch();
  // create state for the form inputs
  // title, image url, description, genre
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  // add function
  const addMovie = () => {
    // make sure all text fields are filled
    if (!title || !poster || !description || !genre || genre === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please make sure all fields are filled in before submitting!',
      });
    }   else {
      dispatch({
        type: "ADD_MOVIE",
        payload: { title, poster, description, genre_id: genre },
      });
      Swal.fire({
        icon: 'success',
        title: 'Movie Added',
        text: 'Your movie has been added successfully!',
      });
      // head back to home page after
      history.push("/");
    }
  };

  // cancel function
  // sets all inputs blank and send user back to home page
  const cancelMovie = () => {
    setTitle("");
    setPoster("");
    setDescription("");
    setGenre("");
    history.push("/");
  };
  // what is being returned on the page
  return (
    <center>
      <br />
      <br />
      <Paper elevation={3} style={{ padding: "16px", width: "65%" }}>
        <h1>Add New Movie</h1>
        <FormControl style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginBottom: "16px" }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <TextField
            label="Poster Image URL"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
          />
        </FormControl>
        <FormControl style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginBottom: "16px" }}>
          <TextField 
            multiline
            rows={7}
            aria-label="Movie Description"
            placeholder="Movie Description"
            value={description}
            className="custom-textarea"
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: "1rem",
            }}
          ></TextField>
        </FormControl>
        <FormControl style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginBottom: "16px" }}>
          <InputLabel htmlFor="genre">Genre</InputLabel>
          <Select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            fullWidth
          >
            <MenuItem value={0}>Select a genre</MenuItem>
            <MenuItem value={1}>Adventure</MenuItem>
            <MenuItem value={2}>Animated</MenuItem>
            <MenuItem value={3}>Biographical</MenuItem>
            <MenuItem value={4}>Comedy</MenuItem>
            <MenuItem value={5}>Disaster</MenuItem>
            <MenuItem value={6}>Drama</MenuItem>
            <MenuItem value={7}>Epic</MenuItem>
            <MenuItem value={8}>Fantasy</MenuItem>
            <MenuItem value={9}>Musical</MenuItem>
            <MenuItem value={10}>Romantic</MenuItem>
            <MenuItem value={11}>Science Fiction</MenuItem>
            <MenuItem value={12}>Space Opera</MenuItem>
            <MenuItem value={13}>Superhero</MenuItem>
          </Select>
        </FormControl>
        <center>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#ff0000",
              color: "white",
              marginRight: "8px",
            }}
            startIcon={<ArrowBack />}
            onClick={cancelMovie}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#007bff", color: "white" }}
            onClick={addMovie}
            startIcon={<AddIcon />}
          >
            Save
          </Button>
          <br />
        </center>
      </Paper>
    </center>
  );
}

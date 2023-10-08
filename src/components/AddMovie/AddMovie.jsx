import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function AddMovie() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const saveMovie = () => {
    if (!title || !poster || !description || !genre || genre === 0) {
      alert("Please make sure all fields are filled in before submitting!");
    } else {
      dispatch({
        type: "ADD_MOVIE",
        payload: { title, poster, description, genre_id: genre },
      });
      history.push("/");
      setTitle("");
      setPoster("");
      setDescription("");
      setGenre("");
    }
  };

  const cancelChanges = () => {
    setTitle("");
    setPoster("");
    setDescription("");
    setGenre("");
  };

  return (
    <>
      <h1>Add Movie</h1>
      <div className="formContainer">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="poster">Poster Image URL:</label>
          <input
            type="text"
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value={0}>Select a genre</option>
            <option value={1}>Adventure</option>
            <option value={2}>Animated</option>
            <option value={3}>Biographical</option>
            <option value={4}>Comedy</option>
            <option value={5}>Disaster</option>
            <option value={6}>Drama</option>
            <option value={7}>Epic</option>
            <option value={8}>Fantasy</option>
            <option value={9}>Musical</option>
            <option value={10}>Romantic</option>
            <option value={11}>Science Fiction</option>
            <option value={12}>Space Opera</option>
            <option value={13}>Superhero</option>
          </select>
        </div>
        <div>
          <button onClick={cancelChanges}>Cancel</button>
          <button onClick={saveMovie}>Save</button>
        </div>
      </div>
    </>
  );
}

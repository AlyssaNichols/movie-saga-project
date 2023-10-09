import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
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


export default function EditDetails(props) {
   // const params = useParams();
   // const movieId = params.movieId;
   // the following line is identical to the above 2, 
   // taking advantage of Object Destructuring to name
   // a variable the same as the key of an object
   const dispatch = useDispatch();
   const history = useHistory();
   const { movieId } = useParams();

   const movieDetails = useSelector((store) => store.movieDetails);

   const [title, setTitle] = useState("");
   const [poster, setPoster] = useState("");
   const [description, setDescription] = useState("");
//    const [genre, setGenre] = useState("");

   // useEffect to fetch the movie details from the fetchMovieDetails saga that sends the call to the movie details reducer
   useEffect(() => {
      dispatch({
         type: "FETCH_MOVIE_DETAILS",
         payload: movieId,
      });
   }, []);

   // Only update local state if movieDetails has changed (saga has finished)
   // If we do this outside useEffect, we run the risk of an infinite loop
   // This is ONLY IMPORTANT if we want to populate the form with existing data
   useEffect(() => {
      setTitle(movieDetails.title);
      setPoster(movieDetails.poster);
      setDescription(movieDetails.description);
      // setGenre(movieDetails.genre); // was it genre or genres?
   }, [movieDetails])

   // If movie is invalid OR not found, dont continue
   if (!movieDetails.title) {
      return (
         <>
            <br />
            <h2>Loading...</h2>
         </>
      );
   }

   // add function
   const editMovie = () => {
      // make sure all text fields are filled
      if (!title || !poster || !description) {
         alert("Please make sure all fields are filled in before submitting!");
      } else {
         dispatch({
           type: "EDIT_MOVIE",
           payload: { title, poster, description, id: movieId },
         //   callback: () => history.push(`/details/${movieId}`)
         });
         // head back to home page after
         history.push(`/details/${movieId}`);
      }
   };
   return (
      <>
         <Container style={{ marginTop: "16px" }}>
            <Paper elevation={3} style={{ padding: "16px" }}>
               <h1>Editing Movie {title}</h1>
               <FormControl fullWidth style={{ marginBottom: "16px" }}>
                  <TextField
                     label="Title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     fullWidth
                  />
               </FormControl>
               <FormControl fullWidth style={{ marginBottom: "16px" }}>
                  <TextField
                     label="Poster Image URL"
                     value={poster}
                     onChange={(e) => setPoster(e.target.value)}
                     fullWidth
                  />
               </FormControl>
               <FormControl fullWidth style={{ marginBottom: "16px" }}>
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
               {/* <FormControl fullWidth style={{ marginBottom: "16px" }}>
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
               </FormControl> */}
               <div style={{ display: "flex" }}>
                  <Button
                     variant="contained"
                     style={{
                        backgroundColor: "#ff0000",
                        color: "white",
                        marginRight: "8px",
                     }}
                     startIcon={<ArrowBack />}
                     onClick={() => history.push(`/details/${movieId}`)}
                  >
                     Cancel
                  </Button>
                  <Button
                     variant="contained"
                     style={{ backgroundColor: "#007bff", color: "white" }}
                     onClick={editMovie}
                     startIcon={<AddIcon />}
                  >
                     Save
                  </Button>
               </div>
            </Paper>
         </Container>
      </>
   )
}
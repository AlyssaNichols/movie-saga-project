import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";

export default function AddMovie() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');

    // navigate to home page after a cancel or save
    const returnHome = () => {
        history.push('/');
    };

    // handler for data submission
    const saveMovie = () => {
        // validate our inputs before calling a saga dispatch
        if (!title || !poster || !description || !genre || genre === 0){
            alert('Please make sure all fields are filled in before submitting!');
        } else {
            // send our data to saga in order to post to db
            dispatch({
                type: 'ADD_MOVIE',
                payload: {title, poster, description, genre_id: genre},
            });
            returnHome();
        }
    };

    // grouping our theme initializers here
    const formStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
    })); 

    const cardStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
    });

    const modalStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
    }));

    function getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
    };

    // theme class initialization
    const formClasses = formStyles();
    const cardClasses = cardStyles();
    const modalClasses = modalStyles();

    // content of the displayed modal
    const cancelBody = (
        <div style={modalStyle} className={modalClasses.paper} >
            <h2 id="simple-modal-title">Are you sure you want to cancel your changes?</h2>
            <div className="modalConfirmation">
                <Button variant="contained" color="default" onClick={handleClose} style={{marginRight : '15px'}}>No</Button>
                <Button variant="contained" color="secondary" onClick={returnHome}>Yes</Button> 
            </div>                                                
        </div>
    );

    return (
        <>
            <h1>Add Movie</h1>
            <div>
                <Container className="formContainer" maxWidth="sm">
                    <Card className={cardClasses.root} >
                        <CardContent className={"addMovieCardContent"}>
                            <FormControl className={formClasses.root} noValidate autoComplete="off" >
                                <TextField id="title" label="Title" value={title} onChange={(event) => setTitle(event.target.value)}/>
                                <TextField id="poster" label="Poster Image URL" value={poster} onChange={(event) => setPoster(event.target.value)}/>
                                <TextareaAutosize
                                    className="descriptionField" 
                                    aria-label="minimum height" 
                                    minRows={5} placeholder="Description" 
                                    value={description} 
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                {/* Bundled up the genre selector into its own form to allow label to show properly */}
                                <FormControl variant="filled" className={formClasses.formControl}>
                                    <InputLabel id="genre-select-label">Genre</InputLabel>
                                    <Select
                                        labelId="genre-select-label"
                                        id="genre-select"
                                        value={genre}
                                        onChange={(event) => setGenre(event.target.value)}
                                        label="Genre"
                                    >
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
                                <div justifycontent="center">
                                    <Button variant="contained" color="default" onClick={handleOpen} style={{marginRight : '15px'}}>Cancel</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                    >
                                        {cancelBody}   
                                    </Modal>
                                    <Button variant="contained" color="primary" onClick={saveMovie}>Save</Button>
                                </div>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </>
    )
}
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(queryText)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.delete("/:id", (req, res) => {
  const queryText = `  WITH DeletedGenres AS (
    DELETE FROM movies_genres
    WHERE "movie_id" = $1
    RETURNING genre_id
  )
  DELETE FROM movies
  WHERE id = $1
  RETURNING *;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing DELETE MOVIE query", err);
      res.sendStatus(500);
    });
});


router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const movieQueryText = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE TO ADD
  pool.query(movieQueryText, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    // ID will show in this console log
    console.log('New Movie Id:', result.rows[0].id); 
    const newMovieId = result.rows[0].id

    // GENRE info
    const genreQueryText = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(genreQueryText, [newMovieId, req.body.genre_id]).then(result => {
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })
// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;
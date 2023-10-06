const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  console.log('req.params', req.params);


  const movieId = req.params.id;
  // Using an aggregate function will return one row with all data 
  const queryText = `
    SELECT 
      movies.*, 
      JSON_AGG(genres.name) genres,
      JSON_AGG(genres.id) genre_id  
    FROM 
      movies
    JOIN movies_genres 
      ON movies.id = movies_genres.movie_id
    JOIN genres 
      ON movies_genres.genre_id = genres.id
    WHERE 
      movies.id = $1
    GROUP BY 
      movies.id;
  `;
  pool.query(queryText, [movieId])
    .then(result => {
      console.log(`GET details RETURNED:`, result.rows);
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log(`ERROR GET details FAILED:`, err);
      res.sendStatus(500);
    })
});



module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
// router.get('/', (req, res) => {
//     const sqlText = `SELECT * FROM recipes`; // This query is spot on, thanks Postico!
//     pool.query(sqlText)
//     .then((result) => {
//         console.log('GET got this back from the server', result);
//         res.send(result.rows); // db rows
//     })
//     .catch((error) => {
//         console.log('GET error from the server', error);
//         res.sendStatus(500); // A good server always responds!
//     })
//   });

  router.post('/', async(req, res) => {
      let recipeObj = req.body;
      const sqlText = `INSERT INTO recipes (name, description) VALUES ($1, $2) RETURNING id`;
      pool.query(sqlText, [recipeObj.title, recipeObj.description])
        .then((response) => {
            console.log(response.rows[0].id);
            const sqlText = `INSERT INTO recipe_instruction_list (instruction_number, instruction_details, recipes_id) VALUES ($1, $2, $3)`;
            recipeObj.instructions.map(instruction => {
                pool.query(sqlText, [instruction.instruction_number, instruction.instruction_details, response.rows[0].id])
            })
        })
        .catch((error) => {
            console.log('there was an error', error)
        })
  });

module.exports = router;
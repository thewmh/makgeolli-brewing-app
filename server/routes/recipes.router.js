const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM recipes WHERE recipes.is_published = 1`; // This query is spot on, thanks Postico!
    pool.query(sqlText)
    .then((result) => {
        console.log('GET got this back from the server', result);
        res.send(result.rows); // db rows
    })
    .catch((error) => {
        console.log('GET error from the server', error);
        res.sendStatus(500); // A good server always responds!
    })
  });

  router.post('/', async(req, res) => {
      let recipeObj = req.body;
      let user_id = req.user.user_id;
      console.log(recipeObj);
      const sqlText = `INSERT INTO recipes (name, description, added_by, is_published) VALUES ($1, $2, $3, $4) RETURNING id`;
      pool.query(sqlText, [recipeObj.title, recipeObj.description, user_id, 1])
        .then((response) => {
            console.log(response.rows[0].id);
            const sqlText = `INSERT INTO recipe_instruction_list (instruction_number, instruction_details, recipes_id) VALUES ($1, $2, $3)`;
            recipeObj.instructions.map((instruction, i) => {
                pool.query(sqlText, [i+1, instruction.instruction_details, response.rows[0].id])
            })
            const sqlTextIng = `INSERT INTO recipe_ingredient_list (name, quantity, units_id, recipes_id) VALUES ($1, $2, $3, $4)`;
            recipeObj.ingredients.map((ingredient, i) => {
                pool.query(sqlTextIng, [ingredient.name, ingredient.quantity, ingredient.id, response.rows[0].id])
            })
        }) 
        .catch((error) => {
            console.log('There was an error POSTing a new recipe', error)
        })
  });

module.exports = router;
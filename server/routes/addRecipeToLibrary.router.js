const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', async(req, res) => {
    console.log('In addRecipeToLibrary', req.body);
    let recipeObj = req.body;
    const sqlText = `INSERT INTO user_recipes (user_profile_id, recipe_id) VALUES ($1, $2)`;
    pool.query(sqlText, [recipeObj.user_id, recipeObj.recipe_id])
        .then((response) => {
            console.log('Yay! It worked', response);
        })
        .catch((error) => {
            console.log('Whoa there gunpowder', error);
        })
});

module.exports = router;

// router.post('/', async(req, res) => {
//     let recipeObj = req.body;
//     const sqlText = `INSERT INTO recipes (name, description) VALUES ($1, $2) RETURNING id`;
//     pool.query(sqlText, [recipeObj.title, recipeObj.description])
//       .then((response) => {
//           console.log(response.rows[0].id);
//           const sqlText = `INSERT INTO recipe_instruction_list (instruction_number, instruction_details, recipes_id) VALUES ($1, $2, $3)`;
//           recipeObj.instructions.map((instruction, i) => {
//               pool.query(sqlText, [i+1, instruction.instruction_details, response.rows[0].id])
//           })
//           const sqlTextIng = `INSERT INTO recipe_ingredient_list (name, quantity, units_id, recipes_id) VALUES ($1, $2, $3, $4)`;
//           recipeObj.ingredients.map((ingredient, i) => {
//               pool.query(sqlTextIng, [ingredient.name, ingredient.quantity, ingredient.id, response.rows[0].id])
//           })
//       }) 
//       .catch((error) => {
//           console.log('there was an error', error)
//       })
// });
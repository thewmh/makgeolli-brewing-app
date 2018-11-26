const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router.get(`/:key`, (req, res) => {
//     console.log(req.params);
//     const recipeId = req.params.key;
//     console.log('THIS IS THE RECIPE ID', recipeId);
//   //   console.log('THIS IS THE RECIPE ID', recipeId);
//   const sqlText = `SELECT DISTINCT recipes.name as recipe_name, recipes.description as recipe_description FROM recipes WHERE recipes.id = $1;`; // This query is spot on, thanks Postico!
//   pool.query(sqlText, [recipeId])
//   .then((response) => {
//       const sqlText = `SELECT instruction_number, instruction_details FROM recipe_instruction_list WHERE recipe_instruction_list.recipes_id = $1;`;
//       pool.query(sqlText, [recipeId])
//       console.log('GET got this back from the server', response.rows);
//       res.send(response); // db rows
//   })
//   .catch((error) => {
//       console.log('GET error from the server', error);
//       res.sendStatus(500); // A good server always responds!
//   })
// });

router.get(`/:key`, (req, res) => {
    console.log(req.params);
    const recipeId = req.params.key;
    console.log('THIS IS THE RECIPE ID', recipeId);
  //   console.log('THIS IS THE RECIPE ID', recipeId);
    const sqlText_1 = `SELECT * FROM recipes WHERE recipes.id = $1;`;
    const sqlText_2 = `SELECT instruction_number, instruction_details FROM recipe_instruction_list WHERE recipe_instruction_list.recipes_id = $1 ORDER BY instruction_number;`;
    const sqlText_3 = `SELECT recipe_ingredient_list.name as ingredient_name, recipe_ingredient_list.quantity as ingredient_quantity, ingredient_units.name as ingredient_measure FROM recipe_ingredient_list JOIN ingredient_units ON ingredient_units.id = recipe_ingredient_list.units_id WHERE recipe_ingredient_list.recipes_id = $1;`;
    pool.query(sqlText_1, [recipeId]).then( rows => {
        recipe = rows.rows
    pool.query(sqlText_2, [recipeId]).then( rows => {
        instructions = rows.rows
    pool.query(sqlText_3, [recipeId]).then( rows => {
        ingredients = rows.rows
    console.log('GET got this back from the server', rows);
        result = {recipe: recipe, instructions: instructions, ingredients: ingredients}
    res.send(result); // db rows database.query( 'SELECT * FROM some_table' )
    // .then( rows => database.query( 'SELECT * FROM other_table' ) )
    // .then( rows => database.close() );
})})})
.catch((error) => {
    console.log('GET error from the server', error);
    res.sendStatus(500); // A good server always responds!
})
});

// router.get(`/:key`, (req, res) => {
//     console.log(req.params);
//     const recipeId = req.params.key;
//     console.log('THIS IS THE RECIPE ID', recipeId);
//   //   console.log('THIS IS THE RECIPE ID', recipeId);
//   const sqlText_1 = `SELECT instruction_number, instruction_details FROM recipe_instruction_list WHERE recipe_instruction_list.recipes_id = $1;`;
// pool.query(sqlText_1, [recipeId])
// .then((response) => {
//     console.log('GET got this back from the server', response.rows);
//     res.send(response); // db rows
// })
// .catch((error) => {
//     console.log('GET error from the server', error);
//     res.sendStatus(500); // A good server always responds!
// })
// });

// router.get(`/:key`, (req, res) => {
//     console.log(req.params);
//     const recipeId = req.params.key;
//     console.log('THIS IS THE RECIPE ID', recipeId);
//   //   console.log('THIS IS THE RECIPE ID', recipeId);
//   const sqlText_1 = `SELECT recipe_ingredient_list.name, quantity, ingredient_units.name FROM recipe_ingredient_list JOIN ingredient_units ON recipe_ingredient_list.units_id = ingredient_units.id WHERE recipe_ingredient_list.recipes_id = $1;`; // This query is spot on, thanks Postico!recipe_instruction_list.recipes_id = $1;`;
// pool.query(sqlText_1, [recipeId])
// .then((response) => {
//     console.log('GET got this back from the server', response.rows);
//     res.send(response); // db rows
// })
// .catch((error) => {
//     console.log('GET error from the server', error);
//     res.sendStatus(500); // A good server always responds!
// })
// });

// (async (req, res) => {
//     // note: we don't try/catch this because if connecting throws an exception
//     // we don't need to dispose of the client (it will be undefined)
//     const client = await pool.connect()
//     const recipeId = req.params.key
//     try {
//       await client.query('BEGIN')
//       const { rows } = await client.query('SELECT * FROM recipes VALUES ($1) RETURNING id')
  
//       const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
//       const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
//       await client.query(insertPhotoText, insertPhotoValues)
//       await client.query('COMMIT')
//     } catch (e) {
//       await client.query('ROLLBACK')
//       throw e
//     } finally {
//       client.release()
//     }
//   })().catch(e => console.error(e.stack))

module.exports = router;
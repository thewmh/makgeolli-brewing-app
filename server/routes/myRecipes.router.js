const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
    console.log('In myRecipes router', req.user.user_id);
    const user_profile_id = req.user.user_id;
    const sqlText = `SELECT user_recipes.id as user_recipe_id, recipes.* FROM user_recipes JOIN recipes ON recipes.id = user_recipes.recipe_id WHERE user_recipes.user_profile_id = $1`; // This query is spot on, thanks Postico!
    pool.query(sqlText, [user_profile_id])
    .then((result) => {
        console.log('GET got this back from the server', result);
        res.send(result.rows); // db rows
    })
    .catch((error) => {
        console.log('GET error from the server', error);
        res.sendStatus(500); // A good server always responds!
    })
  });

  router.delete('/', (req, res) => {
      console.log('In myRecipes router DELETE', req.query);
      const sqlText = `DELETE FROM user_recipes where id = $1`;
      pool.query(sqlText, [req.query.user_recipe_id])
      .then((result) => {
          console.log('User profile myRecipes DELETE was a success', result);
          res.sendStatus(200);
      })
      .catch((error) => {
          console.log('DELETE error from myRecipes', error);
          res.sendStatus(500);
      })
  })

module.exports = router;
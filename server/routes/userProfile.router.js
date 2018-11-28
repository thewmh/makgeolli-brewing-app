const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
    console.log('In userProfile router', req.user.username);
    const username = req.user.username;
    const sqlText = `SELECT user_profiles.first_name, user_profiles.last_name, user_profiles.access_level,
    login_information.username, login_information.user_id FROM user_profiles JOIN login_information
    ON login_information.user_id = user_profiles.id WHERE username = $1`;
    pool.query(sqlText, [username])
    .then((result) => {
        console.log('GET got this back from the server', result);
        res.send(result.rows[0]); // db rows
    })
    .catch((error) => {
        console.log('GET error from the server', error);
        res.sendStatus(500); // A good server always responds!
    })
  });

  module.exports = router;
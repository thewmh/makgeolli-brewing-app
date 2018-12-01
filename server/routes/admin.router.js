const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
    console.log('In admin router');
    const sqlText = `SELECT login_information.username, user_profiles.first_name,
    user_profiles.last_name, user_profiles.access_level, user_profiles.id
    FROM user_profiles JOIN login_information ON login_information.user_id = user_profiles.id;`;
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

router.put('/', (req, res) => {
    console.log('In admin router POST request', req.body);
    user_id = req.body.id;
    username = req.body.username;
    first_name = req.body.first_name;
    last_name = req.body.last_name;
    access_level = req.body.access_level;
    const sqlText1 = `UPDATE user_profiles
    SET access_level = $1, first_name = $2, last_name = $3
    FROM login_information
    WHERE login_information.user_id = user_profiles.id AND user_profiles.id = $4;`;
    const sqlText2 = `UPDATE login_information
    SET username = $1
    WHERE login_information.user_id = $2`;
    pool.query(sqlText1, [access_level, first_name, last_name, user_id])
    .then((result) => {
        pool.query(sqlText2, [username, user_id])
        .then((result) => {
        console.log('admin router PUT request resopnse is', result);
        res.sendStatus(200);
        })
    })
    .catch((error) => {
        console.log('error with admin router PUT request', error);
        res.sendStatus(500);
    })
})

  module.exports = router;
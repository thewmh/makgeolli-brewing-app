const express = require('express');
require('dotenv').config();
const path= require("path");
const app = express();

app.use(express.static(__dirname));

app.get('*', (req, res) => {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
});
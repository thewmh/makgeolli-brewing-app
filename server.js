const express = require('express');
require('dotenv').config();
const path = require("path");
const app = express();

// Serve static files
app.use(express.static(__dirname));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/client', "build", "index.html")));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
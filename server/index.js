const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');

// Middleware logger
app.use(volleyball);

// Serves static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Renders index.html
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});

module.exports = app;

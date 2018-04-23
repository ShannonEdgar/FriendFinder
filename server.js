var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
// Use process.env for Heroku
var PORT = process.env.PORT || 3000;

// Expose the public directory to access CSS files
app.use(express.static(path.join(__dirname, './app/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlroutes.js')(app);

// Start server
app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});
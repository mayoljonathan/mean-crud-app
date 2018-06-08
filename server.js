// Get dependencies from node_modules
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session');

const app = express();

// Connect to the database
// mongoose.connect('mongodb://localhost/mean-crud')
mongoose.connect('mongodb://admin1:admin1@ds247330.mlab.com:47330/mean-crud-app')
	.then(() => console.log('Mongoose: Connection Successfull'))
	.catch((err) => console.error(err));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use sessions for tracking logins
app.use(session({
  secret: 'testing purposes',
  resave: true,
  saveUninitialized: false
}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set API routes
app.use('/api/user', require('./server/routes/user'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server;
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port, () => console.log(`API running on localhost:${port}`));
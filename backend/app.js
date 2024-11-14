var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./config/database');  // Sequelize instance
const { register, login, refreshToken, logout } = require('./controller/auth-controller');
const dotenv = require('dotenv');
dotenv.config();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register route
app.post("/api/register", register)

// Login route
app.post('/api/login', login);

// Refresh token route
app.post('/api/refresh-token', refreshToken);

// Logout route
app.post('/api/logout', logout);

// Sync database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });


module.exports = app;

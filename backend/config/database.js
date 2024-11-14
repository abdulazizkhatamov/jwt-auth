// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',  // Default to localhost if not defined
  username: process.env.DB_USER || 'your_user',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
  logging: false,  // Disable logging; enable for debugging
});

module.exports = sequelize;

// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import the sequelize instance

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  } 
}, {});

module.exports = User;

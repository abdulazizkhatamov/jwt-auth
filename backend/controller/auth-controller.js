// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRATION });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
};

exports.register = async (req, res) => {
  const {username, password} = req.body;

  try {
    // Step 1: Check if the username already exists
    const user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    // Step 2: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Step 3: Create a new user
    const newUser = await User.create({
      username,
      password: hashedPassword, // Save the hashed password
    });

    // Step 4: Send response
    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Login route
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only set to true in production (requires HTTPS)
    maxAge: 1000 * 60 * 60 * 24 * 7, // Refresh token lasts for 7 days
  });
  
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
    

    // You can perform additional checks here, for example, ensuring the refresh token is not blacklisted or revoked.
    // No need to check the database for the refresh token anymore.

    return res.json({ accessToken: accessToken, user });
  });
};

// Refresh Token route
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
    

    // You can perform additional checks here, for example, ensuring the refresh token is not blacklisted or revoked.
    // No need to check the database for the refresh token anymore.

    const newAccessToken = generateAccessToken(user);
    return res.json({ accessToken: newAccessToken, user });
  });
};

// Logout route
exports.logout = async (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,  // Ensures the cookie is cleared even if it's HTTP-only
    secure: process.env.NODE_ENV === 'production',  // Set to true if in production (requires HTTPS)
    sameSite: 'Strict',  // Prevents sending the cookie in cross-site requests
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
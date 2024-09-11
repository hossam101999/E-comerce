const express = require("express");
const { readData, writeData } = require("../utils/fileOperations");
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const data = readData();
    res.json(data.users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const data = readData();
    const existingUser = data.users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = { id: uuidv4(), name, email, password };
    data.users.push(user);
    writeData(data);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const data = readData();
    const user = data.users.find(user => user.email === email && user.password === password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ message: 'Login successful', user, accessToken });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error: error.message });
  }
});

module.exports = router;

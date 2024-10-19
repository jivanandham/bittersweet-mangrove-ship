const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Firebase OAuth login route
router.post('/login', authController.firebaseAuth);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;

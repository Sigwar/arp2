const express = require('express');
const passport = require('passport');
const authController = require('../../controllers/auth/auth');

const router = express.Router();

// GET PROJECTS LIST
router.post('/signIn', authController.signIn);

module.exports = router;
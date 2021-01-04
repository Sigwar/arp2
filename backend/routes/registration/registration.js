const express = require('express');
const userController = require('../../controllers/user/user');

const router = express.Router();

// GET PROJECTS LIST
router.post('/create', userController.createAccount);

module.exports = router;
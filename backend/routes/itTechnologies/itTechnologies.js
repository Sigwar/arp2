const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../../utils/authenticate');
const itTechnologiesController = require('../../controllers/itTechnologies/itTechnologies');

const router = express.Router();

router.get('/technologies', [ authenticateToken, itTechnologiesController.getItTechnologies ]);
router.post('/create', [ authenticateToken, itTechnologiesController.create ]);
router.delete('/delete', [ authenticateToken, itTechnologiesController.delete ]);

module.exports = router;
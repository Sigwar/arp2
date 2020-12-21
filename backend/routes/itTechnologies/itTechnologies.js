const express = require('express');
const { body } = require('express-validator');
const itTechnologiesController = require('../../controllers/itTechnologies/itTechnologies');

const router = express.Router();

router.get('/technologies', itTechnologiesController.getItTechnologies);
router.post('/create', itTechnologiesController.create);
router.delete('/delete', itTechnologiesController.delete);

module.exports = router;
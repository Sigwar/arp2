const express = require('express');
const { body } = require('express-validator');
const levelsController = require('../../controllers/levels/levels');

const router = express.Router();

router.get('/levels', levelsController.getLevels);
router.get('/levelsDetail', levelsController.getLevelsDetail);
router.post('/create', [
  body('name').trim().isString,
], levelsController.create);
router.delete('/delete', levelsController.delete);

module.exports = router;
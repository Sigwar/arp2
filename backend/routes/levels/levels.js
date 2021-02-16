const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../../utils/authenticate');
const levelsController = require('../../controllers/levels/levels');

const router = express.Router();

router.get('/levels', [ authenticateToken, levelsController.getLevels ]);
router.get('/levelsDetail', [ authenticateToken, levelsController.getLevelsDetail ]);
router.post('/create', [ authenticateToken, levelsController.create ]);
router.delete('/delete', [ authenticateToken, levelsController.delete ]);

module.exports = router;
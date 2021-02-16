const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../../utils/authenticate');
const workstations = require('../../controllers/workstations/workstations');

const router = express.Router();

router.get('/workstations', [ authenticateToken, workstations.getWorkstations ]);
router.get('/workstations-detail', [ authenticateToken, workstations.getWorkstationsDetail ]);
router.post('/create', [ authenticateToken, workstations.create ]);
router.delete('/delete', [ authenticateToken, workstations.delete ]);

module.exports = router;
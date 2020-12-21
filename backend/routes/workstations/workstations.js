const express = require('express');
const { body } = require('express-validator');
const workstations = require('../../controllers/workstations/workstations');

const router = express.Router();

router.get('/workstations', workstations.getWorkstations);
router.get('/workstations-detail', workstations.getWorkstationsDetail);
router.post('/create', workstations.create);
router.delete('/delete', workstations.delete)

module.exports = router;
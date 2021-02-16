const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../../utils/authenticate');
const projectController = require('../../controllers/project/project');

const router = express.Router();

//PROJECT
router.post('/getDetail', [
  body('projectUuid').trim().isLength({ min: 36, max: 36 }),
], [ authenticateToken, projectController.detailProject ]);

router.post('/create', [
  body('name').trim().isLength({ min: 2 }),
  body('client').trim().isLength({ min: 2 }),
], [ authenticateToken, projectController.createProject ]);

router.post('/update',
  body('name').trim().isLength({ min: 2 }),
  body('client').trim().isLength({ min: 2 }),
  projectController.updateProject);

router.delete('/delete', [ authenticateToken, projectController.deleteProject ]);


module.exports = router;
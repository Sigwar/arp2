const express = require('express');
const { body } = require('express-validator');
const projectController = require('../../controllers/project/project');

const router = express.Router();

//PROJECT
router.post('/getDetail', [
  body('projectUuid').trim().isLength({ min: 36, max: 36 }),
], projectController.detailProject);

router.post('/create', [
  body('name').trim().isLength({ min: 2 }),
  body('client').trim().isLength({ min: 2 }),
], projectController.createProject);

router.post('/update',
  body('name').trim().isLength({ min: 2 }),
  body('client').trim().isLength({ min: 2 }),
  projectController.updateProject);

router.delete('/delete', projectController.deleteProject);


module.exports = router;
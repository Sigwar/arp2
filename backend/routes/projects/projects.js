const express = require('express');
const projectsController = require('../../controllers/projects/projects');

const router = express.Router();

// GET PROJECTS LIST
router.post('/projects', projectsController.getProjects);
router.post('/projectsList', projectsController.projectsForEmployee);

module.exports = router;
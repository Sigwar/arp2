const express = require('express');
const authenticateToken = require('../../utils/authenticate');
const projectsController = require('../../controllers/projects/projects');

const router = express.Router();

// GET PROJECTS LIST
router.post('/projects', [ authenticateToken, projectsController.getProjects ]);
router.post('/projectsList', [ authenticateToken, projectsController.projectsForEmployee ]);

module.exports = router;
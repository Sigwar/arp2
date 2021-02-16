const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../../utils/authenticate');
const employeesController = require('../../controllers/employee/employee');

const router = express.Router();

//CREATE EMPLOYEE
router.post('/create', [
  body('name').trim().isLength({ min: 3 }),
  body('lastName').trim().isLength({ min: 3 }),
  body('profession').trim().custom(el => el.length > 0),
  body('level').trim().custom(el => el.length > 0),
  body('itExperience').trim().custom(el => el.length > 0),
], [ authenticateToken, employeesController.createEmployee ]);

router.post('/detail', [ authenticateToken, employeesController.employeeBasic ]);

router.post('/projects', [ authenticateToken, employeesController.employeeProjects ]);

router.patch('/update', [
  body('employee.name').trim().isLength({ min: 3 }),
  body('employee.lastName').trim().isLength({ min: 3 }),
  body('employee.profession').trim().custom(el => el.length > 0),
  body('employee.level').trim().custom(el => el.length > 0),
  body('employee.itExperience').trim().custom(el => el.length > 0),
], [ authenticateToken, employeesController.updateEmployee ]);

router.delete('/delete-project', [ authenticateToken, employeesController.deleteEmployeeProject ]);

router.patch('/update-project', [ authenticateToken, employeesController.updateEmployeeProject ]);

router.post('/projects-to-import', [ authenticateToken, employeesController.projectsToImport ]);

router.post('/import-project', [ authenticateToken, employeesController.importProjects ]);

router.post('/create-education', [
  body('schoolName').trim().isLength({ min: 3 }),
], [ authenticateToken, employeesController.createEducation ]);

router.post('/educations', [ authenticateToken, employeesController.educations ]);

router.delete('/delete-education', [ authenticateToken, employeesController.deleteEducation ]);

router.patch('/update-education', [
  body('schoolName').trim().isLength({ min: 3 }),
], [ authenticateToken, employeesController.updateEducation ]);

router.post('/certificate', [ authenticateToken, employeesController.certificate ]);

router.post('/create-certificate', [
  body('name').trim().isLength({ min: 3 }),
  body('credentialId').trim().isLength({ min: 3 }),
  body('date').trim().trim().custom(el => el.length > 0),
], [ authenticateToken, employeesController.createCertificate ]);

router.delete('/delete-certificate', [ authenticateToken, employeesController.deleteCertificate ]);

router.patch('/update-certificate', [
  body('name').trim().isLength({ min: 3 }),
  body('credentialId').trim().isLength({ min: 3 }),
  body('date').trim().trim().custom(el => el.length > 0),
], [ authenticateToken, employeesController.updateCertificate ]);

module.exports = router;
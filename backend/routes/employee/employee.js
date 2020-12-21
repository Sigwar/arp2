const express = require('express');
const { body } = require('express-validator');
const employeesController = require('../../controllers/employee/employee');

const router = express.Router();

//CREATE EMPLOYEE
router.post('/create', [
  body('name').trim().isLength({ min: 2 }),
  body('lastName').trim().isLength({ min: 2 }),
], employeesController.createEmployee);

router.post('/detail', employeesController.employeeBasic);

router.post('/projects', employeesController.employeeProjects);

router.patch('/update', employeesController.updateEmployee);

router.delete('/delete-project', employeesController.deleteEmployeeProject);

router.patch('/update-project', employeesController.updateEmployeeProject);

router.post('/projects-to-import', employeesController.projectsToImport);

router.post('/import-project', employeesController.importProjects);

router.post('/create-education', employeesController.createEducation);

router.post('/educations', employeesController.educations);

router.delete('/delete-education', employeesController.deleteEducation);

router.patch('/update-education', employeesController.updateEducation);

router.post('/certificate', employeesController.certificate);

router.post('/create-certificate', employeesController.createCertificate);

router.delete('/delete-certificate', employeesController.deleteCertificate);

router.patch('/update-certificate', employeesController.updateCertificate);

module.exports = router;
const express = require('express');
const { body } = require('express-validator');
const employeesController = require('../../controllers/employee/employee');

const router = express.Router();

//CREATE EMPLOYEE
router.post('/create', [
  body('name').trim().isLength({ min: 3 }),
  body('lastName').trim().isLength({ min: 3 }),
  body('profession').trim().custom(el => el.length > 0),
  body('level').trim().custom(el => el.length > 0),
  body('itExperience').trim().custom(el => el.length > 0),
], employeesController.createEmployee);

router.post('/detail', employeesController.employeeBasic);

router.post('/projects', employeesController.employeeProjects);

router.patch('/update', [
  body('employee.name').trim().isLength({ min: 3 }),
  body('employee.lastName').trim().isLength({ min: 3 }),
  body('employee.profession').trim().custom(el => el.length > 0),
  body('employee.level').trim().custom(el => el.length > 0),
  body('employee.itExperience').trim().custom(el => el.length > 0),
], employeesController.updateEmployee);

router.delete('/delete-project', employeesController.deleteEmployeeProject);

router.patch('/update-project', employeesController.updateEmployeeProject);

router.post('/projects-to-import', employeesController.projectsToImport);

router.post('/import-project', employeesController.importProjects);

router.post('/create-education', [
  body('schoolName').trim().isLength({ min: 3 }),
], employeesController.createEducation);

router.post('/educations', employeesController.educations);

router.delete('/delete-education', employeesController.deleteEducation);

router.patch('/update-education', [
  body('schoolName').trim().isLength({ min: 3 }),
], employeesController.updateEducation);

router.post('/certificate', employeesController.certificate);

router.post('/create-certificate', [
  body('name').trim().isLength({ min: 3 }),
  body('credentialId').trim().isLength({ min: 3 }),
  body('date').trim().trim().custom(el => el.length > 0),
], employeesController.createCertificate);

router.delete('/delete-certificate', employeesController.deleteCertificate);

router.patch('/update-certificate', [
  body('name').trim().isLength({ min: 3 }),
  body('credentialId').trim().isLength({ min: 3 }),
  body('date').trim().trim().custom(el => el.length > 0),
], employeesController.updateCertificate);

module.exports = router;
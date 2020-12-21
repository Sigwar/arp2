const express = require('express');
const employeesController = require('../../controllers/employees/employees');
const router = express.Router();

//GET EMPLOYEES LIST
router.post('/employees', employeesController.getEmployees);

router.post('/employeeList', employeesController.employeesForProject);

module.exports = router;
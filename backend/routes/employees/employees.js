const express = require('express');
const authenticateToken = require('../../utils/authenticate');
const employeesController = require('../../controllers/employees/employees');

const router = express.Router();

//GET EMPLOYEES LIST
router.post('/employees', [ authenticateToken, employeesController.getEmployees ]);

router.post('/employeeList', [ authenticateToken, employeesController.employeesForProject ]);

router.post('/employeeListWithoutProject', [ authenticateToken, employeesController.employeeWithoutProject ]);

module.exports = router;
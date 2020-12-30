const Users = require('../../models/users/users');
const Levels = require('../../models/levels/levels');
const Employees = require('../../models/emplyoees/employees');
const Workstation = require('../../models/workstation/workstation');
const EmployeeProjects = require('../../models/employeeProjects/employeeProjects');
const Project = require('../../models/projects/projects');

const generatorUuid = require('uuid');
const { validationResult } = require('express-validator');

//GET EMPLOYEES LIST
exports.getEmployees = async (req, res, next) => {
  try {
    const user = await Users.findOne({ raw: true, where: { uuid: req.body.userUuid } });

    const data = await Employees.findAll({
      raw: true,
      where: { userId: user.id, isActive: req.body.statusSearch },
      order: [ [ req.body.sortBy, req.body.direction ] ],
      attributes: {
        exclude: [ 'id', 'userId', 'updatedAt', 'createdAt' ],
      },
    });

    const employees = [];

    for await (const el of data) {
      let workstation;
      if (el.workstationId != null) {
        workstation = await Workstation.findOne({
          raw: true,
          where: { id: el.workstationId },
          attributes: {
            exclude: [ 'id', 'uuid', 'createAt', 'updateAt' ],
          },
        });
      } else {
        workstation = '';
      }

      let level;
      if (el.levelId != null) {
        level = await Levels.findOne({
          raw: true,
          where: { id: el.levelId },
          attributes: {
            exclude: [ 'id', 'uuid', 'createAt', 'updateAt' ],
          },
        });
      } else {
        level = '';
      }

      employees.push({
        uuid: el.uuid,
        name: el.name,
        picture: '', //TODO ADD PICTURE URL
        level: level.name,
        isActive: el.isActive,
        profession: workstation.name,
      });
    }

    res.status(200).json(employees);
  } catch (e) {
  }
};

//GET EMPLOYEE FOR PROJECTS LIST
exports.employeesForProject = async (req, res, next) => {
  try {
    const user = await Users.findOne({ raw: true, where: { uuid: req.body.userUuid } });

    const employee = await Employees.findAll({
      raw: true,
      where: { isActive: 1, userId: user.id },
      attributes: {
        exclude: [ 'id', 'birthday', 'itExperience', 'isActive', 'createdAt', 'updatedAt', 'workstationId', 'levelId', 'userId' ],
      },
    });

    res.status(200).json(employee);
  } catch (e) {

  }
};

//DELETE EMPLOYEE
exports.delete = async (req, res, next) => {
  try {
    await Employees.destroy({ where: { uuid: req.body.uuid } });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};

//GET EMPLOYEE WITHOUT PROJECT
exports.employeeWithoutProject = async (req, res, next) => {

  try {
    const user = await Users.findOne({ raw: true, where: { uuid: req.body.uuid } });

    const employees = await Employees.findAll({
      raw: true,
      where: { userId: user.id },
      attributes: {
        exclude: [ 'birthday', 'itExperience', 'isActive', 'workstationId', 'levelId', 'userId', 'updatedAt', 'createdAt' ],
      },
    });

    const project = await Project.findOne({
      where: { uuid: req.body.projectUuid }, attributes: {
        exclude: [ 'name', 'client', 'topic', 'description', 'dateEnd', 'dateStart', 'updatedAt', 'createdAt' ],
      },

    });

    if (project.userId === user.id) {
      const employeeList = [];

      for await(const employee of employees) {
        const doesItHave = await EmployeeProjects.findOne({
          where: { employeeId: employee.id, projectId: project.id },
        });

        if (doesItHave === null) {
          employeeList.push(employee);
        }
      }

      res.status(200).json(employeeList);
    }
  } catch (e) {
    res.status(422).json(e);
  }
};
const Users = require('../../models/users/users');
const Roles = require('../../models/roles/roles');
const Level = require('../../models/levels/levels');
const Picture = require('../../models/pictures/pictures');
const Projects = require('../../models/projects/projects');
const Languages = require('../../models/languages/languages');
const Employees = require('../../models/emplyoees/employees');
const Education = require('../../models/educations/educations');
const Activities = require('../../models/activities/activities');
const Workstation = require('../../models/workstation/workstation');
const Certificate = require('../../models/certificates/certificates');
const ItTechnologies = require('../../models/itTechnologies/itTechnologies');
const LanguagesLevel = require('../../models/languagesLevels/languagesLevel');
const EmployeeProjects = require('../../models/employeeProjects/employeeProjects');
const EmployeeLanguages = require('../../models/employeeLanguages/employeeLanguages');
const ProjectItTechnologies = require('../../models/projectItTechnologies/projectItTechnologies');
const EmployeeItTechnologies = require('../../models/employeeItTechnologies/itTechnologiesEmployee');

const generatorUuid = require('uuid');
const { validationResult } = require('express-validator');

exports.createEmployee = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      const workstations = await Workstation.findOne({ raw: true, where: { name: req.body.profession } });
      const level = await Level.findOne({ raw: true, where: { name: req.body.level } });
      const user = await Users.findOne({ raw: true, where: { uuid: req.body.userUuid } });
      const uuid = generatorUuid.v4();

      const employee = await Employees.create({
        uuid: uuid,
        name: req.body.name,
        isActive: req.body.isActive,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        itExperience: req.body.itExperience,
        userId: user.id,
        levelId: level.id,
        languages: req.body.languages,
        workstationId: workstations.id,
      });

      for await(const item of req.body.itKnowledge) {
        const technology = await ItTechnologies.findOne({
          raw: true,
          where: { name: item },
        });

        await EmployeeItTechnologies.create({
          itTechnologyId: technology.id,
          employeeId: employee.id,
        });
      }

      for await(const item of req.body.projects) {
        const project = await Projects.findOne({ raw: true, where: { uuid: item } });
        const uuidEmployeeProject = generatorUuid.v4();

        await EmployeeProjects.create({
          uuid: uuidEmployeeProject,
          dateStart: project.dateStart,
          dateEnd: project.dateEnd,
          projectId: project.id,
          employeeId: employee.id,
        });
      }

      for await(const lng of req.body.languages) {
        let userLng = lng.split(' ');

        const language = await Languages.findOne({ raw: true, where: { name: userLng[ 0 ] } });
        const level = await LanguagesLevel.findOne({ raw: true, where: { name: userLng[ 1 ] } });

        await EmployeeLanguages.create({
          employeeId: employee.id,
          languageId: language.id,
          languagesLevelId: level.id,
        });
      }

      res.status(201).json({ uuid: uuid });
    } catch (e) {
      res.status(422).json(e);
    }
  } else {
    res.status(422).json({
      error: error.array(),
    });
  }
};

exports.employeeBasic = async (req, res, next) => {

  try {
    const employee = await Employees.findOne({
      raw: true,
      where: { uuid: req.body.employeeUuid },
      attributes: {
        exclude: [ 'updatedAt', 'createdAt' ],
      },
    });
    const user = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'login', 'password', 'updatedAt', 'createdAt' ],
      },
    });

    if (employee.userId === user.id) {
      const language = await EmployeeLanguages.findAll({
        raw: true,
        where: { employeeId: employee.id },
        attributes: {
          exclude: [ 'id', 'updatedAt', 'createdAt' ],
        },
      });

      const picture = await Picture.findOne({
        raw: true,
        where: { employeeId: employee.id },
        attributes: {
          exclude: [ 'id', 'updatedAt', 'createdAt', 'employeeId' ],
        },
      });
      const employeeItTechnologies = await EmployeeItTechnologies.findAll({
        raw: true,
        where: { employeeId: employee.id },
        attributes: {
          exclude: [ 'id', 'updatedAt', 'createdAt' ],
        },
      });

      let workstation;
      if (employee.workstationId != null) {
        workstation = await Workstation.findOne({
          raw: true,
          where: { id: employee.workstationId },
          attributes: {
            exclude: [ 'id', 'uuid', 'updatedAt', 'createdAt' ],
          },
        });
      } else {
        workstation = '';
      }

      let level;
      if (employee.levelId != null) {
        level = await Level.findOne({
          raw: true,
          where: { id: employee.levelId },
          attributes: {
            exclude: [ 'id', 'uuid', 'updatedAt', 'createdAt' ],
          },
        });
      } else {
        level = '';
      }

      const languages = [];
      for await(const lng of language) {
        const level = await LanguagesLevel.findOne({
          raw: true,
          where: { id: lng.languagesLevelId },
          attributes: {
            exclude: [ 'id', 'uuid', 'updatedAt', 'createdAt' ],
          },
        });
        const language = await Languages.findOne({
          raw: true,
          where: { id: lng.languageId },
          attributes: {
            exclude: [ 'id', 'uuid', 'updatedAt', 'createdAt' ],
          },
        });
        languages.push(`${language.name} ${level.name}`);
      }

      const itTechnologies = [];
      for await (const tech of employeeItTechnologies) {
        const itTech = await ItTechnologies.findOne({
          raw: true,
          where: { id: tech.itTechnologyId },
          attributes: {
            exclude: [ 'id', 'uuid', 'updatedAt', 'createdAt' ],
          },
        });
        itTechnologies.push(itTech.name);
      }

      const employeeDetail = {
        picture: picture ? picture : '',
        uuid: employee.uuid,
        name: employee.name,
        languages: languages,
        lastName: employee.lastName,
        birthday: employee.birthday,
        isActive: employee.isActive,
        itTechnologies: itTechnologies,
        profession: workstation.name,
        level: level.name,
        itExperience: employee.itExperience,
      };

      res.status(200).json(employeeDetail);
    } else {
      res.status(404).json([]);
    }
  } catch (e) {
    console.error(e);
  }
};

exports.updateEmployee = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      const employee = await Employees.findOne({
        raw: true,
        where: { uuid: req.body.employee.uuid },
        attributes: {
          exclude: [ 'updatedAt', 'createdAt' ],
        },
      });
      const user = await Users.findOne({
        raw: true,
        where: { uuid: req.body.userUuid },
        attributes: {
          exclude: [ 'login', 'password', 'updatedAt', 'createdAt', 'uuid' ],
        },
      });

      const workstation = await Workstation.findOne({
        raw: true,
        where: { id: employee.workstationId },
      });
      const level = await Level.findOne({
        raw: true,
        where: { id: employee.levelId },
      });

      if (employee.userId === user.id) {
        await Employees.update({
            name: req.body.employee.name,
            lastName: req.body.employee.lastName,
            birthday: req.body.employee.birthday,
            isActive: req.body.employee.isActive ? 1 : 0,
            itExperience: req.body.employee.itExperience,
          },
          { where: { uuid: req.body.employee.uuid } });
      }

      if (req.body.employee.workstation) {
        const newWorkstation = await Workstation.findOne({
          raw: true,
          where: { name: req.body.employee.workstation },
        });
        await Employees.update({
            workstationId: newWorkstation.id,
          },
          { where: { uuid: req.body.employee.uuid } });
      } else {
      }

      if (req.body.employee.level) {
        const newLevel = await Level.findOne({
          raw: true,
          where: { name: req.body.employee.level },
        });

        await Employees.update({
            levelId: newLevel.id,
          },
          { where: { uuid: req.body.employee.uuid } });
      }

      if (Array.isArray(req.body.employee.itTechnologies) && req.body.employee.itTechnologies.length) {
        await EmployeeItTechnologies.destroy({
          where: { employeeId: employee.id },
        });

        for await(const item of req.body.employee.itTechnologies) {
          const technology = await ItTechnologies.findOne({
            raw: true,
            where: { name: item },
          });

          await EmployeeItTechnologies.create({
            itTechnologyId: technology.id,
            employeeId: employee.id,
          });
        }

      } else {
        await EmployeeItTechnologies.destroy({
          where: { employeeId: employee.id },
        });
      }

      if (Array.isArray(req.body.employee.languages) && req.body.employee.languages.length) {
        await EmployeeLanguages.destroy({
          where: { employeeId: employee.id },
        });

        for await(const lng of req.body.employee.languages) {
          let userLng = lng.split(' ');

          const language = await Languages.findOne({ raw: true, where: { name: userLng[ 0 ] } });
          const level = await LanguagesLevel.findOne({ raw: true, where: { name: userLng[ 1 ] } });

          await EmployeeLanguages.create({
            employeeId: employee.id,
            languageId: language.id,
            languagesLevelId: level.id,
          });
        }

      } else {
        await EmployeeLanguages.destroy({
          where: { employeeId: employee.id },
        });
      }
      res.status(200).json();
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(422).json({
      error: error.array(),
    });
  }
};

exports.employeeProjects = async (req, res, next) => {
  try {
    const employee = await Employees.findOne({
      raw: true,
      where: { uuid: req.body.employeeUuid },
      attributes: {
        exclude: [ 'updatedAt', 'createdAt' ],
      },
    });
    const user = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'login', 'password', 'updatedAt', 'createdAt' ],
      },
    });

    if (employee.userId === user.id) {
      const employeeProjects = await EmployeeProjects.findAll({
        raw: true,
        where: { employeeId: employee.id },
        attributes: {
          exclude: [ 'updatedAt', 'createdAt' ],
        },
      });

      const projects = [];
      for await(const project of employeeProjects) {

        const projectDetail = await Projects.findOne({
          raw: true,
          where: { id: project.projectId },
          attributes: {
            exclude: [ 'updatedAt', 'createdAt' ],
          },
        });

        const technologies = [];
        const itTechnologies = await ProjectItTechnologies.findAll({
          raw: true,
          where: { employeeProjectId: project.id },
          attributes: {
            exclude: [ 'id', 'updatedAt', 'createdAt' ],
          },
        });
        for await(const tech of itTechnologies) {
          const itTech = await ItTechnologies.findOne({
            raw: true,
            where: { id: tech.itTechnologyId },
            attributes: {
              exclude: [ 'id', 'uuid', 'updatedAt', 'createdAt' ],
            },
          });
          technologies.push(itTech.name);
        }

        const projectRoles = [];
        const roles = await Roles.findAll({
          raw: true,
          where: { employeeProjectId: project.id },
          attributes: {
            exclude: [ 'updatedAt', 'createdAt', 'uuid', 'id', 'employeeProjectId' ],
          },
        });
        for (const item of roles) {
          projectRoles.push(item.name);
        }

        const projectActivities = [];
        const activities = await Activities.findAll({
          raw: true,
          where: { employeeProjectId: project.id },
        });
        for (const item of activities) {
          projectActivities.push(item.description);
        }

        projects.push({
          uuid: project.uuid,
          dateStart: project.dateStart,
          dateEnd: project.dateEnd,
          name: projectDetail.name,
          client: projectDetail.client,
          topic: projectDetail.topic,
          description: projectDetail.description,
          technologies: technologies,
          roles: projectRoles,
          activities: projectActivities,
        });
      }

      res.status(200).json(projects);
    }
  } catch (e) {
  }
};

exports.deleteEmployeeProject = async (req, res, next) => {
  try {
    await EmployeeProjects.destroy({
      where: { uuid: req.body.uuid },
    });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};

exports.updateEmployeeProject = async (req, res, next) => {
  try {
    const project = await EmployeeProjects.findOne({
      raw: true,
      where: { uuid: req.body.uuid },
      attributes: {
        exclude: [ 'updatedAt', 'createdAt' ],
      },
    });

    if (req.body.date[ 0 ] !== project.dateStart) {
      await EmployeeProjects.update({
          dateStart: req.body.date[ 0 ],
        },
        {
          where: { uuid: req.body.uuid },
        });
    }
    if (req.body.date[ 1 ] !== project.dateEnd) {
      await EmployeeProjects.update({
          dateEnd: req.body.date[ 1 ],
        },
        {
          where: { uuid: req.body.uuid },
        });
    }

    if (Array.isArray(req.body.technologies) && req.body.technologies.length) {
      await ProjectItTechnologies.destroy({
        where: { employeeProjectId: project.id },
      });

      for await(const item of req.body.technologies) {
        const technology = await ItTechnologies.findOne({
          raw: true,
          where: { name: item },
        });

        await ProjectItTechnologies.create({
          itTechnologyId: technology.id,
          employeeProjectId: project.id,
        });
      }

    } else {
      await ProjectItTechnologies.destroy({
        where: { employeeProjectId: project.id },
      });
    }

    if (Array.isArray(req.body.roles) && req.body.roles.length) {
      await Roles.destroy({
        where: { employeeProjectId: project.id },
      });

      for await(const item of req.body.roles) {
        const uuid = generatorUuid.v4();

        await Roles.create({
          name: item,
          employeeProjectId: project.id,
          uuid: uuid,
        });
      }
    } else {
      await Roles.destroy({
        where: { employeeProjectId: project.id },
      });
    }

    if (Array.isArray(req.body.activities) && req.body.activities.length) {
      await Activities.destroy({
        where: { employeeProjectId: project.id },
      });

      for await(const item of req.body.activities) {
        const uuid = generatorUuid.v4();

        await Activities.create({
          description: item,
          employeeProjectId: project.id,
          uuid: uuid,
        });
      }
    } else {
      await Activities.destroy({
        where: { employeeProjectId: project.id },
      });
    }

    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};

exports.projectsToImport = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'password', 'login', 'updatedAt', 'createdAt' ],
      },
    });
    const employee = await Employees.findOne({
      raw: true,
      where: { uuid: req.body.employeeUuid, userId: user.id },
      attributes: {
        exclude: [ 'name', 'lastName', 'birthday', 'itExperience', 'isActive', 'workstationId', 'levelId', 'userId', 'updatedAt', 'createdAt' ],
      },
    });

    const allProjects = await Projects.findAll({
      raw: true,
      where: { userId: user.id },
      attributes: {
        exclude: [ 'topic', 'dateEnd', 'dateStart', 'description', 'userId', 'updatedAt', 'createdAt' ],
      },
    });
    const employeeProjects = await EmployeeProjects.findAll({
      raw: true,
      where: { employeeId: employee.id },
      attributes: {
        exclude: [ 'dateEnd', 'dateStart', 'updatedAt', 'createdAt', 'employeeId' ],
      },
    });

    const projects = [];
    allProjects.forEach(element => {
      const isUsed = employeeProjects.find(item => element.id === item.projectId);
      if (!isUsed) {
        projects.push({
          name: element.name,
          client: element.client,
          uuid: element.uuid,
        });
      }
    });

    res.status(200).json(projects);
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.importProjects = async (req, res, next) => {
  try {
    const employee = await Employees.findOne({
      raw: true,
      where: { uuid: req.body.employeeUuid },
    });

    for await(const item of req.body.projects) {
      const uuid = generatorUuid.v4();
      const project = await Projects.findOne({
        raw: true,
        where: { uuid: item },
      });

      await EmployeeProjects.create({
        uuid: uuid,
        dateStart: project.dateStart,
        dateEnd: project.dateEnd,
        projectId: project.id,
        employeeId: employee.id,
      });
    }
    res.status(200).json();
  } catch (e) {
    res.status(422).json(e);
  }
};

exports.createEducation = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      const employee = await Employees.findOne({
        raw: true,
        where: { uuid: req.body.employeeUuid },
        attributes: {
          exclude: [ 'updatedAt', 'createdAt' ],
        },
      });
      const user = await Users.findOne({
        raw: true,
        where: { uuid: req.body.userUuid },
        attributes: {
          exclude: [ 'updatedAt', 'createdAt' ],
        },
      });

      if (employee.userId === user.id) {
        const uuid = generatorUuid.v4();

        await Education.create({
          uuid: uuid,
          employeeId: employee.id,
          schoolName: req.body.schoolName,
          description: req.body.description,
          dateStart: req.body.date[ 0 ],
          dateEnd: req.body.date[ 1 ],
        });

        res.status(201).json();
      }
    } catch (e) {
      res.status(422).json(e);
    }
  } else {
    res.status(422).json({
      error: error.array(),
    });
  }
};

exports.educations = async (req, res, next) => {
  try {
    const employee = await Employees.findOne({
      raw: true,
      where: { uuid: req.body.employeeUuid },
      attributes: {
        exclude: [ 'updatedAt', 'createdAt' ],
      },
    });
    const user = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'login', 'password', 'updatedAt', 'createdAt' ],
      },
    });

    if (employee.userId === user.id) {

      const educations = await Education.findAll({
        raw: true,
        where: { employeeId: employee.id },
        attributes: {
          exclude: [ 'id', 'updatedAt', 'createdAt', 'employeeId' ],
        },
      });

      const employeeEducation = [];
      educations.forEach(edu => {
        employeeEducation.push({
          uuid: edu.uuid,
          schoolName: edu.schoolName,
          description: edu.description,
          date: [ edu.dateStart, edu.dateEnd ],
        });
      });

      res.status(200).json(employeeEducation);
    }
  } catch (e) {
    console.error(e);
  }
};

exports.deleteEducation = async (req, res, next) => {
  try {
    await Education.destroy({
      where: { uuid: req.body.uuid },
    });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};

exports.updateEducation = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      await Education.update({
          schoolName: req.body.schoolName,
          description: req.body.description,
          dateStart: req.body.date[ 0 ],
          dateEnd: req.body.date[ 1 ],
        },
        { where: { uuid: req.body.uuid } });

      res.status(200).json();
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(422).json({
      error: error.array(),
    });
  }
};

exports.certificate = async (req, res, next) => {
  try {
    const employee = await Employees.findOne({
      raw: true,
      where: { uuid: req.body.employeeUuid },
      attributes: {
        exclude: [ 'updatedAt', 'createdAt' ],
      },
    });
    const user = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'login', 'password', 'updatedAt', 'createdAt' ],
      },
    });

    if (employee.userId === user.id) {
      const certificate = await Certificate.findAll({
        raw: true,
        where: { employeeId: employee.id },
        attributes: {
          exclude: [ 'id', 'updatedAt', 'createdAt', 'employeeId' ],
        },
      });

      res.status(200).json(certificate);
    }
  } catch (e) {
    console.error(e);
  }
};

exports.createCertificate = async (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    try {
      const employee = await Employees.findOne({
        raw: true,
        where: { uuid: req.body.employeeUuid },
        attributes: {
          exclude: [ 'updatedAt', 'createdAt' ],
        },
      });
      const user = await Users.findOne({
        raw: true,
        where: { uuid: req.body.userUuid },
        attributes: {
          exclude: [ 'updatedAt', 'createdAt' ],
        },
      });

      if (employee.userId === user.id) {
        const uuid = generatorUuid.v4();

        await Certificate.create({
          uuid: uuid,
          employeeId: employee.id,
          name: req.body.name,
          credentialId: req.body.credentialId,
          date: req.body.date,
        });

        res.status(201).json();
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(422).json({
      error: error.array(),
    });
  }
};

exports.deleteCertificate = async (req, res, next) => {
  try {
    await Certificate.destroy({
      where: { uuid: req.body.uuid },
    });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};

exports.updateCertificate = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      await Certificate.update({
          name: req.body.name,
          credentialId: req.body.credentialId,
          date: req.body.date,
        },
        { where: { uuid: req.body.uuid } });

      res.status(200).json();
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(422).json({
      error: error.array(),
    });
  }
};

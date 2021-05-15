const generatorUuid = require('uuid');
const Users = require('../../models/users/users');
const { validationResult } = require('express-validator');
const Languages = require('../../models/languages/languages');
const LanguagesLevel = require('../../models/languagesLevels/languagesLevel');
const EmployeeLanguages = require('../../models/employeeLanguages/employeeLanguages');

//GET LANGUAGES
exports.getLanguages = async (req, res, next) => {
  try {
    const { id } = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'login', 'password', 'updatedAt', 'createdAt', 'uuid', 'email' ],
      },
    });

    if (id) {
      const languages = await Languages.findAll({
        raw: true,
        where: { userId: id },
        attributes: {
          exclude: [ 'id', 'updatedAt', 'createdAt' ],
        },
      });

      res.status(200).json(languages);
    } else {
      res.status(401).json();
    }
  } catch (e) {
    console.error(e);
  }
};

exports.getLanguagesLevel = async (req, res, next) => {
  try {
    const languagesLevel = await LanguagesLevel.findAll({
      raw: true,
      attributes: {
        exclude: [ 'id', 'updatedAt', 'createdAt' ],
      },
    });

    res.status(200).json(languagesLevel);
  } catch (e) {
    console.error(e);
  }
};

exports.getLanguagesWithLevel = async (req, res, next) => {
  try {
    const languagesLevel = await LanguagesLevel.findAll({
      raw: true,
      attributes: {
        exclude: [ 'id', 'updatedAt', 'createdAt' ],
      },
    });

    const { id } = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'login', 'password', 'updatedAt', 'createdAt', 'uuid', 'email' ],
      },
    });
    if (id) {

      const languages = await Languages.findAll({
        raw: true,
        where: { userId: id },
        attributes: {
          exclude: [ 'id', 'updatedAt', 'createdAt' ],
        },
      });

      let arr = [];
      languages.forEach(language => {
        languagesLevel.forEach(level => {
          arr.push(`${ language.name } ${ level.name }`);
        });
      });

      res.status(200).json(arr);
    } else {
      res.status(401).json();
    }
  } catch (e) {
    console.error(e);
  }
};

exports.getEmployeeLanguages = async (req, res, next) => {
  try {
    const user = User.findOne({ raw: true, where: { uuid: req.body.userUuid } });

    const employeeLanguages = await EmployeeLanguages.getAll({ raw: true, where: { employeeId: user.id } });

    res.status(200).json(employeeLanguages);
  } catch (e) {
    console.error(e);
  }
};

exports.create = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      const { id } = await Users.findOne({
        raw: true,
        where: { uuid: req.body.userUuid },
        attributes: {
          exclude: [ 'login', 'password', 'updatedAt', 'createdAt', 'uuid', 'email' ],
        },
      });
      if (id) {
        const isExist = await Languages.findOne({
          raw: true,
          where: { name: req.body.name }
        });

        if (!isExist) {
          const uuid = generatorUuid.v4();
          await Languages.create({
            uuid: uuid,
            name: req.body.name,
            userId: id,
          });

          res.status(201).json();
        } else {
          res.status(409).json({ error: [ { msg: 'Language is already exists', param: '' } ] });
        }
      } else {
        res.status(401).json();
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

exports.delete = async (req, res, next) => {
  try {
    await Languages.destroy({
      where: { uuid: req.body.uuid },
    });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};

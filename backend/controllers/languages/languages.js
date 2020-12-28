const Languages = require('../../models/languages/languages');
const LanguagesLevel = require('../../models/languagesLevels/languagesLevel');
const EmployeeLanguages = require('../../models/employeeLanguages/employeeLanguages');
const User = require('../../models/users/users');
const generatorUuid = require('uuid');

//GET LANGUAGES
exports.getLanguages = async (req, res, next) => {
  try {
    const languages = await Languages.findAll({
      raw: true,
      attributes: {
        exclude: [ 'id', 'updatedAt', 'createdAt' ],
      },
    });

    res.status(200).json(languages);
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

    const languages = await Languages.findAll({
      raw: true,
      attributes: {
        exclude: [ 'id', 'updatedAt', 'createdAt' ],
      },
    });

    let arr = [];
    languages.forEach(language => {
      languagesLevel.forEach(level => {
        arr.push(`${language.name} ${level.name}`);
      });
    });

    res.status(200).json(arr);
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
      const uuid = generatorUuid.v4();
      await Languages.create({
        uuid: uuid,
        name: req.body.name,
      });

      res.status(201).json();
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

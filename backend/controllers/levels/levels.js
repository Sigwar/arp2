const Levels = require('../../models/levels/levels');
const generatorUuid = require('uuid');
const { validationResult } = require('express-validator');

exports.getLevels = async (req, res, next) => {
  try {
    const data = await Levels.findAll({
      raw: true,
      attributes: {
        exclude: [ 'id', 'createdAt', 'updatedAt', 'uuid' ],
      },
    });
    const arr = [];
    data.forEach(el => {
      arr.push(el.name);
    });

    res.status(201).json(arr);
  } catch (e) {
  }
};

exports.getLevelsDetail = async (req, res, next) => {
  try {
    const data = await Levels.findAll({
      raw: true,
      attributes: {
        exclude: [ 'id', 'createdAt', 'updatedAt' ],
      },
    });

    res.status(201).json(data);
  } catch (e) {
  }
};

exports.create = async (req, res, next) => {
  try {
    const uuid = generatorUuid.v4();
    await Levels.create({
      uuid: uuid,
      name: req.body.name,
    });

    res.status(201).json();
  } catch (e) {
    console.error(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Levels.destroy({
      where: { uuid: req.body.uuid },
    });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};
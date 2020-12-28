const Workstations = require('../../models/workstation/workstation');
const generatorUuid = require('uuid');
const { validationResult } = require('express-validator');

exports.getWorkstations = async (req, res, next) => {
  try {
    const data = await Workstations.findAll({
      raw: true,
      attributes: {
        exclude: [ 'id', 'createdAt', 'updatedAt', 'uuid' ],
      },
    });

    const arr = [];
    data.forEach(el => {
      arr.push(el.name);
    });

    res.status(200).json(arr);
  } catch (e) {
  }
};

exports.getWorkstationsDetail = async (req, res, next) => {
  try {
    const data = await Workstations.findAll({
      raw: true,
      attributes: {
        exclude: [ 'id', 'createdAt', 'updatedAt' ],
      },
    });

    res.status(200).json(data);
  } catch (e) {
  }
};

exports.create = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      const uuid = generatorUuid.v4();
      await Workstations.create({
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
    await Workstations.destroy({
      where: { uuid: req.body.uuid },
    });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};
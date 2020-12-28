const itTechnologies = require('../../models/itTechnologies/itTechnologies');
const { validationResult } = require('express-validator');

exports.getItTechnologies = async (req, res, next) => {
  try {
    const data = await itTechnologies.findAll({
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

exports.create = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      await itTechnologies.create({
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
    await itTechnologies.destroy({
      where: { name: req.body.name },
    });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};
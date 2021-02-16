const Users = require('../../models/users/users');
const { validationResult } = require('express-validator');
const itTechnologies = require('../../models/itTechnologies/itTechnologies');

exports.getItTechnologies = async (req, res, next) => {
  try {

    const { id } = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'login', 'password', 'updatedAt', 'createdAt', 'uuid', 'email' ],
      },
    });

    if (id) {
      const data = await itTechnologies.findAll({
        raw: true,
        where: { userId: id },
        attributes: {
          exclude: [ 'id', 'createdAt', 'updatedAt', 'uuid' ],
        },
      });

      const arr = [];
      data.forEach(el => {
        arr.push(el.name);
      });

      res.status(200).json(arr);
    } else {
      res.status(401).json();
    }

  } catch (e) {
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
        await itTechnologies.create({
          userId: id,
          name: req.body.name,
        });

        res.status(201).json();
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
    await itTechnologies.destroy({
      where: { name: req.body.name },
    });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};
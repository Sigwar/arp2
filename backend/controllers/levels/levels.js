const generatorUuid = require('uuid');
const Users = require('../../models/users/users');
const Levels = require('../../models/levels/levels');
const { validationResult } = require('express-validator');

exports.getLevels = async (req, res, next) => {
  try {
    const { id } = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'login', 'password', 'updatedAt', 'createdAt', 'uuid', 'email' ],
      },
    });

    if (id) {
      const data = await Levels.findAll({
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
    console.error(e);
    throw new Error(e);
  }
};

exports.getLevelsDetail = async (req, res, next) => {
  try {
    const { id } = await Users.findOne({
      raw: true,
      where: { uuid: req.body.userUuid },
      attributes: {
        exclude: [ 'login', 'password', 'updatedAt', 'createdAt', 'uuid', 'email' ],
      },
    });

    if (id) {
      const data = await Levels.findAll({
        raw: true,
        where: { userId: id },
        attributes: {
          exclude: [ 'id', 'createdAt', 'updatedAt' ],
        },
      });

      res.status(200).json(data);
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
        const isExist = await Levels.findOne({
          raw: true,
          where: { name: req.body.name }
        });

        if(!isExist) {
          const uuid = generatorUuid.v4();
          await Levels.create({
            uuid: uuid,
            name: req.body.name,
            userId: id,
          });

          res.status(201).json();
        } else {
          res.status(409).json({ error: [{msg: 'Level is already exists', param: ''}] });
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
    await Levels.destroy({
      where: { uuid: req.body.uuid },
    });
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};
const Project = require('../../models/projects/projects');
const Users = require('../../models/users/users');
const generatorUuid = require('uuid');
const { validationResult } = require('express-validator');

// CREATE NEW PROJECT
exports.createProject = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      const uuid = generatorUuid.v4();

      const dateStart = new Date(req.body.date[ 0 ]).toISOString().slice(0, 10);
      const dateEnd = new Date(req.body.date[ 1 ]).toISOString().slice(0, 10);

      const user = await Users.findOne({ raw: true, where: { uuid: req.body.userUuid } });

      await Project.create({
        uuid: uuid,
        name: req.body.name,
        client: req.body.client,
        topic: req.body.topic,
        description: req.body.description,
        dateStart: dateStart,
        dateEnd: dateEnd,
        userId: user.id,
      });

      res.status(201).json({ uuid: uuid });
    } catch (e) {
    }
  } else {
    res.status(422).json({
      message: 'Validation failed, data is incorrect',
      error: error.array(),
    });
  }
};

// GET PROJECT DETAIL
exports.detailProject = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      const data = await Project.findOne({
        raw: true,
        where: { uuid: req.body.projectUuid },
      });

      res.status(201).json({
        uuid: data.uuid,
        name: data.name,
        client: data.client,
        date: [ data.dateStart, data.dateEnd ],
        description: data.description,
        topic: data.topic,
      });
    } catch (e) {
    }
  } else {
    res.status(422).json({
      message: 'Validation failed, data is incorrect',
      error: error.array(),
    });
  }
};

// UPDATE PROJECT
exports.updateProject = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {

    const dateStart = new Date(req.body.date[ 0 ]).toISOString().slice(0, 10);
    const dateEnd = new Date(req.body.date[ 1 ]).toISOString().slice(0, 10);

    try {
      await Project.update(
        {
          name: req.body.name,
          client: req.body.client,
          topic: req.body.topic,
          description: req.body.description,
          dateStart: dateStart,
          dateEnd: dateEnd,
        },
        { where: { uuid: req.body.uuid } });

      res.status(201).json({ uuid: req.body.uuid });
    } catch (e) {
    }

  } else {
    res.status(422).json({
      message: 'Validation failed, data is incorrect',
      error: error.array(),
    });
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {
      await Project.destroy({
        where: { uuid: req.body.uuid },
      });
      res.status(201).json();
    } catch (e) {
    }
  } else {
    res.status(422).json({
      message: 'Validation failed, data is incorrect',
      error: error.array(),
    });
  }
};

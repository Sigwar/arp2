const generatorUuid = require('uuid');
const Crypto = require('crypto');
const Users = require('../../models/users/users');
const { validationResult } = require('express-validator');

// GET PROJECTS LIST
exports.createAccount = async (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    try {

      const uuid = generatorUuid.v4();

      const cypt = Crypto.createHash('sha256');
      const hash = cypt.update(req.body.password).digest('hex');

      await Users.create({
        login: req.body.name,
        password: hash,
        email: req.body.email,
        uuid: uuid,
      });

      res.status(200).json();
    } catch (e) {
      if (e.parent.code) {
        if (e.parent.code === 'ER_DUP_ENTRY') {
          res.status(422).json({ error: [ { msg: 'Account already exists', param: '' } ] });
        } else {
          res.status(422).json({
            error: error.array(),
          });
        }
      }

      res.status(422).json({
        error: error.array(),
      });
    }
  } else {
    res.status(422).json({
      error: error.array(),
    });
  }
};

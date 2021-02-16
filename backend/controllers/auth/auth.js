const Crypto = require('crypto');
const jwt = require('jsonwebtoken');
const generatorUuid = require('uuid');
const Users = require('../../models/users/users');
const { validationResult } = require('express-validator');

exports.signIn = async (req, res, next) => {

  const { login, password } = req.body;
  if (login && password) {
    try {
      const user = await Users.findOne({
        raw: true,
        where: { login: login },
        attributes: {
          exclude: [ 'updatedAt', 'createdAt', 'id' ],
        },
      });

      if (user) {
        const cypt = Crypto.createHash('sha256');
        const hash = cypt.update(password).digest('hex');

        if (hash === user.password) {
          let token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET, { expiresIn: 7200 }); //7200 - 2h token active

          res.status(200).json({
            login: user.login,
            token: token,
          });
        } else {
          res.status(401).json({ error: 'Wrong e-mail or password' });
        }
      } else {
        res.status(404).json({ error: 'User not existing' });
      }
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  } else {
    res.status(401).json({ error: 'Wrong e-mail or password' });
  }
};
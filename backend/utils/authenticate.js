const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  const token = req.headers[ 'authorization' ];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, uuid) => {
      if (err) {
        res.status(401).json();
      } else {
        req.body = { ...req.body, userUuid: uuid.uuid };
        next();
      }
    });

  } else {
    res.status(401).json();
  }
};

module.exports = authenticateToken;
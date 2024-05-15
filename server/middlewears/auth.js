const jwt = require('jsonwebtoken');
const config = require("config");

const secretKey = config.get('secretKey')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, secretKey);
      console.log(decodedToken);
      req.user = decodedToken.email;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  } else {
    next()
  }
};

module.exports = authMiddleware

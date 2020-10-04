const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.headers.token;
  const user = await User.getUserFromToken(token);
  if (!user) {
    return res.status(401).json('error: Unauthenticated');
  }
  req.user = user;
  next();
};

module.exports = auth;

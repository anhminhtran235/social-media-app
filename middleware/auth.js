const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.headers.token;
  const user = await User.getUserFromToken(token);
  if (!user) {
    return res.status(401).send('Error: Unauthenticated');
  }
  req.user = user;
  next();
};

module.exports = auth;

const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  bio: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
});

UserSchema.methods.generateToken = function () {
  const user = this;

  const sevenDaysInSeconds = 7 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      id: user._id,
      exp: Math.floor(Date.now() / 1000) + sevenDaysInSeconds,
    },
    config.get('jsonSecret')
  );

  return token;
};

UserSchema.statics.getUserFromToken = async function (token) {
  try {
    const decodedToken = jwt.decode(token, config.get('jsonSecret'));
    const id = decodedToken.id;
    const user = await this.model('user').findById(id);
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = User = mongoose.model('user', UserSchema);

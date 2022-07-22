const mongoose = require('mongoose');

const userScheme = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', userScheme);

const mongoose = require('mongoose');

const taskScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student',
    },
  },
  { collection: 'tasks' }
);

module.exports = mongoose.model('Grade', taskScheme);

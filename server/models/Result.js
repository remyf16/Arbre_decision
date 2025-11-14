
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  decisionTree: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DecisionTree',
    required: true,
  },
  path: [
    {
      nodeId: String,
      answer: String,
    },
  ],
  resultNode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Result', resultSchema);

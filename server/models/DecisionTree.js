const mongoose = require('mongoose');

const decisionTreeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  nodes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
  }],
});

const DecisionTree = mongoose.model('DecisionTree', decisionTreeSchema);

module.exports = DecisionTree;

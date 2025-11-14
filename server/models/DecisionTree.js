const mongoose = require('mongoose');

const decisionTreeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  nodes: {
    type: mongoose.Schema.Types.Mixed,
    default: [],
  },
  edges: {
    type: mongoose.Schema.Types.Mixed,
    default: [],
  },
  status: {
    type: String,
    default: 'Brouillon',
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const DecisionTree = mongoose.model('DecisionTree', decisionTreeSchema);

module.exports = DecisionTree;

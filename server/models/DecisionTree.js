const mongoose = require('mongoose');

// Sub-schema for answers within a node's data
const answerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
});

// Sub-schema for the 'data' object within a node
const nodeDataSchema = new mongoose.Schema({
  label: { type: String, required: true },
  answers: [answerSchema],
});

// Main schema for a React Flow node
const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String },
  data: { type: nodeDataSchema, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
});

// Main schema for a React Flow edge
const edgeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  sourceHandle: { type: String },
});

const decisionTreeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  nodes: {
    type: [nodeSchema],
    default: [],
  },
  edges: {
    type: [edgeSchema],
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

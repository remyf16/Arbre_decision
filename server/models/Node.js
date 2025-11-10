const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  treeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DecisionTree',
    required: true,
  },
  type: {
    type: String,
    enum: ['question', 'result'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  answers: [{
    text: String,
    nextNode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Node',
    },
  }],
});

const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;

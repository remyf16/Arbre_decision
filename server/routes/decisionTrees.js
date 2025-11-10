const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DecisionTree = require('../models/DecisionTree');
const Node = require('../models/Node');

// Get all decision trees
router.get('/', auth, async (req, res) => {
  try {
    const trees = await DecisionTree.find().populate('nodes');
    res.json(trees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single decision tree
router.get('/:id', auth, async (req, res) => {
  try {
    const tree = await DecisionTree.findById(req.params.id).populate('nodes');
    if (!tree) return res.status(404).json({ message: 'Decision tree not found' });
    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new decision tree
router.post('/', auth, async (req, res) => {
  const { title, nodes } = req.body;
  const tree = new DecisionTree({ title, nodes });
  try {
    const newTree = await tree.save();
    res.status(201).json(newTree);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a decision tree
router.patch('/:id', auth, async (req, res) => {
  try {
    const tree = await DecisionTree.findById(req.params.id);
    if (!tree) return res.status(404).json({ message: 'Decision tree not found' });

    if (req.body.title) tree.title = req.body.title;
    if (req.body.nodes) tree.nodes = req.body.nodes;

    const updatedTree = await tree.save();
    res.json(updatedTree);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a decision tree
router.delete('/:id', auth, async (req, res) => {
  try {
    const tree = await DecisionTree.findById(req.params.id);
    if (!tree) return res.status(404).json({ message: 'Decision tree not found' });

    await tree.remove();
    res.json({ message: 'Deleted decision tree' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DecisionTree = require('../models/DecisionTree');

// Get all decision trees
router.get('/', auth, async (req, res) => {
  try {
    const trees = await DecisionTree.find();
    res.json(trees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single decision tree
router.get('/:id', async (req, res) => {
  try {
    const tree = await DecisionTree.findById(req.params.id);
    if (!tree) return res.status(404).json({ message: 'Decision tree not found' });
    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new decision tree
router.post('/', auth, async (req, res) => {
  const { name, description } = req.body;
  const tree = new DecisionTree({
    name: name || 'Nouvel Arbre de Décision',
    description: description || 'Cliquez pour modifier la description.',
    nodes: [],
    edges: [],
    status: 'Brouillon',
  });
  try {
    const newTree = await tree.save();
    res.status(201).json(newTree);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a decision tree
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, nodes, edges } = req.body;
    const tree = await DecisionTree.findById(req.params.id);
    if (!tree) return res.status(404).json({ message: 'Decision tree not found' });

    if (name) tree.name = name;
    if (description) tree.description = description;
    if (nodes) tree.nodes = nodes;
    if (edges) tree.edges = edges;
    tree.updatedAt = Date.now();

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

    await tree.deleteOne();
    res.json({ message: 'Deleted decision tree' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

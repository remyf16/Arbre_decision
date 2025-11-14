
const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const auth = require('../middleware/auth');

// @route   POST api/results
// @desc    Create a result
// @access  Private
router.post('/', auth, async (req, res) => {
  const { decisionTree, path, resultNode } = req.body;
  try {
    const newResult = new Result({
      user: req.user.id,
      decisionTree,
      path,
      resultNode,
    });
    const result = await newResult.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/results/public
// @desc    Create a public result (anonymous)
// @access  Public
router.post('/public', async (req, res) => {
  const { decisionTree, path, resultNode } = req.body;
  try {
    const newResult = new Result({
      user: null,
      decisionTree,
      path,
      resultNode,
    });
    const result = await newResult.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/results/tree/:treeId
// @desc    Get all results for a decision tree
// @access  Private
router.get('/tree/:treeId', auth, async (req, res) => {
  try {
    const results = await Result.find({ decisionTree: req.params.treeId }).populate('user', 'email');
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/results/user/:userId
// @desc    Get all results for a user
// @access  Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const results = await Result.find({ user: req.params.userId }).populate('decisionTree', ['name']);
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

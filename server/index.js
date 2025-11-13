const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'https://arbre-decision-front.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/decision_tree_app';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const decisionTreesRouter = require('./routes/decisionTrees');
app.use('/api/decision-trees', decisionTreesRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

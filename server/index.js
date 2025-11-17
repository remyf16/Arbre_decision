const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://arbre-decision-front.onrender.com',
      'https://arbre-decision.onrender.com',
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin (mobile apps, curl) and whitelist known domains
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);

app.use(express.json());

const decisionTreesRouter = require('./routes/decisionTrees');
app.use('/api/decision-trees', decisionTreesRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const resultsRouter = require('./routes/results');
app.use('/api/results', resultsRouter);

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/decision_tree_app';

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB at ${mongoUri}`);

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();

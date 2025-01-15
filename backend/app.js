const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// Load configuration from environment variables
const mongoUrl = process.env.MONGODB_URL || 'mongodb://mongodb-service:27017/demo';
const apiKey = process.env.API_KEY;

// API Key middleware
const validateApiKey = (req, res, next) => {
  const providedKey = req.headers['x-api-key'];
  if (!providedKey || providedKey !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoUrl);

// Define data schema
const DataSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', DataSchema);

app.get('/data', validateApiKey, async (req, res) => {
  try {
    const data = await Data.find().sort({ timestamp: -1 }).limit(5);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});
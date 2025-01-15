const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Load configuration from environment variables
const backendUrl = process.env.BACKEND_URL || 'http://backend-service:5000';
const apiKey = process.env.API_KEY;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${backendUrl}/data`, {
      headers: { 'X-API-Key': apiKey }
    });
    res.json({
      message: 'Hello from Frontend!',
      backendData: response.data
    });
  } catch (error) {
    res.status(500).json({ error: 'Backend service unavailable' });
  }
});

app.listen(port, () => {
  console.log(`Frontend app listening at http://localhost:${port}`);
});
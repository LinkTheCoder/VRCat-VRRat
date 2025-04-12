const express = require('express');
const redis = require('redis');
const path = require('path');
const app = express();
const PORT = 3000;

// Create Redis client
const client = redis.createClient({
  host: 'localhost', // Use 'localhost' if Redis is local or replace with Docker container name/IP
  port: 6379
});
client.connect().catch(console.error);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to cast a vote
app.post('/vote', async (req, res) => {
  const { voteChoice } = req.body;
  // Increment vote count for the chosen option
  await client.hIncrBy('votes', voteChoice, 1);
  res.send('Vote counted!');
});

// Endpoint to get current vote counts
app.get('/votes', async (req, res) => {
  const votes = await client.hGetAll('votes');
  res.json(votes);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

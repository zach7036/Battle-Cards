const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello from the BattleCards backend!');
});

// Endpoint to get a new matchup
app.get('/api/matchup', (req, res) => {
  // Mock data for now
  const matchup = {
    id: 1,
    creature_a: { id: 1, name: 'Lion', quantity: 10 },
    creature_b: { id: 2, name: 'Tiger', quantity: 8 }
  };
  res.json(matchup);
});

// Endpoint to submit a vote
app.post('/api/vote', (req, res) => {
  const { matchupId, choice } = req.body;
  console.log(`Vote received for matchup ${matchupId}, choice: ${choice}`);
  // Mock response for now
  res.status(200).json({ message: 'Vote recorded successfully' });
});

app.listen(port, () => {
  console.log(`BattleCards backend listening at http://localhost:${port}`);
});

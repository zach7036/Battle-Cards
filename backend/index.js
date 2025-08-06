const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hello from the BattleCards backend!');
});

const creatures = require('./seed.js');

// In-memory store for matchups and votes
const matchups = {};
const history = [];

function getResults(matchupId) {
  const matchup = matchups[matchupId];
  if (!matchup) return null;

  const totalVotes = matchup.votes.A + matchup.votes.B;
  if (totalVotes === 0) {
    return { A: 0, B: 0, totalVotes: 0, percentageA: 0, percentageB: 0 };
  }
  return {
    ...matchup.votes,
    totalVotes: totalVotes,
    percentageA: Math.round((matchup.votes.A / totalVotes) * 100),
    percentageB: Math.round((matchup.votes.B / totalVotes) * 100),
  };
}

// Endpoint to get a new matchup
app.get('/api/matchup', (req, res) => {
  let creatureA = creatures[Math.floor(Math.random() * creatures.length)];
  let creatureB = creatures[Math.floor(Math.random() * creatures.length)];
  while (creatureA.id === creatureB.id) {
    creatureB = creatures[Math.floor(Math.random() * creatures.length)];
  }

  const powerRatio = creatureA.power_rating / creatureB.power_rating;
  let quantityA, quantityB;

  if (powerRatio > 1) {
    quantityA = Math.floor(Math.random() * 5) + 1;
    quantityB = Math.round(quantityA * powerRatio * (Math.random() * 0.4 + 0.8));
  } else {
    quantityB = Math.floor(Math.random() * 5) + 1;
    quantityA = Math.round(quantityB / powerRatio * (Math.random() * 0.4 + 0.8));
  }

  quantityA = Math.max(1, quantityA);
  quantityB = Math.max(1, quantityB);

  const matchupId = `${Date.now()}-${creatureA.id}v${creatureB.id}`;
  const matchupData = {
    id: matchupId,
    creature_a: { ...creatureA, quantity: quantityA },
    creature_b: { ...creatureB, quantity: quantityB },
    votes: { A: 0, B: 0 },
  };

  matchups[matchupId] = matchupData;
  history.unshift(matchupData); // Add to history
  if (history.length > 20) history.pop(); // Keep history to a reasonable size

  res.json({ id: matchupData.id, creature_a: matchupData.creature_a, creature_b: matchupData.creature_b });
});

// Endpoint to submit a vote
app.post('/api/vote', (req, res) => {
  const { matchupId, choice } = req.body;
  const matchup = matchups[matchupId];

  if (matchup && (choice === 'A' || choice === 'B')) {
    matchup.votes[choice]++;
    console.log(`Vote for ${matchupId}: ${choice}. New totals:`, matchup.votes);
    res.status(200).json({ message: 'Vote recorded', results: getResults(matchupId) });
  } else {
    res.status(400).json({ message: 'Invalid matchup or choice' });
  }
});

// Endpoint to get results for a specific matchup
app.get('/api/results/:id', (req, res) => {
  const { id } = req.params;
  const results = getResults(id);
  if (results) {
    res.json(results);
  } else {
    res.status(404).json({ message: 'Matchup not found' });
  }
});

// Endpoint to get the history of matchups
app.get('/api/history', (req, res) => {
  const historyWithResults = history.map(m => ({
    ...m,
    results: getResults(m.id)
  }));
  res.json(historyWithResults);
});

app.listen(port, () => {
  console.log(`BattleCards backend listening at http://localhost:${port}`);
});

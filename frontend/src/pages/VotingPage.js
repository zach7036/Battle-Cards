import React, { useState, useEffect } from 'react';
import MatchupCard from '../components/MatchupCard';

const VotingPage = () => {
  const [matchup, setMatchup] = useState(null);

  useEffect(() => {
    // Fetch matchup from the backend
    fetch('/api/matchup')
      .then(res => res.json())
      .then(data => setMatchup(data));
  }, []);

  if (!matchup) {
    return <div>Loading...</div>;
  }

  const handleVote = (choice) => {
    fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchupId: matchup.id, choice }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // Redirect to results page will be handled by the router
    });
  };

  return (
    <div className="voting-page">
      <h1>Who Would Win?</h1>
      <div className="matchup-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <div onClick={() => handleVote('A')} style={{ cursor: 'pointer' }}>
          <MatchupCard creature={matchup.creature_a} />
        </div>
        <span>VS</span>
        <div onClick={() => handleVote('B')} style={{ cursor: 'pointer' }}>
          <MatchupCard creature={matchup.creature_b} />
        </div>
      </div>
    </div>
  );
};

export default VotingPage;

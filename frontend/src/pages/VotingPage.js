import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import MatchupCard from '../components/MatchupCard';
import './VotingPage.css';

const VotingPage = () => {
  const [matchup, setMatchup] = useState(null);
  const [voted, setVoted] = useState(null); // 'A', 'B', or null
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch matchup from the backend
    fetch('/api/matchup')
      .then(res => res.json())
      .then(data => {
        setMatchup(data);
        setVoted(null); // Reset voted state for new matchup
      });
  }, []);

  if (!matchup) {
    return <div>Loading...</div>;
  }

  const handleVote = (choice) => {
    if (voted) return; // Prevent voting again while waiting for redirect

    setVoted(choice);

    fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchupId: matchup.id, choice }),
    })
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        navigate({ to: '/results', state: { results: data.results, matchup } });
      }, 500); // Wait for animation
    });
  };

  return (
    <div className="voting-page">
      <h1>Who Would Win?</h1>
      <div className="matchup-container">
        <div
          onClick={() => handleVote('A')}
          className={voted ? (voted === 'A' ? 'selected' : 'not-selected') : ''}
        >
          <MatchupCard creature={matchup.creature_a} />
        </div>
        <span>VS</span>
        <div
          onClick={() => handleVote('B')}
          className={voted ? (voted === 'B' ? 'selected' : 'not-selected') : ''}
        >
          <MatchupCard creature={matchup.creature_b} />
        </div>
      </div>
    </div>
  );
};

export default VotingPage;

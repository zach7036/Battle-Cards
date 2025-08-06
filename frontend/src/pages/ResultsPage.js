import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import './ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, matchup } = location.state || {};

  const [widthA, setWidthA] = useState(0);
  const [widthB, setWidthB] = useState(0);

  useEffect(() => {
    if (results) {
      // Trigger the animation
      setTimeout(() => {
        setWidthA(results.percentageA);
        setWidthB(results.percentageB);
      }, 100);
    }
  }, [results]);


  if (!results || !matchup) {
    return (
      <div className="results-page">
        <h1>No results to display</h1>
        <button className="next-battle-btn" onClick={() => navigate({ to: '/' })}>Start a New Battle</button>
      </div>
    );
  }

  const userChoice = location.state?.choice;
  const isMajority = userChoice === 'A' ? results.percentageA >= 50 : results.percentageB > 50;

  return (
    <div className="results-page">
      <h1>Results</h1>
      <h2>{matchup.creature_a.quantity} {matchup.creature_a.name} vs {matchup.creature_b.quantity} {matchup.creature_b.name}</h2>

      <div className="result-bar-container">
        <div className={`result-bar ${userChoice === 'A' && isMajority ? 'majority' : ''}`}>
          <div className="result-bar-inner result-bar-a" style={{ width: `${widthA}%` }}>
            {results.percentageA}%
          </div>
        </div>
        <div className={`result-bar ${userChoice === 'B' && isMajority ? 'majority' : ''}`}>
          <div className="result-bar-inner result-bar-b" style={{ width: `${widthB}%` }}>
            {results.percentageB}%
          </div>
        </div>
      </div>

      <div className="vote-details">
        <p>Total Votes: {results.totalVotes}</p>
        {userChoice && <p>You voted with the {isMajority ? 'majority' : 'minority'}.</p>}
      </div>

      <button className="next-battle-btn" onClick={() => navigate({ to: '/' })}>Next Battle</button>

      <div className="social-share">
        <h3>Share this result!</h3>
        <button>Twitter</button>
        <button>Facebook</button>
      </div>
    </div>
  );
};

export default ResultsPage;

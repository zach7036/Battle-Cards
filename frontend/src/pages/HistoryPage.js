import React, { useState, useEffect } from 'react';
import './HistoryPage.css';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // This endpoint doesn't exist yet, so this will fail.
    // We will create it in the next step.
    fetch('/api/history')
      .then(res => res.json())
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch history:", err);
        // Using mock data for now
        const mockHistory = [
          { id: '1v2', creature_a: { name: 'Lion', quantity: 10 }, creature_b: { name: 'Tiger', quantity: 8 }, results: { percentageA: 55, percentageB: 45 } },
          { id: '3v4', creature_a: { name: 'Bear', quantity: 1 }, creature_b: { name: 'Wolf', quantity: 15 }, results: { percentageA: 60, percentageB: 40 } },
          { id: '5v6', creature_a: { name: 'Eagle', quantity: 5 }, creature_b: { name: 'Gorilla', quantity: 1 }, results: { percentageA: 30, percentageB: 70 } },
        ];
        setHistory(mockHistory);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading history...</div>;
  }

  return (
    <div className="history-page">
      <h1>Matchup History</h1>
      <ul className="history-list">
        {history.map(item => (
          <li key={item.id} className="history-item">
            <span className="history-item-creatures">
              {item.creature_a.quantity} {item.creature_a.name} vs {item.creature_b.quantity} {item.creature_b.name}
            </span>
            <span className="history-item-results">
              {item.results.percentageA}% / {item.results.percentageB}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;

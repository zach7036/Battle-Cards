import React from 'react';

const MatchupCard = ({ creature }) => {
  if (!creature) {
    return null;
  }

  return (
    <div className="matchup-card">
      <img src={creature.imageUrl || 'https://via.placeholder.com/150'} alt={creature.name} />
      <h2>{creature.quantity} {creature.name}</h2>
    </div>
  );
};

export default MatchupCard;

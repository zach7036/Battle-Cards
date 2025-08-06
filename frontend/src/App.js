import React from 'react';
import { Outlet, Link } from '@tanstack/react-router';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>BattleCards</h1>
        <nav>
          <Link to="/" style={{ marginRight: '10px' }}>Play</Link>
          <Link to="/history">History</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

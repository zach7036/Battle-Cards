import React from 'react';
import { Outlet } from '@tanstack/react-router';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>BattleCards</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

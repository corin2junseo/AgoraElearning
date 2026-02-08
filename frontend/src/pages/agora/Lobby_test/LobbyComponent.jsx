import React from 'react';

const LobbyComponent = () => {
  return (
    <div>
      <h1>Lobby</h1>
      <iframe
    src="http://localhost:3000/lobby.html"
    style={{ width: '100%', height: '100vh', border: 'none' }}
    title="Lobby"
    allow="camera; microphone"
/>

    </div>
  );
};

export default LobbyComponent;

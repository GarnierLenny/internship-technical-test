import React from 'react';

function App() {
  const baseColors: string[] = [
    '#ff0000',
    '#ffa500',
    '#ffff00',
    '#008000',
    '#0000ff',
  ];

  return (
    <div style={{display: 'flex'}}>
      {baseColors.map((section, index) => (
        <div style={{backgroundColor: section, flex: 1, height: '100vh'}} key={index}>
          <p></p>
        </div>
      ))}
    </div>
  );
}

export default App;

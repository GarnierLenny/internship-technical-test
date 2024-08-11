import React from 'react';
import { styles } from './App.styles';

function App() {
  const baseColors: string[] = [
    'rgb(255, 0, 0)',
    'rgb(255, 165, 0)',
    'rgb(255, 255, 0)',
    'rgb(0, 128, 0)',
    'rgb(0, 0, 255)',
  ];

  return (
    <div style={{display: 'flex'}}>
      {baseColors.map((bgColor, index) => (
        <div style={{...styles.section, backgroundColor: bgColor}} key={index}>
          <div style={styles.textContainer}>
            <p>{bgColor}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

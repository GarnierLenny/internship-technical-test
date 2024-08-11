import React from 'react';
import { styles } from './App.styles';

function App() {
  const baseColors: number[][] = [
    [255, 0, 0],
    [255, 165, 0],
    [255, 255, 0],
    [0, 128, 0],
    [0, 0, 255],
  ];


  const componentToHex = (c: number) => {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  return (
    <div style={{display: 'flex'}}>
      {baseColors.map((bgColor, index) => {
        const color = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;

        return (
        <div style={{...styles.section, backgroundColor: color}} key={index}>
          <div style={{...styles.textContainer, flexDirection: "column"}}>
            <p>{color}</p>
            <p>{rgbToHex(bgColor[0], bgColor[1], bgColor[2])}</p>
          </div>
        </div>
      )})}
    </div>
  );
}

export default App;

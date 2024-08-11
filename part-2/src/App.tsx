import React, { useState } from 'react';
import { styles } from './App.styles';

function App() {
  const [colors, setColors] = useState<string[]>([
    '255, 0, 0',
    '255, 165, 0',
    '255, 255, 0',
    '0, 128, 0',
    '0, 0, 255',
  ]);

  const componentToHex = (c: number) => {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  const rgbToHex = (rgb: number[]) => {
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
  }

  const getNewPalette = async () => {
    const data = await fetch('http://colormind.io/api/', {
      method: 'POST',
      body: JSON.stringify({model: "default"}),
    })
    .then(async (data) => await data.json());

    for (let i = 0; i < 5; i++) {
      setColors((oldColors => {
        const currentColor = `${data.result[i][0]}, ${data.result[i][1]}, ${data.result[i][2]}`;
        const newColors: string[] = [...oldColors];

        newColors[i] = currentColor;
        return newColors;
      }));
    }
    return data;
  };

  return (
    <div style={{display: 'flex'}}>
      {colors.map((bgColor, index) => {
        return (
        <div style={{...styles.section, backgroundColor: `rgb(${bgColor})`}} key={index}>
          <div style={{...styles.textContainer, flexDirection: "column"}}>
            <p>{`rgb(${bgColor})`}</p>
            <p>{rgbToHex(bgColor.split(',').map(character => parseInt(character)))}</p>
          </div>
        </div>
      )})}
      <button onClick={getNewPalette} style={{...styles.button, position: 'absolute'}}>Generate new palette</button>
    </div>
  );
}

export default App;

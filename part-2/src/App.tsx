import React, { useEffect, useState } from 'react';
import { styles } from './App.styles';
import { BiCopy } from 'react-icons/bi';
import { ImLock, ImUnlocked } from "react-icons/im";
import toast, { Toaster } from 'react-hot-toast';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function App() {
  const [colors, setColors] = useState<string[]>([
    '255, 0, 0',
    '255, 165, 0',
    '255, 255, 0',
    '0, 128, 0',
    '0, 0, 255',
  ]);
  const defaultModel: string = 'default';
  const [locked, setLocked] = useState<boolean[]>(Array(5).fill(false));
  const [availableModels, setAvailableModels] = useState<string[]>([defaultModel]);
  const [currentModel, setCurrentModel] = useState<string>(defaultModel);

  useEffect(() => {
    const getModels = async () => {
      const data = await fetch('http://colormind.io/list/')
        .then(async res => await res.json())
        .catch(err => err);
      setAvailableModels(data.result);
      console.log(data.result);
    };

    getModels();
  }, []);

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
      body: JSON.stringify({
        model: currentModel,
        input: colors.map((color, index) => locked[index] ? color.split(',').map(value => parseInt(value)) : "N"),
      }),
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const toggleLock = (index: number) => {
    setLocked((oldLocks) => {
      const newLocks = [...locked];

      newLocks[index] = !newLocks[index];
      return newLocks;
    });
  };

  return (
    <div style={{display: 'flex'}}>
      <Toaster />
      {colors.map((bgColor, index) => {
        const hexColor: string = rgbToHex(bgColor.split(',').map(character => parseInt(character)));
        return (
        <div style={{...styles.section, backgroundColor: `rgb(${bgColor})`}} key={index}>
          <div style={{...styles.textContainer, flexDirection: "column"}}>
            <div style={styles.subTextContainer}>
              <p>{`rgb(${bgColor})`}</p>
              <BiCopy onClick={() => copyToClipboard(`rgb(${bgColor})`)} style={styles.icon} size={25} />
            </div>
            <div style={styles.subTextContainer}>
              <p>{hexColor}</p>
              <BiCopy onClick={() => copyToClipboard(hexColor)} style={styles.icon} size={25} />
            </div>
            {locked[index] ?
              <ImLock onClick={() => toggleLock(index)} style={styles.icon} size={25} /> :
              <ImUnlocked onClick={() => toggleLock(index)} style={styles.icon} size={25} />}
          </div>
        </div>
      )})}
      <button onClick={getNewPalette} style={{...styles.button, position: 'absolute'}}>Generate new palette</button>
      <div style={{right: 0, width: '17%', fontWeight: '600', position: 'absolute', margin: 20}}>
        <Dropdown options={availableModels} onChange={(item) => {setCurrentModel(item.value)}} value={currentModel} placeholder="Select an option" />
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { styles } from './App.styles';
import { Toaster } from 'react-hot-toast';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Sections from './Sections';

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
    };

    getModels();
  }, []);

  const getNewPalette = async () => {
    const data = await fetch('http://colormind.io/api/', {
      method: 'POST',
      body: JSON.stringify({
        model: currentModel,
        input: colors.map((color, index) => locked[index] ? color.split(',').map(value => parseInt(value)) : "N"),
      }),
    })
    .then(async (data) => await data.json())
    .catch(err => err);

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
      <Toaster />
      <Sections lock={{locked, setLocked}} colors={colors} />
      <button onClick={getNewPalette} style={{...styles.button, position: 'absolute'}}>Generate new palette</button>
      <div style={{...styles.dropMenu, position: 'absolute'}}>
        <Dropdown options={availableModels} onChange={(item) => {setCurrentModel(item.value)}} value={currentModel} placeholder="Select an option" />
      </div>
    </div>
  );
}

export default App;

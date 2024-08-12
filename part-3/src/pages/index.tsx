import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Sections from "../components/sections.component";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
    const getStoredColors = () => {
      let storedColors: string[] | undefined = localStorage.getItem('storedColors')?.replace('[', '').replace(']', '').replaceAll('"', '').split(',');

      if (storedColors !== undefined) setColors(storedColors?.map(item => item.replaceAll('.', ',')));
    };

    const getModels = async () => {
      const data = await fetch('http://colormind.io/list/')
        .then(async res => await res.json())
        .catch(err => undefined);
      if (data === undefined) return;
      setAvailableModels(data.result);
    };
    getModels();
    getStoredColors();
  }, []);

  useEffect(() => {
    const storeColors = () => {
      if (localStorage.getItem('storedColors') && (colors[0] === '255, 0, 0' && colors[1] === '255, 165, 0')) return;
      console.log('Storing...', JSON.stringify(colors.map(color => color.replaceAll(',', '.'))));
      localStorage.setItem('storedColors', JSON.stringify(colors.map(color => color.replaceAll(',', '.'))));
    };

    storeColors();
  }, [colors]);

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
    <main
      className={`flex min-h-screen flex-col ${inter.className}`}
    >
      <Toaster />
      <Sections lockState={{locked, setLocked}} colorsState={{colors, setColors}} />
      <button className="absolute bottom-0 w-screen py-4 bg-blue-700 hover:bg-blue-900" onClick={getNewPalette}>Generate new palette</button>
      <div className="absolute right-0 top-0 m-5 w-1/6">
        <Dropdown options={availableModels} onChange={(item) => {setCurrentModel(item.value)}} value={currentModel} placeholder="Select an option" />
      </div>
    </main>
  );
}

import { Inter } from "next/font/google";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Sections from "./sections.component";

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

  const getNewPalette = async () => {
    const data = await fetch('http://colormind.io/api/', {
      method: 'POST',
      body: JSON.stringify({
        model: 'default',
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
      <Sections lock={{locked, setLocked}} colors={colors} />
      <button className="absolute bottom-0 w-screen py-4 bg-blue-700 hover:bg-blue-900" onClick={getNewPalette}>Generate new palette</button>
    </main>
  );
}

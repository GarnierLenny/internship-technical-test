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

  return (
    <main
      className={`flex min-h-screen flex-col ${inter.className}`}
    >
      <Toaster />
      <Sections lock={{locked, setLocked}} colors={colors} />
    </main>
  );
}

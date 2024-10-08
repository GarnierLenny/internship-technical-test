import { rgbToHex, copyToClipboard, hexToRgb } from "@/utils";
import React, { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ImLock, ImUnlocked } from "react-icons/im";
import { HexColorPicker } from "react-colorful";

type SectionsType = {
  colorsState: {
    colors: string[],
    setColors: React.Dispatch<React.SetStateAction<string[]>>
  },
  lockState: {
    locked: boolean[],
    setLocked: React.Dispatch<React.SetStateAction<boolean[]>>
  }
};

function Sections({colorsState, lockState}: SectionsType) {
  const toggleLock = (index: number) => {
    lockState.setLocked((oldLocks) => {
      const newLocks = [...oldLocks];

      newLocks[index] = !newLocks[index];
      return newLocks;
    });
  };
  const [pickerShowed, setPickerShowed] = useState<boolean[]>(Array(5).fill(false));

  const moveColor = (disabledIndex: number, index: number, offset: number) => {
    if (index === disabledIndex) return;
    colorsState.setColors((oldColors) => {
      const newColors = [...oldColors];

      const tmp: string = newColors[index];
      newColors[index] = newColors[index + offset];
      newColors[index + offset] = tmp;
      return newColors;
    });
    lockState.setLocked((oldLocks) => {
      const newLocks = [...oldLocks];

      const tmp: boolean = newLocks[index];
      newLocks[index] = newLocks[index + offset];
      newLocks[index + offset] = tmp;
      return newLocks;
    });
    setPickerShowed((oldShowed) => {
      const newShowed = [...oldShowed];

      const tmp: boolean = newShowed[index];
      newShowed[index] = newShowed[index + offset];
      newShowed[index + offset] = tmp;
      return newShowed;
    });
  };

  const setPickerColor = (index: number, color: string) => {
    colorsState.setColors((oldColors) => {
      const newColors = [...oldColors];
      const newColor = hexToRgb(color);

      if (newColor !== null) newColors[index] = newColor;
      return newColors;
    });
  };

  const togglePicker = (index: number) => {
    setPickerShowed((oldPickers) => {
      const newPickers = [...oldPickers];

      newPickers[index] = !newPickers[index];
      return newPickers;
    });
  };

  return (
    <div className="grid grid-cols-5">
      {colorsState.colors.map((bgColor, index) => {
        const hexColor: string = rgbToHex(bgColor.split(',').map(character => parseInt(character)));
        return (
        <div className="flex flex-col gap-y-4 justify-center h-screen" style={{backgroundColor: `rgb(${bgColor})`}} key={index}>
          <div className="flex flex-col self-center bg-semi-transparent w-3/4 p-4 rounded-lg gap-y-4">
            <div className="flex flex-row justify-between">
              <p>{`rgb(${bgColor})`}</p>
              <BiCopy className="cursor-pointer" onClick={() => copyToClipboard(`rgb(${bgColor})`)} size={25} />
            </div>
            <div className="flex flex-row justify-between">
              <p>{hexColor}</p>
              <BiCopy className="cursor-pointer" onClick={() => copyToClipboard(hexColor)} size={25} />
            </div>
            <div className="flex place-self-center cursor-pointer flex-row justify-around w-full">
              <FaArrowLeft onClick={() => moveColor(0, index, -1)} color={index === 0 ? "#999" : "#fff"} size={25} />
              {lockState.locked[index] ?
                <ImLock onClick={() => toggleLock(index)} size={25} /> :
                <ImUnlocked onClick={() => toggleLock(index)} size={25} />
              }
              <FaArrowRight onClick={() => moveColor(colorsState.colors.length - 1, index, 1)} color={index === colorsState.colors.length - 1 ? "#999" : "#fff"} size={25} />
            </div>
            <button onClick={() => togglePicker(index)} className="font-bold self-center cursor-pointer w-full">{pickerShowed[index] === true ? 'Hide picker' : 'Show picker'}</button>
          </div>
          {
            pickerShowed[index] === true &&
            <div className="popover self-center">
              <HexColorPicker color={rgbToHex(colorsState.colors[index].split(',').map(elem => parseInt(elem)))} onChange={(color) => {setPickerColor(index, color)}} />
            </div>
          }
        </div>
      )})}
    </div>
  );
};

export default Sections;

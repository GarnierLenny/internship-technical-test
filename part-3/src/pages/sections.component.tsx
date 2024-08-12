import { rgbToHex, copyToClipboard } from "@/utils";
import React from "react";
import { BiCopy } from "react-icons/bi";
import { ImLock, ImUnlocked } from "react-icons/im";

function Sections({colors, lock}: {colors: string[], lock: {locked: boolean[], setLocked: React.Dispatch<React.SetStateAction<boolean[]>>}}) {
  const toggleLock = (index: number) => {
    lock.setLocked((oldLocks) => {
      const newLocks = [...oldLocks];

      newLocks[index] = !newLocks[index];
      return newLocks;
    });
  };

  return (
    <div className="grid grid-cols-5">
      {colors.map((bgColor, index) => {
        const hexColor: string = rgbToHex(bgColor.split(',').map(character => parseInt(character)));
        return (
        <div className="grow flex justify-center h-screen gap-5" style={{backgroundColor: `rgb(${bgColor})`}} key={index}>
          <div className="flex flex-col self-center bg-semi-transparent w-3/4 p-4 rounded-lg gap-y-4">
            <div className="flex flex-row justify-between">
              <p>{`rgb(${bgColor})`}</p>
              <BiCopy className="cursor-pointer" onClick={() => copyToClipboard(`rgb(${bgColor})`)} size={25} />
            </div>
            <div className="flex flex-row justify-between">
              <p>{hexColor}</p>
              <BiCopy className="cursor-pointer" onClick={() => copyToClipboard(hexColor)} size={25} />
            </div>
            <div className="place-self-center cursor-pointer">
              {lock.locked[index] ?
                <ImLock onClick={() => toggleLock(index)} size={25} /> :
                <ImUnlocked onClick={() => toggleLock(index)} size={25} />}
            </div>
          </div>
        </div>
      )})}
    </div>
  );
};

export default Sections;

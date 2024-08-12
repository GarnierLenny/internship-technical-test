import React from "react";
import { BiCopy } from "react-icons/bi";
import { ImLock, ImUnlocked } from "react-icons/im";
import { styles } from "./Sections.styles";
import { rgbToHex, copyToClipboard } from "../utils";

function Sections({colors, lock}: {colors: string[], lock: {locked: boolean[], setLocked: React.Dispatch<React.SetStateAction<boolean[]>>}}) {
  const toggleLock = (index: number) => {
    lock.setLocked((oldLocks) => {
      const newLocks = [...oldLocks];

      newLocks[index] = !newLocks[index];
      return newLocks;
    });
  };

  return (
    <div style={styles.sectionsContainer}>
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
            {lock.locked[index] ?
              <ImLock onClick={() => toggleLock(index)} style={styles.icon} size={25} /> :
              <ImUnlocked onClick={() => toggleLock(index)} style={styles.icon} size={25} />}
          </div>
        </div>
      )})}
    </div>
  );
};

export default Sections;

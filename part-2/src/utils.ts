import toast from "react-hot-toast";

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard!');
};

export const rgbToHex = (rgb: number[]) => {
  const componentToHex = (c: number) => {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}
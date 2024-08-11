const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

async function getNewPalette() {
  const data = await fetch('http://colormind.io/api/', {
    method: 'POST',
    body: JSON.stringify({model: "default"}),
  })
  .then(async (data) => await data.json());
  const parent = document.getElementById('sectionsParent');

  for (let i = 0; i < parent.children.length; i++) {
    const currentColor = `rgb(${data.result[i][0]}, ${data.result[i][1]}, ${data.result[i][2]})`;
    parent.children[i].style.backgroundColor = currentColor;
    document.getElementById(`rgb${i + 1}`).textContent = currentColor;
    document.getElementById(`hex${i + 1}`).textContent = rgbToHex(
      data.result[i][0],
      data.result[i][1],
      data.result[i][2]
    );
  }
  return data;
};

// Select color input
const cellColor = document.querySelector('#colorPicker');

// Select size input
const gridHeight = document.querySelector('#input_height');
const gridWidth = document.querySelector('#input_width');

// Select the table
const pixelCanvas = document.querySelector('#pixel_canvas');

// Set up the table
function makeGrid(tableRef, rows, cols) {
  // remove existing rows
  while(tableRef.rows.length > 0)  {
    tableRef.deleteRow(0);
  }

  let newRow;
  let newCell;

  // add rows
  for (let r = 0; r < rows; r++) {
    newRow = tableRef.insertRow(r);

    // add cells
    for (let c = 0; c < cols; c++) {
      newCell = newRow.insertCell(c);
    }
  }
}

// adapted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

// Change or reset the color of a cell
function changeColor(cell, color) {
  if (cell.style.backgroundColor === hexToRgb(color)) {
    cell.style.removeProperty('background-color');
  } else {
    cell.style.backgroundColor = color;
  }
}

// When size is submitted by the user, call makeGrid()
document.querySelector('#sizePicker').addEventListener('submit', function (evt) {
  evt.preventDefault();
  makeGrid(pixelCanvas, gridHeight.value, gridWidth.value);
});

// Set up event handler on the table instead of on each cell
pixelCanvas.addEventListener('click', function(evt) {
  // Select the nearest <td>
  let cell = evt.target.closest('td');
  // Did not click inside a <td> so do nothing
  if (!cell) return;
  // Call function to change the color
  changeColor(cell, cellColor.value);
});

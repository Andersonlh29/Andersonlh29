let grid = [];
let solution = [];
let prefilled = [];
let status = [];

let cols = 9;
let rows = 9;
let cellSize = 50;
let selectedCell = { i: -1, j: -1 };
let showBoard = false;

// Sonidos
let soundError;
let soundCorrecto;

function preload() {
  // Carga los sonidos
  soundFormats('mp3', 'wav');
  soundError = loadSound('error-126627.mp3');
  soundCorrecto = loadSound('new-notification-07-210334.mp3');
}

function startGame(level) {
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('sudoku-container').style.display = 'block';

  showBoard = true;

  grid = [];
  solution = [];
  status = [];

  if (level === 'facil') {
    prefilled = [
      [0,0,0, 2,6,0, 7,0,1],
      [6,8,0, 0,7,0, 0,9,0],
      [1,9,0, 0,0,4, 5,0,0],
      [8,2,0, 1,0,0, 0,4,0],
      [0,0,4, 6,0,2, 9,0,0],
      [0,5,0, 0,0,3, 0,2,8],
      [0,0,9, 3,0,0, 0,7,4],
      [0,4,0, 0,5,0, 0,3,6],
      [7,0,3, 0,1,8, 0,0,0],
    ];

    solution = [
      [4,3,5, 2,6,9, 7,8,1],
      [6,8,2, 5,7,1, 4,9,3],
      [1,9,7, 8,3,4, 5,6,2],
      [8,2,6, 1,9,5, 3,4,7],
      [3,7,4, 6,8,2, 9,1,5],
      [9,5,1, 7,4,3, 6,2,8],
      [5,1,9, 3,2,6, 8,7,4],
      [2,4,8, 9,5,7, 1,3,6],
      [7,6,3, 4,1,8, 2,5,9],
    ];
  }

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    status[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = prefilled[i][j];
      status[i][j] = "vacio";
      if (prefilled[i][j] !== 0) {
        status[i][j] = "prefilled";
      }
    }
  }
}

function setup() {
  let canvas = createCanvas(cols * cellSize, rows * cellSize);
  canvas.parent('sudoku-container');
}

function draw() {
  background(255);
  if (showBoard) {
    drawGrid();
  }
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellSize;
      let y = j * cellSize;

      stroke(0);
      strokeWeight(1);
      fill(255);
      rect(x, y, cellSize, cellSize);

      if (selectedCell.i === i && selectedCell.j === j) {
        fill(200, 200, 255, 100);
        rect(x, y, cellSize, cellSize);
      }

      if (grid[i][j] !== 0) {
        let numColor = 0;

        if (status[i][j] === "prefilled") {
          numColor = color(0);
        } else if (status[i][j] === "correcto") {
          numColor = color(0, 180, 0);
        } else if (status[i][j] === "incorrecto") {
          numColor = color(220, 0, 0);
        }

        fill(numColor);
        textAlign(CENTER, CENTER);
        textSize(24);
        text(grid[i][j], x + cellSize / 2, y + cellSize / 2);
      }
    }
  }

  strokeWeight(3);
  for (let i = 0; i <= cols; i++) {
    if (i % 3 === 0) {
      line(i * cellSize, 0, i * cellSize, height);
      line(0, i * cellSize, width, i * cellSize);
    }
  }
}

function mousePressed() {
  if (!showBoard) return;

  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);

  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    if (prefilled[i][j] === 0) {
      selectedCell.i = i;
      selectedCell.j = j;
    } else {
      selectedCell.i = -1;
      selectedCell.j = -1;
    }
  }
}

function keyPressed() {
  if (!showBoard) return;

  if (selectedCell.i !== -1 && selectedCell.j !== -1) {
    let n = int(key);
    if (n >= 1 && n <= 9) {
      grid[selectedCell.i][selectedCell.j] = n;

      if (n === solution[selectedCell.i][selectedCell.j]) {
        status[selectedCell.i][selectedCell.j] = "correcto";
        soundCorrecto.play();
      } else {
        status[selectedCell.i][selectedCell.j] = "incorrecto";
        soundError.play();
      }
    }
    if (key === '0' || key === 'Backspace') {
      grid[selectedCell.i][selectedCell.j] = 0;
      status[selectedCell.i][selectedCell.j] = "vacio";
    }
  }
}


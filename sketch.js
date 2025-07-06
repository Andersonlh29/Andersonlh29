let grid = [];
let solution = [];
let prefilled = [];
let status = [];

let cols = 9;
let rows = 9;
let cellSize = 50;

let selectedCell = { i: -1, j: -1 };
let showBoard = false;

let marginX, marginY;
let canvasWidth = 900;
let canvasHeight = 600;

let soundError, soundCorrecto;

// Cronómetro
let startTime;

// Contador de errores
let errores = 0;

let currentLevel = 'facil';

// Botones p5
let backButton, restartButton;

function preload() {
  soundFormats('mp3', 'wav');
  soundError = loadSound('error-126627.mp3');
  soundCorrecto = loadSound('new-notification-07-210334.mp3');
}

function startGame(level) {
  currentLevel = level;

  document.getElementById('welcome').style.display = 'none';
  document.getElementById('sudoku-container').style.display = 'block';
  showBoard = true;

  startTime = millis();
  errores = 0;

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
  } else if (level === 'medio') {
    prefilled = [
      [0,2,0, 6,0,8, 0,0,0],
      [5,8,0, 0,0,9, 7,0,0],
      [0,0,0, 0,4,0, 0,0,0],
      [3,7,0, 0,0,0, 5,0,0],
      [6,0,0, 0,0,0, 0,0,4],
      [0,0,8, 0,0,0, 0,1,3],
      [0,0,0, 0,2,0, 0,0,0],
      [0,0,9, 8,0,0, 0,3,6],
      [0,0,0, 3,0,6, 0,9,0],
    ];

    solution = [
      [1,2,3, 6,7,8, 9,4,5],
      [5,8,4, 2,1,9, 7,6,3],
      [9,6,7, 5,4,3, 1,2,8],
      [3,7,2, 4,6,1, 5,8,9],
      [6,9,1, 7,8,5, 3,2,4],
      [4,5,8, 9,3,2, 6,1,7],
      [8,3,6, 1,2,4, 9,5,7],
      [2,1,9, 8,5,7, 4,3,6],
      [7,4,5, 3,9,6, 2,7,1],
    ];
  } else if (level === 'avanzado') {
    prefilled = [
      [0,0,5, 3,0,0, 0,0,0],
      [8,0,0, 0,0,0, 0,2,0],
      [0,7,0, 0,1,0, 5,0,0],
      [4,0,0, 0,0,5, 3,0,0],
      [0,1,0, 0,7,0, 0,0,6],
      [0,0,3, 2,0,0, 0,8,0],
      [0,6,0, 5,0,0, 0,0,9],
      [0,0,4, 0,0,0, 0,3,0],
      [0,0,0, 0,0,9, 7,0,0],
    ];

    solution = [
      [1,4,5, 3,2,7, 6,9,8],
      [8,3,9, 6,5,4, 1,2,7],
      [6,7,2, 9,1,8, 5,4,3],
      [4,9,6, 1,8,5, 3,7,2],
      [2,1,8, 4,7,3, 9,5,6],
      [7,5,3, 2,9,6, 4,8,1],
      [3,6,7, 5,4,2, 8,1,9],
      [9,8,4, 7,6,1, 2,3,5],
      [5,2,1, 8,3,9, 7,6,4],
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

  marginX = (canvasWidth - cols * cellSize) / 2;
  marginY = (canvasHeight - rows * cellSize) / 2 + 30;

  createButtons();
}

function createButtons() {
  if (backButton) backButton.remove();
  if (restartButton) restartButton.remove();

  backButton = createButton('Atrás');
  backButton.position(740, 355);
  backButton.mousePressed(backToMenu);
  backButton.style('background-color', '#000000');
  backButton.style('border', '2px solid #00FF00');
  backButton.style('color', '#00FF00');

  restartButton = createButton('Reiniciar');
  restartButton.position(730, 415);
  restartButton.mousePressed(restartGame);
  restartButton.style('background-color', '#000000');
  restartButton.style('border', '2px solid #00FF00');
  restartButton.style('color', '#00FF00');
}

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sudoku-container');
}

function draw() {
  background(0);

  if (showBoard) {
    drawMainBorder();
    drawGrid();
    drawTimer();
    drawErrores();
    drawSudokuTitle();
  }
}

function drawMainBorder() {
  noFill();
  stroke('#00FF00');
  strokeWeight(4);
  rect(20, 20, canvasWidth - 40, canvasHeight - 40);
}

function drawTimer() {
  let elapsed = floor((millis() - startTime) / 1000);
  let minutes = nf(floor(elapsed / 60), 2);
  let seconds = nf(elapsed % 60, 2);

  // Efecto parpadeo de los dos puntos
  let showColon = millis() % 1000 < 500 ? ':' : ' ';
  let timerText = `${minutes}${showColon}${seconds}`;

  // Efecto pulso dinámico
  let pulse = map(sin(millis() / 500), -1, 1, 180, 255);

  push();
  fill(0, pulse, 0); // Pulso verde
  textAlign(CENTER);
  textSize(32);

  // Sombra tipo LED glow
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = '#00FF00';

  text(`Tiempo ${timerText}`, width / 2.1, 63);
  pop();
}

function drawErrores() {
  fill('#FF0000');
  textAlign(RIGHT);
  textSize(30);
  text(`Errores:`, 840, 60);
  text(`${errores}`, 800, 90);

  if (errores >= 5) {
    textSize(26);
    fill('#FF0000');
    textAlign(CENTER);
    text("Juego terminado. Intentos fallidos al máximo.\nReinicie el juego.", width / 2, height - 50);
  }
}

function drawSudokuTitle() {
  fill('#00FF00');
  textAlign(CENTER, CENTER);

  let totalHeight = rows * cellSize;
  let letters = ['S', 'U', 'D', 'O', 'K', 'U'];
  let letterHeight = totalHeight / letters.length;

  textSize(letterHeight * 0.7);

  for (let i = 0; i < letters.length; i++) {
    text(letters[i], 115, marginY + letterHeight * i + letterHeight / 2);
  }
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = marginX + i * cellSize;
      let y = marginY + j * cellSize;

      stroke(0);
      strokeWeight(1);
      fill(255);
      rect(x, y, cellSize, cellSize);

      if (selectedCell.i === i && selectedCell.j === j) {
        fill(0, 255, 0, 50);
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

  stroke('#00FF00');
  strokeWeight(3);
  for (let i = 0; i <= cols; i++) {
    if (i % 3 === 0) {
      line(marginX + i * cellSize, marginY, marginX + i * cellSize, marginY + rows * cellSize);
      line(marginX, marginY + i * cellSize, marginX + cols * cellSize, marginY + i * cellSize);
    }
  }
}

function mousePressed() {
  if (!showBoard || errores >= 5) return;

  let i = floor((mouseX - marginX) / cellSize);
  let j = floor((mouseY - marginY) / cellSize);

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
  if (!showBoard || errores >= 5) return;

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
        errores++;
      }
    }

    if (key === '0' || key === 'Backspace') {
      grid[selectedCell.i][selectedCell.j] = 0;
      status[selectedCell.i][selectedCell.j] = "vacio";
    }
  }
}

function backToMenu() {
  showBoard = false;
  if (backButton) backButton.remove();
  if (restartButton) restartButton.remove();
  document.getElementById('sudoku-container').style.display = 'none';
  document.getElementById('welcome').style.display = 'flex';
}

function restartGame() {
  startGame(currentLevel);
}

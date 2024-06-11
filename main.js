// Helicopter Game Start
let heliColor;
while (true) {
  heliColor = prompt("green or blue helicopter color?");
  if (heliColor.toLowerCase() == "blue" || heliColor.toLowerCase() == "green") {
    break;
  }
}
let gameColor = prompt("What is your favourite color?");
// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables ( ONCE)
let heliImg = document.createElement("img");

if (heliColor.toLowerCase() == "blue") {
  heliImg.src = "img/heliBlueTransparent.png";
} else if (heliColor.toLowerCase() == "green") {
  heliImg.src = "img/heliGreenTransparent.png";
}

let explosion = document.createElement("audio");
explosion.src = "sound/propeller.wav";

let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav";

let mouseIsPressed = false;
// Global Variables reset
let state;
let heli;
let wall1;
let wall2;
let wall3;
let wall4;
let circle;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

// EVENT STUFF
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
  mouseIsPressed = true;

  // Play propeller sound
  propeller.currentTime = 0;
  propeller.play();

  // Start Game on Mousedown
  if (state === "start") {
    state = "gameon";
  }
}

function mouseupHandler() {
  mouseIsPressed = false;
  propeller.pause();
}

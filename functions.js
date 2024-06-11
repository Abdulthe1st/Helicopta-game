// FUNCTIONS

let distance = 0;
let best = 0;
let coins = 0;

// Draw Start Screen
function drawStart() {
  drawMainComponenets();

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

// Draw Game Elements
function runGame() {
  // LOGIC
  moveHeli();
  moveWalls();
  checkCollisions();

  // DRAW
  drawGame();
}

function moveHeli() {
  // Accelerate upward if mouse is pressed
  if (mouseIsPressed) {
    heli.speed += -1;
  }

  // Apply Gravity (accel)
  heli.speed += heli.accel;

  // Constrain Speed (max/min)
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  // Move Helicopter by its speed
  heli.y += heli.speed;
}

function moveWalls() {
  // Wall 1
  wall1.x += -3;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall4.x + 500;
    wall1.y = Math.random() * 300 + 100;
  }

  // wall 2
  wall2.x += -3;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
    wall2.y = Math.random() * 300 + 100;
    distance++;
  }

  // wall 3
  wall3.x += -3;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
    wall3.y = Math.random() * 300 + 100;
  }

  wall4.x += -3;
  if (wall4.x + wall4.w < 0) {
    wall4.x = wall3.x + 500;
    wall4.y = Math.random() * 300 + 100;
    distance++;
  }

  wall5.x += -3;
  if (wall5.x + wall5.w < 0) {
    wall5.x = wall4.x + 500;
    wall5.y = Math.random() * 300 + 100;
  }
}

function checkCollisions() {
  // Collision with Top and Bottom Green Bars
  if (heli.y < 50) {
    gameOver();
    if (distance > best) {
      best = distance;
    }
  } else if (heli.y + heli.h > cnv.height - 50) {
    gameOver();
    if (distance > best) {
      best = distance;
    }
  }

  // Collision with the Walls

  if (
    heli.x + heli.w >= wall1.x &&
    heli.y + heli.h >= wall1.y &&
    heli.y <= wall1.y + wall1.h &&
    heli.x <= wall1.x + wall1.w
  ) {
    gameOver();
    if (distance > best) {
      best = distance;
    }
  }

  if (
    heli.x + heli.w >= wall2.x &&
    heli.y + heli.h >= wall2.y &&
    heli.y <= wall2.y + wall2.h &&
    heli.x <= wall2.x + wall2.w
  ) {
    gameOver();
    if (distance > best) {
      best = distance;
    }
  }

  if (
    heli.x + heli.w >= wall3.x &&
    heli.y + heli.h >= wall3.y &&
    heli.y <= wall3.y + wall3.h &&
    heli.x <= wall3.x + wall3.w
  ) {
    gameOver();
    if (distance > best) {
      best = distance;
    }
  }

  if (
    heli.x + heli.w >= wall4.x &&
    heli.y + heli.h >= wall4.y &&
    heli.y <= wall4.y + wall4.h &&
    heli.x <= wall4.x + wall4.w
  ) {
    for (let i = 0; i < 10; i++) {
      wall1.x += -1;
      wall2.x += -1;
      wall3.x += -1;
    }
  }

  if (
    heli.x + heli.w >= wall5.x &&
    heli.y + heli.h >= wall5.y &&
    heli.y <= wall5.y + wall5.h &&
    heli.x <= wall5.x + wall5.w
  ) {
    coins += 1;
    if (distance > best) {
      best = distance;
    }
  }
}

function gameOver() {
  explosion.play();
  state = "gameover";

  setTimeout(reset, 2000);
}

// Draw game elements
function drawGame() {
  drawMainComponenets();
  drawWalls();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponenets();
  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}

// HELPER FUNCTIONS

function reset() {
  state = "start";
  distance = 0;
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.7,
  };
  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall4 = {
    x: cnv.width + 1500,
    y: Math.random() * 300 + 100,
    w: 10,
    h: 75,
  };
  wall5 = {
    x: cnv.width + 2000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 50,
  };
}

function drawWalls() {
  ctx.fillStyle = gameColor;
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
  ctx.fillStyle = "orange";
  ctx.fillRect(wall4.x, wall4.y, wall4.w, wall4.h);
  ctx.fillStyle = "yellow";
  ctx.fillRect(wall5.x, wall5.y, wall5.w, wall5.h);
}

function drawMainComponenets() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = gameColor;
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${best}`, cnv.width - 250, cnv.height - 15);
  ctx.fillText(`COINS: ${coins}`, cnv.width - 450, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);
}

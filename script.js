const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 10;

let leftPaddle = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  dy: 0
};

let rightPaddle = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  dy: 0
};

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 4,
  dy: 4
};

let leftScore = 0;
let rightScore = 0;

// Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "w") leftPaddle.dy = -5;
  if (e.key === "s") leftPaddle.dy = 5;
  if (e.key === "ArrowUp") rightPaddle.dy = -5;
  if (e.key === "ArrowDown") rightPaddle.dy = 5;
});

document.addEventListener("keyup", () => {
  leftPaddle.dy = 0;
  rightPaddle.dy = 0;
});

// Update
function update() {
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision
  if (ball.y <= 0 || ball.y + ballSize >= canvas.height) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x <= leftPaddle.x + paddleWidth &&
    ball.y >= leftPaddle.y &&
    ball.y <= leftPaddle.y + paddleHeight
  ) {
    ball.dx *= -1;
  }

  if (
    ball.x + ballSize >= rightPaddle.x &&
    ball.y >= rightPaddle.y &&
    ball.y <= rightPaddle.y + paddleHeight
  ) {
    ball.dx *= -1;
  }

  // Score
  if (ball.x < 0) {
    rightScore++;
    resetBall();
  }

  if (ball.x > canvas.width) {
    leftScore++;
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx *= -1;
}

// Draw
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Paddles
  ctx.fillStyle = "white";
  ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
  ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

  // Ball
  ctx.fillRect(ball.x, ball.y, ballSize, ballSize);

  // Score
  ctx.font = "30px Arial";
  ctx.fillText(leftScore, canvas.width / 4, 50);
  ctx.fillText(rightScore, (canvas.width / 4) * 3, 50);
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

const canvas = document.querySelector("canvas");
canvas.style.border = "2px solid black";
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro");

window.onload = () => {
  canvas.style.display = "none";
  const backgImg = new Image();
  backgImg.src = "../images/road.png";

  const carImg = new Image();
  carImg.src = "../images/car.png";

  const carwidth = 100;
  const carheight = 200;
  let carX = canvas.width / 2 - carwidth / 2;
  let carY = canvas.height - carheight;
  const carSpeedX = 2;

  let score = 0;
  let gameOver = false;
  let animatedId;

  let isMovingRight = false;
  let isMovingLeft = false;

  let obstaclesArr = [];

  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function drawCar() {
    ctx.drawImage(carImg, carX, carY, carwidth, carheight);
  }

  function animateCar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgImg, 0, 0, canvas.width, canvas.height);
    drawCar();
    obstaclesArr.forEach((obstacle) => {
      obstacle.drawObstacle();
      obstacle.moveDown();
    });

    if (isMovingLeft && carX > 0) {
      carX -= carSpeedX;
    } else if (isMovingRight && carX < canvas.width - carwidth) {
      carX += carSpeedX;
    }

    animatedId = requestAnimationFrame(animateCar);
  }

  class Obstacle {
    constructor(x, y, width) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = 20;
      this.speed = 1;
    }

    drawObstacle() {
      ctx.fillStyle = "teal";
      // xPos, yPos, width, height
      ctx.fillRect(this.x - this.width, this.y, this.width, this.height);
    }

    moveDown() {
      this.y += this.speed;
    }

    //requestAnimationFrame(obstacles)
  }

  function createObstacle() {
    let randomX = Math.floor(Math.random() * canvas.width);
    let randomWidth = Math.floor(
      Math.random() * (canvas.width - carwidth - 50)
    );
    let obstacleItem = new Obstacle(randomX, 0, randomWidth);
    obstaclesArr.push(obstacleItem);
  }

  function startGame() {
    //console.log('startGame')
    startScreen.style.display = "none";
    canvas.style.display = "block";

    animateCar();
    setInterval(() => {
      createObstacle();
      score += 1;
    }, 2000);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      isMovingRight = true;
    }
    if (event.key === "ArrowLeft") {
      isMovingLeft = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") {
      isMovingRight = false;
    }
    if (event.key === "ArrowLeft") {
      isMovingLeft = false;
    }
  });
};

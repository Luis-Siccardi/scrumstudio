const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameSpeed = 5;
let gravity = 0.5;
let gameOver = false;
let gamePaused = false;
let waitingAnswer = false;
let score = 0;
let highScore = 0;

let dino = {
  x: 50,
  y: canvas.height - 110,  
  width: 100,
  height: 110,
  vy: 0,
  isJumping: false
};

let obstacle = {
  x: canvas.width,
  y: canvas.height - 100,
  width: 80,
  height: 100
};

const dinoImg = new Image();
dinoImg.src = "img/dino-Luis.jpeg";
const cactusImg = new Image();
cactusImg.src = "img/cactus-scrum.png";
const dinoImgJump = new Image();
dinoImgJump.src = "img/dino-Luis.jpeg";

let jumpSound = new Audio("audio/jump.mp3");
let correctSound = new Audio("audio/correct.mp3");
let failSound = new Audio("audio/fail.mp3");

const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");
const optionButtons = document.querySelectorAll(".option");

const questions = [
  {
    q: "¿Cuántos roles principales define Scrum?",
    options: ["2", "3", "4", "5"],
    correct: 1,
  },
  {
    q: "¿Qué se revisa en la Sprint Retrospective?",
    options: ["Presupuesto", "El equipo", "Proceso y mejoras", "El incremento"],
    correct: 2
  },
  {
    q: "¿Cuál es la duración máxima recomendada para un Sprint?",
    options: ["2 semanas", "4 semanas", "6 semanas", "8 semanas"],
    correct: 1,
  },
  {
    q: "¿Quién es responsable de maximizar el valor del producto?",
    options: ["Scrum Master", "Product Owner", "Development Team", "Stakeholders"],
    correct: 1,
  },
  {
    q: "¿Cuál es el artefacto que contiene la lista ordenada de todo lo que se conoce que es necesario en el producto?",
    options: ["Sprint Backlog", "Product Backlog", "Increment", "Definition of Done"],
    correct: 1,
  },
  {
    q: "¿Quién puede cancelar un Sprint?",
    options: ["Scrum Master", "Development Team", "Product Owner", "Stakeholders"],
    correct: 2,
  },
  {
    q: "¿Cuáles son los tres pilares del empirismo en Scrum?",
    options: ["Planning, Review, Retrospective", "Transparencia, Inspección, Adaptación", "Roles, Eventos, Artefactos", "Build, Measure, Learn"],
    correct: 1,
  },
];
let questionIndex = 0;

function gameLoop() {
  if (!gameOver && !gamePaused) {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  } else if (!gameOver && gamePaused) {
    requestAnimationFrame(gameLoop);
  }
}

function update() {
  score++;
  if (score > highScore) highScore = score;

  if (dino.isJumping) {
    dino.vy += gravity;
    dino.y += dino.vy;
    if (dino.y >= canvas.height - dino.height) {
      dino.y = canvas.height - dino.height;
      dino.isJumping = false;
      dino.vy = 0;
    }
  }

  obstacle.x -= gameSpeed;
  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = canvas.width + Math.random() * 200;
  }

  if (collision(dino, obstacle) && !waitingAnswer) {
    waitingAnswer = true;
    showQuestion();
    obstacle.x = canvas.width + Math.random() * 200;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
  ctx.fillText("High Score: " + highScore, 10, 50);

  let img = dino.isJumping ? dinoImgJump : dinoImg;
  if (img.complete && img.naturalWidth > 0) {
    ctx.drawImage(img, dino.x, dino.y, dino.width, dino.height);
  } else {
    ctx.fillStyle = "green";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
  }

  if (cactusImg.complete && cactusImg.naturalWidth > 0) {
    ctx.drawImage(cactusImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  } else {
    ctx.fillStyle = "brown";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
}

function collision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function showQuestion() {
  gamePaused = true;
  let q = questions[Math.min(questionIndex, questions.length - 1)];
  questionText.textContent = q.q;
  optionButtons.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.dataset.correct = i === q.correct ? "true" : "false";
  });
  questionBox.style.display = 'block';
}

function checkAnswer(btn) {
  if (btn.dataset.correct === "true") {
    correctSound.play(); 
    dino.isJumping = true;
    dino.vy = -15;
    score += 10;
    questionIndex++;
  } else {
    failSound.play();
    gameOver = true;
    document.getElementById("restartBtn").style.display = "block";
  }
  questionBox.style.display = 'none';
  gamePaused = false;
  waitingAnswer = false;
}


document.addEventListener("keydown", function(e) {
  if (e.code === "Space" && !dino.isJumping && !gameOver && !gamePaused) {
    dino.isJumping = true;
    dino.vy = -15;
    jumpSound.play(); 
    e.preventDefault();
  }
});

document.getElementById("restartBtn").addEventListener("click", restartGame);
document.getElementById("manualRestartBtn").addEventListener("click", restartGame);

function restartGame() {
  gameOver = false;
  score = 0;
  questionIndex = 0;
  dino.y = canvas.height - dino.height;
  dino.isJumping = false;
  dino.vy = 0;
  obstacle.x = canvas.width;
  document.getElementById("restartBtn").style.display = "none";
  questionBox.style.display = "none";
  gamePaused = false;
  waitingAnswer = false;
  gameLoop();
}

window.onload = function () {
  gameLoop();
};
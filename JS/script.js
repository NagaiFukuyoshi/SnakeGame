const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX;
let foodY;
let snakeX = 5;
let snakeY = 5;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

const changFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over");
    location.reload();
}

const changeDirection = (a) => {
    //console.log(a);
    if(a.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(a.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else if(a.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if(a.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    //initGane();
}

const initGane = () => {
   
    if(gameOver) return handleGameOver();
   
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        changFoodPosition();
        snakeBody.push(foodX, foodY);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody [0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for(let i = 0; i < snakeBody.length; i++ ){
        htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
}

changFoodPosition();
//initGane();
setIntervalId = setInterval(initGane, 125);
document.addEventListener("keydown", changeDirection);

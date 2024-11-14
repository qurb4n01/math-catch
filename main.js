let targetNumber = 50;
let score1 = 0;
let score2 = 0;

let bucketValue1 = 0;
let bucketValue2 = 0;
let hits1 = 0;
let hits2 = 0;

const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.play();



const gameContainer1 = document.getElementById("gameContainer1");
const gameContainer2 = document.getElementById("gameContainer2");
const equationDisplay = document.getElementById("equation");
const scoreDisplay1 = document.getElementById("score1");
const scoreDisplay2 = document.getElementById("score2");
const bucketValueDisplay1 = document.getElementById("bucketValue1");
const bucketValueDisplay2 = document.getElementById("bucketValue2");
const bucket1 = document.getElementById("bucket1");
const bucket2 = document.getElementById("bucket2");

const targetNumberDisplay1 = document.getElementById("targetNumber1");
const targetNumberDisplay2 = document.getElementById("targetNumber2");


let redBlockWaveActive = false;

let cooldownTime = 20; // cooldown time for red blocks
let cooldownDisplay = document.getElementById("cooldownDisplay");
let nextRedBlockWaveTime = Date.now() + cooldownTime * 1000; // next wave time


// Control buckets
document.addEventListener("keydown", (e) => {
    const bucket1Rect = bucket1.getBoundingClientRect();
    const bucket2Rect = bucket2.getBoundingClientRect();
    const gameRect1 = gameContainer1.getBoundingClientRect();
    const gameRect2 = gameContainer2.getBoundingClientRect();

    // Player 1 controls
    if (e.key === "a" && bucket1Rect.left > gameRect1.left) {
        bucket1.style.left = `${bucket1.offsetLeft - 20}px`;
    } else if (e.key === "d" && bucket1Rect.right < gameRect1.right) {
        bucket1.style.left = `${bucket1.offsetLeft + 20}px`;
    }

    // Player 2 controls
    if (e.key === "ArrowLeft" && bucket2Rect.left > gameRect2.left) {
        bucket2.style.left = `${bucket2.offsetLeft - 20}px`;
    } else if (e.key === "ArrowRight" && bucket2Rect.right < gameRect2.right) {
        bucket2.style.left = `${bucket2.offsetLeft + 20}px`;
    }
});


// generate a number block
function generateNumber(container, bucket, scoreDisplay, bucketValueDisplay, targetNumberDisplay, isPlayer1) {
    if (redBlockWaveActive) return; // don't generate number blocks if it is red block wave

    let number = Math.floor(Math.random() * 50) + 1; //number between 1-50
    let numberElement = document.createElement("div");
    numberElement.classList.add("problem");
    numberElement.textContent = number;
    numberElement.dataset.value = number;
    numberElement.style.left = `${Math.random() * 350}px`;
    container.appendChild(numberElement);

    // Move the number blocks down
    let numberFall = setInterval(() => {
        let numberTop = parseInt(numberElement.style.top || "0");
        if (numberTop < 570) {
            numberElement.style.top = `${numberTop + 5}px`;
        } else {
            // Check if the number block was caught by the bucket
            let numberRect = numberElement.getBoundingClientRect();
            let bucketRect = bucket.getBoundingClientRect();

            if (
                numberRect.left < bucketRect.right &&
                numberRect.right > bucketRect.left &&
                numberRect.bottom > bucketRect.top
            ) {
                let numberValue = parseInt(numberElement.dataset.value);
                if (isPlayer1) {
                    bucketValue1 += numberValue;
                    hits1++;
                    bucketValueDisplay.textContent = `Bucket: ${bucketValue1}`;

                    document.getElementById("catchSound").play();

                    if (hits1 === 2) {
                        if (bucketValue1 >= targetNumber) {
                            score1++;
                            const possibleTargets = [30, 50, 65];
                            targetNumber = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
                            targetNumberDisplay.textContent = `Target: ${targetNumber}`;
                            console.log("New Target Number (Player 1):", targetNumber);
                        } else {
                            score1--;
                        }
                        scoreDisplay.textContent = `Score: ${score1}`;
                        bucketValue1 = 0;
                        bucketValueDisplay.textContent = `Bucket: ${bucketValue1}`;
                        hits1 = 0;
                    }
                } else {
                    bucketValue2 += numberValue;
                    hits2++;
                    bucketValueDisplay.textContent = `Bucket: ${bucketValue2}`;

                    document.getElementById("catchSound").play();

                    if (hits2 === 2) {
                        if (bucketValue2 >= targetNumber) {
                            score2++;
                            const possibleTargets = [30, 50, 65];
                            targetNumber = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
                            targetNumberDisplay.textContent = `Target: ${targetNumber}`;
                            console.log("New Target Number (Player 2):", targetNumber);
                        } else {
                            score2--;
                        }
                        scoreDisplay.textContent = `Score: ${score2}`;
                        bucketValue2 = 0;
                        bucketValueDisplay.textContent = `Bucket: ${bucketValue2}`;
                        hits2 = 0;
                    }
                }
            }

            clearInterval(numberFall);
            numberElement.remove();
        }
    }, 50);
}


// generate a red block
function generateRedBlock(container, bucket, scoreDisplay) {
    let redBlock = document.createElement("div");
    redBlock.classList.add("red-block");
    redBlock.style.left = `${Math.random() * 350}px`;
    container.appendChild(redBlock);

    // Move the red block down
    let redBlockFall = setInterval(() => {
        let redBlockTop = parseInt(redBlock.style.top || "0");
        if (redBlockTop < 570) {
            redBlock.style.top = `${redBlockTop + 10}px`;
        } else {
            // Check if the red block hits the bucket
            let redBlockRect = redBlock.getBoundingClientRect();
            let bucketRect = bucket.getBoundingClientRect();

            if (
                redBlockRect.left < bucketRect.right &&
                redBlockRect.right > bucketRect.left &&
                redBlockRect.bottom > bucketRect.top
            ) {
                if (bucket === bucket1) {
                    score1 -= 1;
                    scoreDisplay.textContent = `Score: ${score1}`;

                    document.getElementById("redBlockHitSound").play();
                } else {
                    score2 -= 1;
                    scoreDisplay.textContent = `Score: ${score2}`;

                    document.getElementById("redBlockHitSound").play();
                }
            }

            clearInterval(redBlockFall);
            redBlock.remove();
        }
    }, 50);
}


function checkRedBlockWave() {
    const currentTime = Date.now();
    const remainingTime = nextRedBlockWaveTime - currentTime;

    // Start red block wave after cooldown
    if (!redBlockWaveActive && remainingTime <= 0) {
        startRedBlockWave();
    }

    if (remainingTime > 0) {
        cooldownDisplay.textContent = `Cooldown: ${Math.ceil(remainingTime / 1000)}s`;
    } else {
        cooldownDisplay.textContent = `Cooldown: Ready!`;
    }
}




function startRedBlockWave() {
    redBlockWaveActive = true;
    lastRedBlockTime = Date.now(); 
    let waveDuration = 5000; 

    // Generate red blocks
    let waveInterval = setInterval(() => {
        generateRedBlock(gameContainer1, bucket1, scoreDisplay1);
        generateRedBlock(gameContainer2, bucket2, scoreDisplay2);
    }, 300);

    // Stop red block wave and set the next wave timing
    setTimeout(() => {
        clearInterval(waveInterval);
        redBlockWaveActive = false;
        cooldownTime = 15;
        nextRedBlockWaveTime = Date.now() + cooldownTime * 1000;
    }, waveDuration);
}


// MAIN GAME LOOP to generate number blocks
setInterval(() => {
    generateNumber(gameContainer1, bucket1, scoreDisplay1, bucketValueDisplay1, targetNumberDisplay1, true);
    generateNumber(gameContainer2, bucket2, scoreDisplay2, bucketValueDisplay2, targetNumberDisplay2, false);
}, 1000);


setInterval(checkRedBlockWave, 1000);

let countdownTime = 90;
const timerDisplay = document.getElementById("timerDisplay");
let gameOver = false;

// update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    timerDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// handle Game Over
function triggerGameOver() {
    
    gameOver = true;
    clearInterval(countdownInterval);
    document.body.innerHTML = `<div id="gameOverScreen">
        <h1>Game Over</h1>
        <p>Player 1 Score: ${score1}</p>
        <p>Player 2 Score: ${score2}</p>
        <button onclick="restartGame()">Play Again</button>
    </div>`;
}

// Countdown function
const countdownInterval = setInterval(() => {
    if (gameOver) return;

    if (countdownTime > 0) {
        countdownTime--;
        updateTimerDisplay(); 
    } else {
        triggerGameOver(); 
    }
}, 1000); 


updateTimerDisplay();

// restart the game
function restartGame() {
    window.location.reload();
}

const equationDisplay = document.getElementById("equation");
const answerInput = document.getElementById("answerInput");
const startButton = document.getElementById("startButton");

// generate a random equation
function generateEquation() {
    const num1 = Math.floor(Math.random() * 50) + 1; // number between 1-50
    const num2 = Math.floor(Math.random() * 50) + 1; // number between 1-50
    const equation = `${num1} + ${num2}`;
    const correctAnswer = num1 + num2;

    equationDisplay.textContent = equation;
    return correctAnswer;
}

const correctAnswer = generateEquation();

// answer input
answerInput.addEventListener("input", () => {
    const userAnswer = parseInt(answerInput.value);
    if (userAnswer === correctAnswer) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
});

// start button
startButton.addEventListener("click", () => {
    window.location.href = "game.html";
});

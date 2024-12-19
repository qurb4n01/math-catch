const equationDisplay = document.getElementById("equation");
const answerInput = document.getElementById("answerInput");
const startButton = document.getElementById("startButton");

// Generate a random equation
function generateEquation() {
    const num1 = Math.floor(Math.random() * 50) + 1; // Number between 1-50
    const num2 = Math.floor(Math.random() * 50) + 1; // Number between 1-50
    const equation = `${num1} + ${num2}`;
    const correctAnswer = num1 + num2;

    equationDisplay.textContent = equation;
    return correctAnswer;
}

const correctAnswer = generateEquation();

// Handle answer input
answerInput.addEventListener("input", () => {
    const userAnswer = parseInt(answerInput.value);
    if (userAnswer === correctAnswer || userAnswer === 163) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
});

// Handle start button click
startButton.addEventListener("click", () => {
    const userAnswer = parseInt(answerInput.value);
    if (userAnswer === 163) {
        window.location.href = "easteregg.html";
    } else {
        window.location.href = "game.html";
    }
});

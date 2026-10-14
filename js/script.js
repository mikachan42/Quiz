//let questions = [];
let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const resultElement = document.getElementById("result");
const hintElement = document.getElementById("hint");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const hintButton = document.getElementById("hint-btn");



// Fisher-Yates Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function levenshtein(a, b) {
    const dp = Array.from({length: a.length + 1}, (_, i) =>
        Array.from({length: b.length + 1}, (_, j) => i === 0 ? j : j === 0 ? i : 0)
    );
    for (let i = 1; i <= a.length; i++)
        for (let j = 1; j <= b.length; j++)
            dp[i][j] = a[i-1] === b[j-1]
                ? dp[i-1][j-1]
                : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[a.length][b.length];
}


function loadQuestion() {
    questionElement.textContent = questions[currentQuestion].question;
    answerElement.value = "";
    resultElement.textContent = "";
}


function checkAnswer() {
    const userAnswer = answerElement.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();

    const distance = levenshtein(userAnswer, correctAnswer);
    const tolerance = Math.floor(correctAnswer.length / 6);

    if (distance === 0) {
        resultElement.textContent = "Richtig! Antwort : " + questions[currentQuestion].answer;
        score++;
    } else if (distance <= tolerance) {
        resultElement.textContent = "richtig! (Tippfehler toleriert) ✓ Antwort : " + questions[currentQuestion].answer;
        score++;
    } else {
        resultElement.textContent = "Falsch! Ricchtige Antwort : " + questions[currentQuestion].answer;
    }

    scoreElement.textContent = "Punkte: " + score;

    currentQuestion++;

    if (currentQuestion < questions.length) {
	nextButton.addEventListener("click", loadQuestion);
    hintElement.textContent = "";


    } else {
        questionElement.textContent = "Quiz beendet!";
        answerElement.style.display = "none";
        submitButton.style.display = "none";
        nextButton.style.display = "none";
        hintButton.style.display = "none";
        hintElement.textContent = "";




    }
}


function answerHint() {
    hintElement.textContent = questions[currentQuestion].answer;
}

submitButton.addEventListener("click", checkAnswer);


hintButton.addEventListener("click", answerHint);


questions = shuffleArray(questions);
loadQuestion();




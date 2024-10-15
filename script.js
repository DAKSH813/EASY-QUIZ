const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ],
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    setNextQuestion();
});

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
    nextButton.style.display = 'none'; // Hide the next button until an answer is selected
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; // Disable all buttons
        if (button.innerText === answer.text) {
            button.classList.add(correct ? 'correct' : 'wrong');
        }
    });
    nextButton.style.display = 'block'; // Show the next button
}

function showScore() {
    document.querySelector('.quiz').style.display = 'none';
    scoreElement.innerText = score;
    scoreContainer.style.display = 'block';
}

// Start the quiz
setNextQuestion();

// Variables globales
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timer = null;
let timeLeft = 15;
let answerTimes = [];
let startTime = null;
let quizQuestions = []; // Questions sélectionnées pour ce quiz
let userAnswers = []; // Réponses de l'utilisateur
let questionStartTimes = []; // Temps de début de chaque question

// Éléments DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');
const questionImage = document.getElementById('question-image');
const questionText = document.getElementById('question-text');
const answerBtns = document.querySelectorAll('.answer-btn');
const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const timerText = document.getElementById('timer-text');
const finalScoreText = document.getElementById('final-score-text');
const percentageElement = document.getElementById('percentage');
const correctAnswersElement = document.getElementById('correct-answers');
const wrongAnswersElement = document.getElementById('wrong-answers');
const avgTimeElement = document.getElementById('avg-time');
const answersList = document.getElementById('answers-list');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Événements des boutons
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    homeBtn.addEventListener('click', goToHome);
    
    // Événements des réponses
    answerBtns.forEach(btn => {
        btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.index)));
    });
});

// Fonctions principales
function startQuiz() {
    // Sélectionner 15 questions aléatoires
    quizQuestions = getRandomQuestions(15);
    
    // Réinitialiser les variables
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    answerTimes = [];
    questionStartTimes = [];
    selectedAnswer = null;
    
    showScreen(quizScreen);
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Réinitialiser l'état
    selectedAnswer = null;
    timeLeft = 15;
    startTime = Date.now();
    questionStartTimes[currentQuestionIndex] = startTime;
    
    // Mettre à jour l'interface
    questionImage.src = question.image;
    questionText.textContent = question.question;
    questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;
    scoreElement.textContent = `Score: ${score}`;
    
    // Mettre à jour la barre de progression
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Réinitialiser les boutons
    answerBtns.forEach((btn, index) => {
        btn.className = 'answer-btn';
        btn.querySelector('.answer-text').textContent = question.answers[index];
        btn.disabled = false;
    });
    
    // Désactiver le bouton suivant
    nextBtn.disabled = true;
    
    // Démarrer le timer
    startTimer();
}

function startTimer() {
    timerText.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

function timeUp() {
    clearInterval(timer);
    
    // Si aucune réponse n'a été sélectionnée, considérer comme incorrecte
    if (selectedAnswer === null) {
        selectedAnswer = -1;
    }
    
    showCorrectAnswer();
}

function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return; // Empêcher la sélection multiple
    
    selectedAnswer = answerIndex;
    clearInterval(timer);
    
    // Calculer le temps de réponse
    const responseTime = Math.round((Date.now() - startTime) / 1000);
    answerTimes.push(responseTime);
    
    // Sauvegarder la réponse de l'utilisateur
    userAnswers[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        selectedAnswer: answerIndex,
        correctAnswer: quizQuestions[currentQuestionIndex].correct,
        isCorrect: answerIndex === quizQuestions[currentQuestionIndex].correct,
        responseTime: responseTime,
        question: quizQuestions[currentQuestionIndex]
    };
    
    // Désactiver tous les boutons
    answerBtns.forEach(btn => btn.disabled = true);
    
    // Afficher la réponse correcte
    showCorrectAnswer();
}

function showCorrectAnswer() {
    const question = quizQuestions[currentQuestionIndex];
    const correctIndex = question.correct;
    
    // Marquer la réponse correcte
    answerBtns[correctIndex].classList.add('correct');
    
    // Marquer la réponse sélectionnée si elle est incorrecte
    if (selectedAnswer !== null && selectedAnswer !== correctIndex) {
        answerBtns[selectedAnswer].classList.add('incorrect');
    }
    
    // Mettre à jour le score
    if (selectedAnswer === correctIndex) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }
    
    // Activer le bouton suivant
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= quizQuestions.length) {
        showResults();
    } else {
        loadQuestion();
    }
}

function showResults() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const wrongAnswers = quizQuestions.length - score;
    const avgTime = answerTimes.length > 0 ? Math.round(answerTimes.reduce((a, b) => a + b) / answerTimes.length) : 0;
    
    finalScoreText.textContent = `${score}/${quizQuestions.length}`;
    percentageElement.textContent = `${percentage}%`;
    correctAnswersElement.textContent = score;
    wrongAnswersElement.textContent = wrongAnswers;
    avgTimeElement.textContent = `${avgTime}s`;
    
    // Générer le résumé des réponses
    generateAnswersSummary();
    
    showScreen(resultsScreen);
}

function generateAnswersSummary() {
    answersList.innerHTML = '';
    
    userAnswers.forEach((userAnswer, index) => {
        const question = userAnswer.question;
        const answerItem = document.createElement('div');
        answerItem.className = `answer-item ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`;
        
        const selectedAnswerText = userAnswer.selectedAnswer >= 0 ? 
            question.answers[userAnswer.selectedAnswer] : 'Aucune réponse';
        const correctAnswerText = question.answers[question.correct];
        
        answerItem.innerHTML = `
            <div class="answer-number">${index + 1}</div>
            <div class="answer-content">
                <div class="answer-question">${question.question}</div>
                <div class="answer-details">
                    <strong>Votre réponse:</strong> ${selectedAnswerText}<br>
                    <strong>Réponse correcte:</strong> ${correctAnswerText}<br>
                    <strong>Temps:</strong> ${userAnswer.responseTime}s
                </div>
            </div>
            <div class="answer-status ${userAnswer.isCorrect ? 'correct' : 'incorrect'}">
                ${userAnswer.isCorrect ? 'Correct' : 'Incorrect'}
            </div>
        `;
        
        answersList.appendChild(answerItem);
    });
}

function restartQuiz() {
    startQuiz();
}

function goToHome() {
    showScreen(startScreen);
}

function showScreen(screen) {
    // Masquer tous les écrans
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    
    // Afficher l'écran demandé
    screen.classList.add('active');
}

// Fonction utilitaire pour mélanger un tableau
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

 
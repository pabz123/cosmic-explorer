/**
 * Cosmic Explorer - Quiz JavaScript
 * 
 * Handles quiz flow: start → questions → answer validation → results → submit score.
 */

let currentQuestion = 0;
let score = 0;
let answered = false;
let startTime = null;
let shuffledQuestions = [];

/* ---------- Start Quiz ---------- */
function startQuiz() {
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizArea').style.display = 'block';

    // Shuffle questions
    shuffledQuestions = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    score = 0;
    startTime = Date.now();

    renderQuestion();
}

/* ---------- Render Question ---------- */
function renderQuestion() {
    const card = document.getElementById('questionCard');
    if (!card) return;

    answered = false;
    const q = shuffledQuestions[currentQuestion];
    const letters = ['A', 'B', 'C', 'D'];

    // Update progress
    document.getElementById('progressCount').textContent = `${currentQuestion + 1}/${shuffledQuestions.length}`;
    document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
    document.getElementById('progressBarFill').style.width = `${((currentQuestion) / shuffledQuestions.length) * 100}%`;

    card.innerHTML = `
        <div class="question-number">Question ${currentQuestion + 1} of ${shuffledQuestions.length}</div>
        <h2 class="question-text">${q.question}</h2>
        <div class="options-list" id="optionsList">
            ${q.options.map((opt, i) => `
                <button class="option-btn" onclick="selectAnswer(${i})" id="option_${i}">
                    <span class="option-letter">${letters[i]}</span>
                    <span>${opt}</span>
                </button>
            `).join('')}
        </div>
        <div class="question-feedback" id="questionFeedback"></div>
        <div class="quiz-nav" id="quizNav" style="display: none;">
            <button class="btn btn-primary" onclick="nextQuestion()" id="nextBtn">
                ${currentQuestion < shuffledQuestions.length - 1 ? 'Next Question →' : 'See Results →'}
            </button>
        </div>
    `;

    // Animate in
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = 'fadeInUp 0.4s ease';
}

/* ---------- Select Answer ---------- */
function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const q = shuffledQuestions[currentQuestion];
    const correctIndex = q.correct;
    const options = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('questionFeedback');
    const nav = document.getElementById('quizNav');

    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));

    // Highlight correct and wrong
    options[correctIndex].classList.add('correct');
    
    if (selectedIndex === correctIndex) {
        score++;
        feedback.className = 'question-feedback correct';
        feedback.textContent = '✓ Correct! Well done!';
    } else {
        options[selectedIndex].classList.add('wrong');
        feedback.className = 'question-feedback wrong';
        feedback.textContent = `✕ Incorrect. The correct answer is ${q.options[correctIndex]}.`;
    }

    // Update score display
    document.getElementById('scoreDisplay').textContent = `Score: ${score}`;

    // Show next button
    nav.style.display = 'flex';
}

/* ---------- Next Question ---------- */
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < shuffledQuestions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

/* ---------- Show Results ---------- */
function showResults() {
    document.getElementById('quizArea').style.display = 'none';
    const results = document.getElementById('quizResults');
    results.style.display = 'block';

    const total = shuffledQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const timeTaken = Math.round((Date.now() - startTime) / 1000);

    let message = '';
    let emoji = '';
    if (percentage === 100) { message = 'Perfect Score!'; emoji = '🏆'; }
    else if (percentage >= 80) { message = 'Stellar Performance!'; emoji = '⭐'; }
    else if (percentage >= 60) { message = 'Great Job!'; emoji = '🚀'; }
    else if (percentage >= 40) { message = 'Not Bad!'; emoji = '🌍'; }
    else { message = 'Keep Exploring!'; emoji = '📚'; }

    results.innerHTML = `
        <div class="results-score-circle">
            <div class="results-score-number">${score}/${total}</div>
            <div class="results-score-label">${percentage}%</div>
        </div>
        <div class="results-message">${emoji} ${message}</div>
        <p class="results-subtitle">You completed the quiz in ${timeTaken} seconds</p>
        <div class="results-actions">
            <button class="btn btn-primary btn-lg" onclick="retryQuiz()" id="retryBtn">Try Again</button>
            <a href="planets.php" class="btn btn-outline btn-lg">Explore Planets</a>
        </div>
    `;

    // Save score if logged in
    if (typeof IS_LOGGED_IN !== 'undefined' && IS_LOGGED_IN) {
        saveScore(score, total, timeTaken);
    }
}

/* ---------- Save Score (AJAX) ---------- */
async function saveScore(score, total, timeTaken) {
    try {
        const formData = new FormData();
        formData.append('csrf_token', CSRF_TOKEN);
        formData.append('score', score);
        formData.append('total_questions', total);
        formData.append('time_taken', timeTaken);

        const response = await fetch('actions/process-quiz.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            console.log('Score saved successfully');
        }
    } catch (error) {
        console.error('Error saving score:', error);
    }
}

/* ---------- Retry Quiz ---------- */
function retryQuiz() {
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizStart').style.display = 'block';
}

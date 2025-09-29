const quizState = {
    currentQuestionIndex: 0,
    score: 0,
    timeLeft: 30,
    timer: null,
    questions: [],
    selectedCategory: 'general',
    startTime: null
};

const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const shareButton = document.getElementById('share-btn');
const categorySelect = document.getElementById('category-select');
const progressBar = document.getElementById('progress');
const questionNumber = document.getElementById('question-number');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const correctAnswersElement = document.getElementById('correct-answers');
const timeTakenElement = document.getElementById('time-taken');
const headerScore = document.getElementById('header-score');
const totalQuestions = document.getElementById('total-questions');
const scoreMessage = document.getElementById('score-message');
const accuracyElement = document.getElementById('accuracy');

const questionsByCategory = {
    general: [
        {
            question: 'What is the capital of France?',
            answers: [
                { text: 'London', correct: false },
                { text: 'Berlin', correct: false },
                { text: 'Paris', correct: true },
                { text: 'Madrid', correct: false }
            ]
        },
        {
            question: 'Which planet is known as the Red Planet?',
            answers: [
                { text: 'Venus', correct: false },
                { text: 'Mars', correct: true },
                { text: 'Jupiter', correct: false },
                { text: 'Saturn', correct: false }
            ]
        },
        {
            question: 'What is the largest ocean on Earth?',
            answers: [
                { text: 'Atlantic Ocean', correct: false },
                { text: 'Indian Ocean', correct: false },
                { text: 'Pacific Ocean', correct: true },
                { text: 'Arctic Ocean', correct: false }
            ]
        },
        {
            question: 'Which country has the most natural lakes?',
            answers: [
                { text: 'Canada', correct: true },
                { text: 'United States', correct: false },
                { text: 'Russia', correct: false },
                { text: 'Finland', correct: false }
            ]
        },
        {
            question: 'What is the world\'s largest desert?',
            answers: [
                { text: 'Sahara Desert', correct: false },
                { text: 'Gobi Desert', correct: false },
                { text: 'Antarctic Desert', correct: true },
                { text: 'Arabian Desert', correct: false }
            ]
        },
        {
            question: 'Which is the largest mammal in the world?',
            answers: [
                { text: 'African Elephant', correct: false },
                { text: 'Blue Whale', correct: true },
                { text: 'Giraffe', correct: false },
                { text: 'Hippopotamus', correct: false }
            ]
        },
        {
            question: 'What is the longest river in the world?',
            answers: [
                { text: 'Amazon River', correct: false },
                { text: 'Nile River', correct: true },
                { text: 'Yangtze River', correct: false },
                { text: 'Mississippi River', correct: false }
            ]
        },
        {
            question: 'What is the deepest point in the ocean?',
            answers: [
                { text: 'Mariana Trench', correct: true },
                { text: 'Puerto Rico Trench', correct: false },
                { text: 'Java Trench', correct: false },
                { text: 'Philippine Trench', correct: false }
            ]
        },
        {
            question: 'Which is the largest rainforest in the world?',
            answers: [
                { text: 'Congo Rainforest', correct: false },
                { text: 'Amazon Rainforest', correct: true },
                { text: 'Daintree Rainforest', correct: false },
                { text: 'Borneo Rainforest', correct: false }
            ]
        },
        {
            question: 'What is the highest waterfall in the world?',
            answers: [
                { text: 'Angel Falls', correct: true },
                { text: 'Victoria Falls', correct: false },
                { text: 'Niagara Falls', correct: false },
                { text: 'Iguazu Falls', correct: false }
            ]
        }
    ],
    science: [
        {
            question: 'What is the chemical symbol for water?',
            answers: [
                { text: 'H2O', correct: true },
                { text: 'CO2', correct: false },
                { text: 'O2', correct: false },
                { text: 'H2SO4', correct: false }
            ]
        },
        {
            question: 'What is the hardest natural substance on Earth?',
            answers: [
                { text: 'Gold', correct: false },
                { text: 'Iron', correct: false },
                { text: 'Diamond', correct: true },
                { text: 'Platinum', correct: false }
            ]
        },
        {
            question: 'What is the main component of the Sun?',
            answers: [
                { text: 'Helium', correct: false },
                { text: 'Hydrogen', correct: true },
                { text: 'Oxygen', correct: false },
                { text: 'Carbon', correct: false }
            ]
        },
        {
            question: 'What is the speed of light in vacuum?',
            answers: [
                { text: '299,792,458 m/s', correct: true },
                { text: '299,792,458 km/s', correct: false },
                { text: '299,792,458 mph', correct: false },
                { text: '299,792,458 km/h', correct: false }
            ]
        },
        {
            question: 'Which element has the chemical symbol "Fe"?',
            answers: [
                { text: 'Gold', correct: false },
                { text: 'Iron', correct: true },
                { text: 'Silver', correct: false },
                { text: 'Copper', correct: false }
            ]
        },
        {
            question: 'What is the atomic number of gold?',
            answers: [
                { text: '79', correct: true },
                { text: '47', correct: false },
                { text: '29', correct: false },
                { text: '92', correct: false }
            ]
        },
        {
            question: 'Which planet has the most moons?',
            answers: [
                { text: 'Jupiter', correct: false },
                { text: 'Saturn', correct: true },
                { text: 'Uranus', correct: false },
                { text: 'Neptune', correct: false }
            ]
        },
        {
            question: 'What is the most abundant element in the Earth\'s crust?',
            answers: [
                { text: 'Iron', correct: false },
                { text: 'Oxygen', correct: true },
                { text: 'Silicon', correct: false },
                { text: 'Aluminum', correct: false }
            ]
        },
        {
            question: 'Which scientist discovered penicillin?',
            answers: [
                { text: 'Alexander Fleming', correct: true },
                { text: 'Louis Pasteur', correct: false },
                { text: 'Robert Koch', correct: false },
                { text: 'Joseph Lister', correct: false }
            ]
        },
        {
            question: 'What is the study of fossils called?',
            answers: [
                { text: 'Paleontology', correct: true },
                { text: 'Archaeology', correct: false },
                { text: 'Geology', correct: false },
                { text: 'Anthropology', correct: false }
            ]
        }
    ],
    history: [
        {
            question: 'In which year did World War II end?',
            answers: [
                { text: '1943', correct: false },
                { text: '1945', correct: true },
                { text: '1947', correct: false },
                { text: '1950', correct: false }
            ]
        },
        {
            question: 'Who was the first President of the United States?',
            answers: [
                { text: 'Thomas Jefferson', correct: false },
                { text: 'George Washington', correct: true },
                { text: 'Abraham Lincoln', correct: false },
                { text: 'John Adams', correct: false }
            ]
        },
        {
            question: 'Which ancient wonder was located in Alexandria?',
            answers: [
                { text: 'Colossus of Rhodes', correct: false },
                { text: 'Lighthouse of Alexandria', correct: true },
                { text: 'Hanging Gardens', correct: false },
                { text: 'Temple of Artemis', correct: false }
            ]
        },
        {
            question: 'Who was the first woman to win a Nobel Prize?',
            answers: [
                { text: 'Marie Curie', correct: true },
                { text: 'Mother Teresa', correct: false },
                { text: 'Jane Addams', correct: false },
                { text: 'Pearl S. Buck', correct: false }
            ]
        },
        {
            question: 'Which empire was ruled by Genghis Khan?',
            answers: [
                { text: 'Roman Empire', correct: false },
                { text: 'Mongol Empire', correct: true },
                { text: 'Ottoman Empire', correct: false },
                { text: 'Byzantine Empire', correct: false }
            ]
        },
        {
            question: 'Which ancient civilization built the Machu Picchu?',
            answers: [
                { text: 'Aztecs', correct: false },
                { text: 'Mayans', correct: false },
                { text: 'Incas', correct: true },
                { text: 'Olmecs', correct: false }
            ]
        },
        {
            question: 'Who was the first female Prime Minister of the United Kingdom?',
            answers: [
                { text: 'Margaret Thatcher', correct: true },
                { text: 'Theresa May', correct: false },
                { text: 'Queen Elizabeth II', correct: false },
                { text: 'Indira Gandhi', correct: false }
            ]
        },
        {
            question: 'Which year did the Titanic sink?',
            answers: [
                { text: '1910', correct: false },
                { text: '1912', correct: true },
                { text: '1914', correct: false },
                { text: '1916', correct: false }
            ]
        },
        {
            question: 'Who painted the Mona Lisa?',
            answers: [
                { text: 'Vincent van Gogh', correct: false },
                { text: 'Pablo Picasso', correct: false },
                { text: 'Leonardo da Vinci', correct: true },
                { text: 'Michelangelo', correct: false }
            ]
        },
        {
            question: 'Which ancient wonder was located in Babylon?',
            answers: [
                { text: 'Hanging Gardens', correct: true },
                { text: 'Colossus of Rhodes', correct: false },
                { text: 'Temple of Artemis', correct: false },
                { text: 'Lighthouse of Alexandria', correct: false }
            ]
        }
    ],
    technology: [
        {
            question: 'What does HTML stand for?',
            answers: [
                { text: 'Hyper Text Markup Language', correct: true },
                { text: 'High Tech Modern Language', correct: false },
                { text: 'Hyper Transfer Markup Language', correct: false },
                { text: 'Hyper Text Modern Language', correct: false }
            ]
        },
        {
            question: 'Which company created JavaScript?',
            answers: [
                { text: 'Microsoft', correct: false },
                { text: 'Netscape', correct: true },
                { text: 'Apple', correct: false },
                { text: 'Google', correct: false }
            ]
        },
        {
            question: 'What was the first computer programming language?',
            answers: [
                { text: 'FORTRAN', correct: false },
                { text: 'COBOL', correct: false },
                { text: 'Assembly', correct: false },
                { text: 'Plankalkül', correct: true }
            ]
        },
        {
            question: 'Which year was the first iPhone released?',
            answers: [
                { text: '2005', correct: false },
                { text: '2006', correct: false },
                { text: '2007', correct: true },
                { text: '2008', correct: false }
            ]
        },
        {
            question: 'What does CPU stand for?',
            answers: [
                { text: 'Central Processing Unit', correct: true },
                { text: 'Computer Processing Unit', correct: false },
                { text: 'Central Process Utility', correct: false },
                { text: 'Computer Process Utility', correct: false }
            ]
        },
        {
            question: 'What was the first web browser?',
            answers: [
                { text: 'Mosaic', correct: false },
                { text: 'WorldWideWeb', correct: true },
                { text: 'Netscape', correct: false },
                { text: 'Internet Explorer', correct: false }
            ]
        },
        {
            question: 'Which company developed the first microprocessor?',
            answers: [
                { text: 'Intel', correct: true },
                { text: 'AMD', correct: false },
                { text: 'IBM', correct: false },
                { text: 'Motorola', correct: false }
            ]
        },
        {
            question: 'What was the first computer virus?',
            answers: [
                { text: 'ILOVEYOU', correct: false },
                { text: 'Creeper', correct: true },
                { text: 'Morris', correct: false },
                { text: 'Brain', correct: false }
            ]
        },
        {
            question: 'Which year was the first email sent?',
            answers: [
                { text: '1969', correct: false },
                { text: '1971', correct: true },
                { text: '1973', correct: false },
                { text: '1975', correct: false }
            ]
        },
        {
            question: 'What was the first social media platform?',
            answers: [
                { text: 'MySpace', correct: false },
                { text: 'Friendster', correct: false },
                { text: 'Six Degrees', correct: true },
                { text: 'Facebook', correct: false }
            ]
        }
    ]
};
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    quizState.currentQuestionIndex++;
    if (quizState.currentQuestionIndex < quizState.questions.length) {
        setNextQuestion();
    } else {
        showResults();
    }
});
restartButton.addEventListener('click', resetQuiz);
shareButton.addEventListener('click', shareResults);
categorySelect.addEventListener('change', (e) => {
    quizState.selectedCategory = e.target.value;
});
function startQuiz() {
    startScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    
    quizState.questions = questionsByCategory[quizState.selectedCategory];
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.startTime = Date.now();
    
    totalQuestions.textContent = quizState.questions.length;
    updateHeaderScore();
    
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    resetState();
    showQuestion(quizState.questions[quizState.currentQuestionIndex]);
    updateProgress();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    
    clearInterval(quizState.timer);
    
    if (correct) {
        quizState.score++;
        updateHeaderScore();
    }
    
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    
    nextButton.classList.remove('hidden');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateProgress() {
    const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    questionNumber.textContent = `Question ${quizState.currentQuestionIndex + 1}/${quizState.questions.length}`;
}

function startTimer() {
    quizState.timeLeft = 30;
    updateTimerDisplay();
    
    quizState.timer = setInterval(() => {
        quizState.timeLeft--;
        updateTimerDisplay();
        
        if (quizState.timeLeft <= 0) {
            clearInterval(quizState.timer);
            handleTimeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.textContent = quizState.timeLeft;
}

function handleTimeUp() {
    const buttons = answerButtonsElement.children;
    Array.from(buttons).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
            setStatusClass(button, true);
        }
    });
    nextButton.classList.remove('hidden');
}

function showResults() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    const totalTime = Math.floor((Date.now() - quizState.startTime) / 1000);
    const accuracy = Math.round((quizState.score / quizState.questions.length) * 100);
    
    scoreElement.textContent = quizState.score;
    correctAnswersElement.textContent = quizState.score;
    timeTakenElement.textContent = totalTime;
    accuracyElement.textContent = accuracy;
    let message = '';
    if (accuracy === 100) {
        message = 'Perfect Score! 🏆 You\'re a Quiz Master!';
    } else if (accuracy >= 80) {
        message = 'Excellent! 🌟 You\'re really good at this!';
    } else if (accuracy >= 60) {
        message = 'Good job! 👍 Keep practicing!';
    } else if (accuracy >= 40) {
        message = 'Not bad! 💪 You can do better!';
    } else {
        message = 'Keep trying! 💪 Practice makes perfect!';
    }
    scoreMessage.textContent = message;
}

function resetQuiz() {
    startScreen.classList.remove('hidden');
    quizContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    clearInterval(quizState.timer);
    updateHeaderScore();
}

function updateHeaderScore() {
    headerScore.textContent = quizState.score;
}

function shareResults() {
    const accuracy = Math.round((quizState.score / quizState.questions.length) * 100);
    const text = `I scored ${quizState.score} out of ${quizState.questions.length} (${accuracy}% accuracy) in the ${quizState.selectedCategory} quiz on QuizMaster! Can you beat my score?`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Quiz Results',
            text: text,
            url: window.location.href
        });
    } else {
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Results copied to clipboard!');
    }
}
const style = document.createElement('style');
style.textContent = `
    .correct {
        background-color: var(--success-color) !important;
        color: white !important;
    }
    .wrong {
        background-color: var(--error-color) !important;
        color: white !important;
    }
`;
document.head.appendChild(style);
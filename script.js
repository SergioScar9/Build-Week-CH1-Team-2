
window.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("promise");
  const proceedLink = document.querySelector(".proceed-button a");

  proceedLink.addEventListener("click", (event) => {
    if (!checkbox.checked) {
      event.preventDefault();
      alert('Devi spuntare "I promise to answer myself without help from anyone" per procedere.');

      checkbox.style.outline = "2px solid red";
      checkbox.style.outlineOffset = "2px";
    } else {
      checkbox.style.outline = "none";
    }
  });
});

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let currentQuestionIndex = 0; 
let score = 0; 
let timeLeft = 60; // 
const totalQuestions = questions.length; 

const questionTitle = document.querySelector(".question-title");
const answersContainer = document.querySelector(".answers-container");
const timerElement = document.querySelector(".timer-seconds");
const currentQuestionElement = document.querySelector(".current-question");
const totalQuestionsElement = document.querySelector(".total-questions");

totalQuestionsElement.textContent = totalQuestions;


function checkAnswer(selectedAnswer, correctAnswer) {
  const buttons = document.querySelectorAll(".answer-button");

  buttons.forEach((button) => button.classList.remove("selected"));

  const clickedButton = Array.from(buttons).find((button) => button.textContent === selectedAnswer);
  if (clickedButton) {
    clickedButton.classList.add("selected");
    clickedButton.style.backgroundColor = "#d20094"; 
    clickedButton.style.color = "white";
    clickedButton.style.borderColor = "#d20094";
  }

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  setTimeout(() => nextQuestion(), 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    showQuestion(currentQuestionIndex);
    resetTimer();
  } else {
    showResults();
  }
}

function showQuestion(questionIndex) {
  const currentQuestion = questions[questionIndex];

  currentQuestionElement.textContent = questionIndex + 1;

  const questionText = currentQuestion.question;

  if (questionText.length > 60) {
    
    const breakpoint = questionText.lastIndexOf(" ", 60);
    const firstPart = questionText.slice(0, breakpoint).trim();
    const secondPart = questionText.slice(breakpoint).trim();

    questionTitle.innerHTML = `
      <span class="text-normal">${firstPart}</span><br>
      <span class="text-highlight">${secondPart}</span>
    `;
  } else {
    
    questionTitle.innerHTML = `
      <span class="text-normal">${questionText}</span>
    `;
  }

  let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  answers.sort(() => Math.random() - 0.5);

  answersContainer.innerHTML = "";

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-button");
    button.innerHTML = answer;

    button.addEventListener("click", () => checkAnswer(answer, currentQuestion.correct_answer));

    answersContainer.appendChild(button);
  });
}

let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  const circle = document.getElementById("timer-circle");
  const totalLength = 2 * Math.PI * 90;
  circle.style.strokeDasharray = totalLength;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    const offset = totalLength - (timeLeft / 60) * totalLength;
    circle.style.strokeDashoffset = offset;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 60;
  timerElement.textContent = timeLeft;

  const circle = document.getElementById("timer-circle");
  circle.style.strokeDashoffset = 0;

  startTimer();
}

function showResults() {
  questionTitle.innerHTML = `Il risultato finale è ${score} su ${totalQuestions}.`;

  let canvas = document.getElementById('resultsChart');
  if (!canvas) {
    
    canvas = document.createElement('canvas');
    canvas.id = 'resultsChart';
    canvas.width = 200;
    canvas.height = 200;
    document.querySelector('.question-container').appendChild(canvas);
  }

  document.querySelector(".timer").style.display = "none";
  document.querySelector(".question-footer").style.display = "none";
  document.querySelector(".answers-container").style.display = "none";

  const correctAnswers = score;
  const wrongAnswers = totalQuestions - score;
  const ctx = canvas.getContext('2d');

  if (window.chart) {
    window.chart.destroy();
  }

  window.chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Corrette', 'Sbagliate'],
      datasets: [{
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  let legendContainer = document.querySelector('.legend-container');
  if (!legendContainer) {
    
    legendContainer = document.createElement('div');
    legendContainer.className = 'legend-container';

    const correctLabel = document.createElement('span');
    correctLabel.textContent = 'Corrette';
    correctLabel.className = 'legend-label corrette';

    const wrongLabel = document.createElement('span');
    wrongLabel.textContent = 'Sbagliate';
    wrongLabel.className = 'legend-label sbagliate';

    legendContainer.appendChild(correctLabel);
    legendContainer.appendChild(wrongLabel);
    document.querySelector('.question-container').appendChild(legendContainer);
  }

  let confettiCanvas = document.getElementById("confettiCanvas");
  if (!confettiCanvas) {
    confettiCanvas = document.createElement("canvas");
    confettiCanvas.id = "confettiCanvas";
    confettiCanvas.style.position = "fixed";
    confettiCanvas.style.top = 0;
    confettiCanvas.style.left = 0;
    confettiCanvas.style.width = "200vw";
    confettiCanvas.style.height = "200vh";
    confettiCanvas.style.pointerEvents = "none";
    confettiCanvas.style.zIndex = 9999;
    document.body.appendChild(confettiCanvas);
  }

  const confettiInstance = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
  });

  function rainConfetti() {
    confettiInstance({
      particleCount: 5,
      spread: 30,
      startVelocity: 20,
      ticks: 200,
      gravity: 1,
      origin: {
        x: Math.random(),
        y: 0,
      },
      colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'],
    });

    setTimeout(rainConfetti, 100);
  }

  const backgroundMusic = new Audio('mp3/QUEEN - We Are The Champions.mp3');
  backgroundMusic.loop = false;
  backgroundMusic.volume = 1;
  backgroundMusic.play();

  rainConfetti();

  setTimeout(() => {
    confettiCanvas.remove();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }, 120000);
}

questions.sort(() => Math.random() - 0.5);

showQuestion(currentQuestionIndex);
startTimer();

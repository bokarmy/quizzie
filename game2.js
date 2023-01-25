const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "When was Fortnite released? ",
    choice1: "In 2015",
    choice2: "In 2016",
    choice3: "In 2017",
    choice4: "In 2I018",
    answer: 3
  },
  {
    question:
      "What's the in-game currency ?",
    choice1: "Robux",
    choice2: "V-Bucks",
    choice3: "R6 points",
    choice4: "Euro's",
    answer: 2
  },
  {
    question: " What's the name of The Cube ?",
    choice1: "Donald Trump",
    choice2: "Kevin",
    choice3: "Ninja",
    choice4: "Joe mama",
    answer: 2
  },
  {
    question: " When came the first Battle Pass ?",
    choice1: "Season 3",
    choice2: "Season 1",
    choice3: "Season 0",
    choice4: "Season 2",
    answer: 4
  },
  {
    question: " How many default skins are when you start the game?",
    choice1: "2",
    choice2: "4",
    choice3: "6",
    choice4: "8",
    answer: 4
  },
  {
    question: " What happend to the cube at the end of Season 5",
    choice1: "It teleported",
    choice2: "Removed",
    choice3: "It flew away",
    choice4: "Destroyed",
    answer: 1
  },
  {
    question: "What is the first vehicle to be added to the game ?",
    choice1: "Car",
    choice2: "Plane",
    choice3: "Shopping cart",
    choice4: "Golf car",
    answer: 3
},
{
  question: "What rarity is the Raptor skin ?",
  choice1: "Common",
  choice2: "Green",
  choice3: "Purple",
  choice4: "Legendary",
  answer: 4
},
{
  question: "How much damage is caused from a blue AR head shot ?",
  choice1: "44",
  choice2: "55",
  choice3: "66",
  choice4: "67",
  answer: 3
},

{
  question: "What is the rarest Skin in the game ? ",
  choice1: "Ikonik",
  choice2: "Renegade Raider",
  choice3: "Black Knight",
  choice4: "Galaxy Skin",
  answer: 2
},
{
  question: "What company made Fortnite ?",
  choice1: "Ubisoft",
  choice2: "Rockstar Games",
  choice3: "Epic Games",
  choice4: "Nintendo",
  answer: 3
},
{
  question: "Which was the last skin in season 4 battle pass ?",
  choice1: "Omega ",
  choice2: " Black Knight",
  choice3: "Carbide",
  choice4: "Valor ",
  answer: 1 
},

];

//CONSTANTS
const CORRECT_BONUS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();

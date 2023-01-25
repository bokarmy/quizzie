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
    question: "What is the most common map?",
    choice1: "Vertigo",
    choice2: "Inferno",
    choice3: "Dust 2",
    choice4: "Mirage",
    answer: 3
  },
  {
    question:
      "Which of these is not a weapon in Counter-Strike: Global Offensive?",
    choice1: "AK-47",
    choice2: "RPG",
    choice3: "M4A4",
    choice4: "AWP",
    answer: 2
  },
  {
    question: "Who is widely considered the best player in the world?",
    choice1: "Coldzera",
    choice2: "S1mple",
    choice3: "Niko",
    choice4: "Olofmeister",
    answer: 2
  },
  {
    question: "What is the name of the map that is set in a jungle?",
    choice1: "Mirage",
    choice2: "Inferno",
    choice3: "Nuke",
    choice4: "Jungle",
    answer: 4
  },
  {
    question: "What is the highest achievable rank in CS:GO?",
    choice1: "Master Guardian Elite",
    choice2: "Legendary Eagle",
    choice3: "Supreme Master First Class",
    choice4: "Global Elite",
    answer: 4
  },
  {
    question: "What is the name of the map that is set in a desert?",
    choice1: "Dust 2",
    choice2: "Inferno",
    choice3: "Nuke",
    choice4: "Vertigo",
    answer: 1
  },
  {
    question: "What is the name of the map that is set in a skyscraper?",
    choice1: "Dust 2",
    choice2: "Cache",
    choice3: "Vertigo",
    choice4: "Mirage",
    answer: 3
},
{
  question: "What game was Counter-Strike originally a mod for?",
  choice1: "Left for Dead",
  choice2: "Team Fortress",
  choice3: "Portal",
  choice4: "Half-Life",
  answer: 4
},
{
  question: "What is the most expensive M4A4 skin?",
  choice1: "Dragon King",
  choice2: "Dragon Lore",
  choice3: "Howl",
  choice4: "IEM Katowice 2014",
  answer: 3
},

{
  question: "Which pro player is known for his jumping collat?",
  choice1: "S1mple",
  choice2: "Coldzera",
  choice3: "Niko",
  choice4: "Olofmeister",
  answer: 2
},
{
  question: "On what map was the olofboost first used?",
  choice1: "Mirage",
  choice2: "Inferno",
  choice3: "Overpass",
  choice4: "Nuke",
  answer: 3
},
{
  question: "What is the exact release date of CS:GO?",
  choice1: "August 21, 2012",
  choice2: "September 21, 2012",
  choice3: "June 15th, 2013",
  choice4: "November 11th, 2013",
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
    return window.location.assign("./end.html");
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

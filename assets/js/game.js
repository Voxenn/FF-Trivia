// Constant variables used in the program
const questions = 6;

//Variables used in the program
var questionBank = [];
var correctAnswers = 0;
var questionNumber = 0;
var progress = 0;
var answer = "";
var id;


$(document).ready(main);
function main() {
  init();
  $("#answer1").click(function() {
    checkAnswer($("#answer1 span").html());
  });
  $("#answer2").click(function() {
    checkAnswer($("#answer2 span").html());
  });
  $("#answer3").click(function() {
    checkAnswer($("#answer3 span").html());
  });
}

function init() {
  var question1 = new loadQuestion(
    "What is the name of the organization that Balamb Garden produces students for?",
    "Edea's Army",
    "Galbania Elite Forces",
    "SeeD",
    "SeeD"
  );
  var question2 = new loadQuestion(
    "Zell has a favorite food from the cafeteria. What is it?",
    "Hot Dogs",
    "Grilled Chocobo Sandwiches",
    "Ice Cream",
    "Hot Dogs"
  );
  var question3 = new loadQuestion(
    "The name of the renowned card game is what?",
    "Triple Trader",
    "Triple Triad",
    "Triad Trader",
    "Triple Triad"
  );
  var question4 = new loadQuestion(
    "Rinoa is a member of what anti-Edea force?",
    "The Forest Owls",
    "The Timber Owls",
    "The Timber Allied Forces",
    "The Forest Owls"
  );
  var question5 = new loadQuestion(
    "What is the name of the ship that is acquired in the game?",
    "Bahamut",
    "Ragnarok",
    "Highwind",
    "Ragnarok"
  );
  var question6 = new loadQuestion(
    "Name the first drawable Guardian Force possible.",
    "Ifrit",
    "Quezacotl",
    "Siren",
    "Siren"
  );

  questionBank = [question1, question2, question3, question4, question5,
    question6];
    $("#replay").hide();
    askQuestions();
}

function askQuestions() {
  if (progress === questions) {
    questionBank = [];
    displayResults();
  } else {
    $("#question").html(questionBank[questionNumber].question);
    $("#answer1 span").html(questionBank[questionNumber].answer1);
    $("#answer2 span").html(questionBank[questionNumber].answer2);
    $("#answer3 span").html(questionBank[questionNumber].answer3);
    clearInterval(id);
    if (questionNumber < 6) {
      timer();
    }
  }
}
function loadQuestion(question, answer1, answer2, answer3, correctAn) {
  this.question = question;
  this.answer1 = answer1;
  this.answer2 = answer2;
  this.answer3 = answer3;
  this.correctAn = correctAn;
}

function checkAnswer(answer) {
  this.answer = answer;
  if (answer === questionBank[questionNumber].correctAn) {
    correctAnswers++;
    alert("Great job!!");
  } else if (answer === "") {
    alert("Out of time!");
  } else {
    alert("Incorrect answer. The correct answer is: " +
    questionBank[questionNumber].correctAn);
  }
  progress++;
  questionNumber++;
  askQuestions();
}

function displayResults() {
  setBackground();
  clearFields();
  $("#question").html("You answered " + correctAnswers + " correct out of " +
    questions + " total.");
  if (correctAnswers === questions) {
    $("#answer1").html("You're legendary!!!");
  } else if (correctAnswers >=4 && correctAnswers < 6) {
    $("#answer1").html("Great job! Still some more playing to do.");
  } else {
    $("#answer1").html("Better luck next time, rookie.");
  }
  correctAnswers = 0;
  $("#replay").show();
  $("#replay span").html("Play again?");
  $("#replay span").click(function reload() {
      location.reload();
  });
}

function setBackground() {
  document.body.style.backgroundImage = 'url(assets/images/gameover.png)';
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}

function clearFields() {
  progress = 0;
  questionNumber = 0;
  $("#question").empty();
  $("#answer1").empty();
  $("#answer2").empty();
  $("#answer3").empty();
  $("#answer1").hide();
  $("#answer2").hide();
  $("#answer3").hide();
  $("#progressBar").hide();
  $("#bar").hide();
}

function timer() {
  var barElem = document.getElementById("bar");
  var width = 100;
  id = setInterval(frame, 85);
  function frame() {
    if (width <= 0) {
      clearInterval(id);
      checkAnswer("");
    } else {
      width--;
      barElem.style.width = width + '%';
    }
  }
}


var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

document.getElementById("start").addEventListener("click", event => {
  console.log("clicked");
  document.getElementById("start").classList.add("d-none");
  document.getElementById("questions").classList.remove("d-none");
  setTime();
  renderQuestions();
  quizTime = setInterval(setTime, 1000);
});

function renderQuestions() {
  var questionsIndexLength = questions.length - 1;
  if (index <= questionsIndexLength) {
    document.getElementById("question").innerHTML = questions[index].title;
    renderQuestionChoices();
  }
  quizEnd();
}

function startQuiz() {
  // hide start screen
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");

  questionsEl.setAttribute("class", " ");

  timerId = setInterval(function(){
    clockTick();
  }, 1000);

  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {

  var currentQuestion = questions[currentQuestionIndex];

  questionsEl.children[0].textContent = currentQuestion.title;

  while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);
  }
  // loop choices
  for(var i = 0; i < currentQuestion.choices.length; i++){


    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    

    choicesEl.appendChild(choiceButton);
  }

  choicesEl.children[0].addEventListener("click", function(event){
    questionClick(choicesEl.children[0]);
  });
  choicesEl.children[1].addEventListener("click", function(event){
    questionClick(choicesEl.children[1]);
  });
  choicesEl.children[2].addEventListener("click", function(event){
    questionClick(choicesEl.children[2]);
  });
  choicesEl.children[3].addEventListener("click", function(event){
    questionClick(choicesEl.children[3]);
  });
}




  feedbackEl.setAttribute("class", "feedback");
  setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
  }, 500);


  currentQuestionIndex++;


  if(currentQuestionIndex === questions.length)

    quizEnd();

  else

    getQuestion();


function setTime() {
  document.getElementById("timer").innerHTML = countDown + "sec left";
  countDown--;
  if (countDown == -1) {
    clearInterval(quizTime);
  }
  quizEnd();
}

function quizEnd() {

  clearInterval(timerId);
  timerEl.textContent = time;


  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");


  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;


  questionsEl.setAttribute("class", "hide");
}

function clockTick() {

  time--;
  timerEl.textContent = time;


  if(time <= 0)
    quizEnd();
  
}

function saveHighscore() {

  var initials = initialsEl.value.toUpperCase();

  if(initials === ""){ 
    alert("Input can't be blank'");
    return;
  }
  else if(initials.length > 3){
    alert("Input should be no more than 3 characters");
    return;
  }
  else{

    var highscores;
    if(JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
      highscores = [];

    var newScore = {
      initials: initials,
      score: time
    };
    highscores.push(newScore);

    localStorage.setItem("highscores", JSON.stringify(highscores));

    location.href = "highscores.html";
  }
}

function checkForEnter(event) {

    if(event.keyCode === 13)
      saveHighscore();
}


submitBtn.onclick = saveHighscore;


startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;

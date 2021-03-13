//setup variables using jquery
var quizButton = $("#quizButton");
var highscoresButton = $("#highscoresButton");
var startButton = $("#startButton");
var quizTimer = $("#quizTimer");

//function that calls everytime quiz button is selected
function onQuizButton()
{
    //show quiz
    var quizContainer = $("#quiz");
    quizContainer.show();
    //hide highscores
    var highscoresContainer = $("#highscores");
    highscoresContainer.hide();
    //set quiz button to be active button
    quizButton.addClass("active");
    highscoresButton.removeClass("active");
}

//function that calls everytime highscores button is selected
function onHighscoresButton()
{
    //show highscores
    var highscoresContainer = $("#highscores");
    highscoresContainer.show();
    //hide quiz
    var quizContainer = $("#quiz");
    quizContainer.hide();
    //set highscores button to be active button
    highscoresButton.addClass("active");
    quizButton.removeClass("active");
}

//function that initiates the beginning of the quiz
function onStartButton()
{
    setupQuiz();
}

var currentQuizOptions = [];
var timer = 30;
var timerInterval = null;

function setupQuiz()
{
    //hide quiz start screen
    var quizStartScreen = $("#quizStart");
    quizStartScreen.hide();
    //show quiz form
    var quizForm = $("#quizForm");
    quizForm.show();
    //create current quiz options from global options variable
    currentQuizOptions = quizOptions.slice(); 
    //reset visual timer
    quizTimer.text("Time: 30");
    //reset global timer variable
    timer = 3   0;
    //start interval
    timerInterval = setInterval(decrementTimer, 1000);
}

function decrementTimer()
{
    //decrement timer variable by one
    timer --;
    //update visual
    quizTimer.text("Time: " + timer);
}

var correctAnswerValue = 100
var wrongAnswerValue = -50

var quizOptions = 
[
    {
        question:"What is an example of a primitive variable type?",
        answer:"null",
        options:["object","function","null","caveman"],
        hasBeenUsed:false
    },
    {
        question:"Which answer is an integer?",
        answer:"96",
        options:["96","\"96\"","integer","whole number"],
        hasBeenUsed:false
    },
    {
        question:"Which answer is a string?",
        answer:"\"boom sauce\"",
        options:["\"boom sauce\"","boom sauce","96","ninety six"],
        hasBeenUsed:false
    },
    {
        question:"Which answer is an object?",
        answer:"{name:'lane'}",
        options:["var object","[]","{name:'lane'}","ninety six"],
        hasBeenUsed:false
    }
]

//create array of objects with possible questions and answers

//setup on click events using jquery
quizButton.click(onQuizButton)
highscoresButton.click(onHighscoresButton)
startButton.click(onStartButton);
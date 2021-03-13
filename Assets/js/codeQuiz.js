//setup variables using jquery
var quizButton = $("#quizButton");
var highscoresButton = $("#highscoresButton");
var startButton = $("#startButton");

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

function setupQuiz()
{

}

//create array of objects with possible questions and answers

//setup on click events using jquery
quizButton.click(onQuizButton)
highscoresButton.click(onHighscoresButton)
startButton.click(onStartButton);
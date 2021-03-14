//setup variables using jquery
var quizButton = $("#quizButton");
var highscoresButton = $("#highscoresButton");
var startButton = $("#startButton");
var quizTimer = $("#quizTimer");
var buttonGroup = $("#buttonGroup");
var button0 = $("#Button0");
var button1 = $("#Button1");
var button2 = $("#Button2");
var button3 = $("#Button3");
var quizAlert = $("#quizAlert");
var quizScore = $("#quizScore");
var inputGroup = $("#inputGroup");
var initialsInput = $("#initialsInput");
var submitInitials = $("#submitInitials");
var clearHighscores = $("#clearHighscores")

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
    //setup highscores table
    resetHighscoresTable();
}

function showStartScreen()
{
    //show quiz start screen
    var quizStartScreen = $("#quizStart");
    quizStartScreen.show();
    //hide quiz form
    var quizForm = $("#quizForm");
    quizForm.hide();
    //hide input group and alert
    inputGroup.hide();
    quizAlert.hide();
    //show button group
    buttonGroup.show();
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
    timer = 30;
    //reset visual score
    quizScore.text("Score: 0");
    //reset global score
    score = 0;
    //start interval
    timerInterval = setInterval(decrementTimer, 1000);
    //show first question
    showQuestion();
}

//declare current quiz object globally so it can be accessed in other functions
var currentQuestionObject = {};
//setup interval that takes time away from the correct answer value
var correctAnswerInterval = null;

function showQuestion()
{
    //reset buttons to non active
    $('.list-group-item').each(function() 
    {
        var currentButton = $("#" + this.id);
        currentButton.removeClass("active");
        currentButton.removeClass("disabled");
    });

    //reset alert if visible
    quizAlert.hide();

    if(currentQuizOptions.length>0)
    {
        //randomly select a question
        var currentQuestionIndex = retrieveRandomIndexFromArray(currentQuizOptions); 
        currentQuestionObject = currentQuizOptions[currentQuestionIndex];
        //set question
        var quizQuestion = $("#quizQuestion");
        quizQuestion.text(currentQuestionObject.question);
        //get options randomly
        var optionsLength = currentQuestionObject.options.length;
        for(var a = 0;a<optionsLength;a++)
        {
            var optionIndex = retrieveRandomIndexFromArray(currentQuestionObject.options);
            //set option to button
            var button = $("#Button" + a)
            button.text(currentQuestionObject.options[optionIndex]);
            //remove option from array
            currentQuestionObject.options.splice(optionIndex, 1);
        }
        correctAnswerValue = 100;
    }else
    {
        //user has reached the end of the quiz
        endOfQuiz();
    }
    //start correct answer interval
    correctAnswerInterval = setInterval(decrementCorrectAnswerScore,100);
    //remove current question from array of questions
    currentQuizOptions.splice(currentQuestionIndex,1);
}

function retrieveRandomIndexFromArray(array)
{
    return Math.floor(Math.random() * array.length);
}

function decrementCorrectAnswerScore()
{
    if(correctAnswerValue > 15)
    {
        correctAnswerValue -= 1;
    }else
    {
        //lowest correct answer score possible
        correctAnswerValue = 15;
        //stop interval
        clearInterval(correctAnswerInterval);
    }
}

function checkQuestion(event)
{
    //clear correct answer interval
    clearInterval(correctAnswerInterval);
    var optionSelected = $(event.target);
    if(optionSelected.text() == currentQuestionObject.answer)
    {
        correctAnswer(optionSelected);
    }else
    {
        wrongAnswer(optionSelected);
    }
    setAllNonActiveButtonsInactive();
    setTimeout(showQuestion, 2000)
}

function correctAnswer(selected)
{
    //set class of option to active
    selected.addClass("active");
    //show alert as visible and green
    quizAlert.show();
    quizAlert.addClass("alert-success");
    quizAlert.removeClass("alert-danger");
    quizAlert.text("Correct! +" + correctAnswerValue + " points!");
    //increment global score value
    updateScore(correctAnswerValue)
}

function wrongAnswer(selected)
{
    //set class of option to active
    selected.addClass("active");
    //show alert as visible and red
    quizAlert.show();
    quizAlert.addClass("alert-danger");
    quizAlert.removeClass("alert-success");
    quizAlert.text("Incorrect! " + wrongAnswerValue + " points!");
    //increment global score value
    updateScore(wrongAnswerValue)
}

//user cannot continue pressing buttons after inital answer
function setAllNonActiveButtonsInactive()
{
    //set buttons to in active
    $('.list-group-item').each(function() 
    {
        var currentButton = $("#" + this.id);
        if(!currentButton.hasClass("active"))
        {
            currentButton.addClass("disabled");
        }
    });
}

function updateScore(scoreToUpdate)
{
    score += scoreToUpdate;
    quizScore.text("Score: " + score);
}

function decrementTimer()
{
    //decrement timer variable by one
    timer --;
    //update visual
    quizTimer.text("Time: " + timer);
    //check for zero
    if(timer == 0)
    {
        endOfQuiz();
    }
}

function endOfQuiz()
{
    //stop timer
    clearInterval(timerInterval);
    //make alert primary
    quizAlert.removeClass("alert-success")
    quizAlert.removeClass("alert-danger")
    quizAlert.addClass("alert-primary")
    //update alert text
    quizAlert.text("You've reached the end of the quiz! Your score was " + score);
    //show alert
    quizAlert.show();
    //hide button group
    buttonGroup.hide();
    //show input group
    inputGroup.show();
    //update quiz question title
    var quizQuestion = $("#quizQuestion");
    quizQuestion.text("Results");
}

function onSubmitInitials()
{
    //write initials and score to local storage
    var highscores = localStorage.getItem("highscores");
    if(highscores !== null)
    {
        //parse string into expecting object
        var highscoresObject = JSON.parse(highscores);
    }else
    {
        //create highscores object
        var highscoresObject = [];
    }
    //setup currect highscore to add to storage
    var currentHighscore = 
    {
        "initials": initialsInput.val(),
        "score": score
    }
    //add score to highscores object
    highscoresObject.push(currentHighscore);
    //sort highscore objects
    highscoresObject.sort((a, b) => (b.score - a.score));
    //stringify and save
    localStorage.setItem("highscores",JSON.stringify(highscoresObject));
    //reset quiz view
    showStartScreen()
    //show highscores
    onHighscoresButton();
}

function onClearHighscores()
{
    //clear local storage
    localStorage.clear();
    //resest view
    resetHighscoresTable();
}

function resetHighscoresTable()
{
    //remove all existing rows except first
    $("#highscoresTable").find("tr:gt(0)").remove();
    //get data from local storage
    var highscores = localStorage.getItem("highscores");
    if(highscores != null)
    {
        var highscoresObject = JSON.parse(highscores);
        //add rows from storage
        for(var a = 0;a<highscoresObject.length;a++)
        {
            var prettyIndex = a+1;
            $('#highscoresTable tr:last').after(`<tr><th>${prettyIndex}</th><td>${highscoresObject[a].initials}</td><td>${highscoresObject[a].score}</td></tr>`);
        }
    }

}

var correctAnswerValue = 100
var wrongAnswerValue = -50
var score = 0;

var quizOptions = 
[
    {
        question:"What is an example of a primitive variable type?",
        answer:"null",
        options:["object","function","null","caveman"],
    },
    {
        question:"Which answer is an integer?",
        answer:"96",
        options:["96","\"96\"","integer","whole number"],
    },
    {
        question:"Which answer is a string?",
        answer:"\"boom sauce\"",
        options:["\"boom sauce\"","boom sauce","96","ninety six"],
    },
    {
        question:"Which answer is an object?",
        answer:"{name:'lane'}",
        options:["var object","[]","{name:'lane'}","ninety six"],
    }
]

//create array of objects with possible questions and answers

//setup on click events using jquery
quizButton.click(onQuizButton)
highscoresButton.click(onHighscoresButton)
startButton.click(onStartButton);
button0.click(checkQuestion)
button1.click(checkQuestion)
button2.click(checkQuestion)
button3.click(checkQuestion)
submitInitials.click(onSubmitInitials);
clearHighscores.click(onClearHighscores)
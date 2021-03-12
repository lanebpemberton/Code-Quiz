//setup variables using jquery
var quizButton = $("#quizButton");
var highscoresButton = $("#highscoresButton");

//function that calls everytime quiz button is selected
function onQuizButton()
{
    console.log("quiz button");
}

//function that calls everytime highscores button is selected
function onHighscoresButton()
{
    console.log("highscores button");
}

//setup on click events using jquery
quizButton.click(onQuizButton)
highscoresButton.click(onHighscoresButton)
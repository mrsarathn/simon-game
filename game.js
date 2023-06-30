
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;


$(".btn").on("click", function() {
    animatePress($(this));
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});   


$(document).ready( function() {
    $(document).on("keydown", function(event) {
        if( !started) {
            nextSequence();
            $("h1").text("Level " + level);
            started = true;
        }

    });
});

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

function checkAnswer(currentLevel) {
    console.log("Game Pattern: ", gamePattern);
    console.log("User Clicked Pattern: ", userClickedPattern);

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Correct");
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } 
    else {
        console.log("Wrong");

        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout( function() {
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over! Press any key to start")
        startOver();
    };
};

function nextSequence() {
    
    userClickedPattern = []

    level++;
    $("h1").text("Level " + level);

    randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    var buttonColours = ["red", "blue", "green", "yellow"];
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(chosenColour) {
    var audio = new Audio("./sounds/" + chosenColour + ".mp3");
    audio.play();       
};


function animatePress(element) {

     $(element).addClass("pressed");
    setTimeout( function() {
        $(element).removeClass("pressed");
    }, 100);

};
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var sound;

function nextSequence()
{
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("."+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

var numberOfButtonClicks =0; 

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    numberOfButtonClicks++;
    checker();
});

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name)
{
    sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

var level = 0;

$("body").keydown(function() {
    if(level === 0)
    {
        level++;
        $("h1").text("Level "+level);
        setTimeout(function(){
            nextSequence();
        },1000);
    }
});


function checker()
{
    if(patternCheck() && level === numberOfButtonClicks)
    {
    level++;
    $("h1").text("Level "+level);
    setTimeout(function(){
        nextSequence();
    },2000);
    userClickedPattern = [];
    numberOfButtonClicks = 0;
    }
    else if(patternCheck()===0)
    {
        sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").addClass("wrong");
        setTimeout(function() {
            $("body").removeClass("wrong");
        },100);
        $("h1").text("Game Over,Press Any Key to Restart");
        level =0;
        userClickedPattern = [];
        numberOfButtonClicks = 0;
        gamePattern = [];
    }
}


function patternCheck()
{
    for(var j=0;j<userClickedPattern.length;j++)
    {
        if(userClickedPattern[j] !== gamePattern[j])
        {
            return 0;
        }
        else
        {
            continue;
        }
    }
    return 1;
}

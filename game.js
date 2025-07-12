var colors=["red","green","blue","yellow"];
var gamePattern=[];
var userPattern=[];
var level=0;
$(document).keypress(function(event){
    newSequence();
});
$(".btn").click(function(){
    var color=$(this).attr("id");
    userPattern.push(color);
    animate(color);
    playSound(color);
    check(userPattern.length-1);
});

function newSequence(){
    level++;
    $("#level-title").text("Level " + level);
    userPattern.length=0;
    var randomNumber=Math.floor(Math.random()*4);
    gamePattern.push(colors[randomNumber]);
    $("#" + colors[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colors[randomNumber]);
}
function check(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          newSequence();
        }, 1000);
    }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        gamePattern=[];
        level=0;
    }
}


function animate(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },200);
}
function playSound(name){
    var audio=new Audio('./sounds/' + name + '.mp3');
    audio.play();
}
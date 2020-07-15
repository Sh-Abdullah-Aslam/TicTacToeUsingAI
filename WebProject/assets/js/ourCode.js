$(document).ready(function(){

    // select option change function
    $("#gameTypeSelect").change(function(){
        let selectedGameType = $(this).children("option:selected").val();
        if (selectedGameType === "CvsP")
        {
            restartGame();
            $("#typeOfPlayer1").text("Player : ");
            $("#typeOfPlayer2").text("Computer : ");
        } 
        else
        {
            restartGame();
            $("#typeOfPlayer1").text("Player 1 : ");
            $("#typeOfPlayer2").text("Player 2 : ");
        }
    });

    var timer = $("#timer");
    var seconds = 0;
    var minutes = 0;
    var isTimerStarted = false;

    // start time after game is started (any box within the grid is clicked)
    $(".box").click(function()
    {
        if(!isTimerStarted)
            {
                setInterval(updateTimer, 1000);
            }
        isTimerStarted = true;
    });

    var timer = $("#timer");
    var timerText = "";

    function updateTimer()
    {
        seconds++;
        if(seconds==60)
        {
            minutes++;
            seconds = 0;
        }
        if(minutes<10)
        {
            timerText = "0".concat(minutes.toString()) + " : ";
        }
        else
        {
            timerText = minutes.toString() + " : ";
        }
        if(seconds<10)
        {
            timerText += "0".concat(seconds.toString());
        }
        else
        {
            timerText += seconds.toString();
        }
        timer.text(timerText);
    }
});
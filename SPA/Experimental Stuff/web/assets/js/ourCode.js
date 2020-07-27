$(document).ready(function(){    
    var grid = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    var turn = 1;
    var moves = 0;
    var gameEnded = false;
    var selectedGameType = "";
    var isShown = false;

    $("#PvsP").click(function(){
        if(!isShown)
        {
            isShown=true;
            $("#GameSection").removeClass("hidden");
        }
        $("#gamesWonLabel").text("Won (P1)");
        $("#gamesLostLabel").text("Won (P2)");
        restartGame();
        $("#typeOfPlayer1").text("Player 1 : ");
        $("#typeOfPlayer2").text("Player 2 : ");
        selectedGameType = "PvsP";
    });

    $("#CvsP, #SCvsP").click(function(){
        if(!isShown)
        {
            isShown=true;
            $("#GameSection").removeClass("hidden");
        }
        $("#gamesWonLabel").text("Won");
        $("#gamesLostLabel").text("Lost");
        restartGame();
        $("#typeOfPlayer1").text("Player : ");
        $("#typeOfPlayer2").text("Computer : ");
        selectedGameType = $(this).attr("id");
    });

    // select option change function
    $(".gameTypeButton").click(function()
    {
        // remove red color from text
        grid = [[0,0,0],[0,0,0],[0,0,0]];
        $(".box").removeClass("winPath");
        $("#gamesWon").text("0");
        $("#gamesLost").text("0");
        $("#gamesDrawn").text("0");
        $("#gamesTotal").text("0");
    });

    // start time after game is started (any box within the grid is clicked)
    $(".box").click(function()
    {
        if (selectedGameType === "CvsP")
        {
            $(".box").removeAttr("disabled");
            clickedCell(this);
        }
        else if(selectedGameType === "PvsP" )
        {
            if(!gameEnded)
            {
                moves++;
                let x = $(this).attr("id")[0];
                let y = $(this).attr("id")[1];
                if(turn == 1){
                    $(this).text("X");
                    grid[x][y] = 1;
                    turn++;
                    $("#message").text("Player 2's turn");
                    checkIfGameEnded(1);
                }
                else{
                    $(this).text("0");
                    grid[x][y] = 2;
                    turn--;
                    $("#message").text("Player 1's turn");
                    checkIfGameEnded(2);
                }
                if(moves == 9)
                {
                    $("#message").text("Draw");
                    $("#playAgain").css("visibility", "visible");
                    
                    let drawn = parseInt($("#gamesDrawn").text());
                    let total = parseInt($("#gamesTotal").text());

                    $("#gamesDrawn").text((drawn+1).toString());
                    $("#gamesTotal").text((total+1).toString());
                }
            }
        }
    });

    function checkIfGameEnded(playerToCheck)
    {
        // main diagonal
        if(grid[0][0] == playerToCheck && grid[1][1] == playerToCheck && grid[2][2] == playerToCheck)
        {
            $("#00").addClass("winPath");
            $("#11").addClass("winPath");
            $("#22").addClass("winPath");
            playerWon(playerToCheck);
        }
        // reverse diagonal
        if(grid[0][2] == playerToCheck && grid[1][1] == playerToCheck && grid[2][0] == playerToCheck)
        {
            $("#02").addClass("winPath");
            $("#11").addClass("winPath");
            $("#20").addClass("winPath");
            playerWon(playerToCheck);
        }
        for (let x = 0; x <= 2; x++)
        {
            // check rows
            if(grid[0][x] == playerToCheck && grid[1][x] == playerToCheck && grid[2][x] == playerToCheck)
            {
                let idOfBox = "#0"+x.toString();
                $(idOfBox).addClass("winPath");
                idOfBox = "#1"+x.toString();
                $(idOfBox).addClass("winPath");
                idOfBox = "#2"+x.toString();
                $(idOfBox).addClass("winPath");
                playerWon(playerToCheck);
            }

            // check all columns
            if(grid[x][0] == playerToCheck && grid[x][1] == playerToCheck && grid[x][2] == playerToCheck)
            {
                let idOfBox = "#"+x.toString()+"0";
                $(idOfBox).addClass("winPath");
                idOfBox = "#"+x.toString() + "1";
                $(idOfBox).addClass("winPath");
                idOfBox = "#"+x.toString() + "2";
                $(idOfBox).addClass("winPath");
                playerWon(playerToCheck);
            }
        }
        return false;
    }

    function playerWon(playerNo){
        gameEnded = true;
        $("#message").text("Player "+ playerNo.toString() +" won");
        $("#playAgain").css("visibility", "visible");
        $(".box").attr("disabled", true);

        if(playerNo == 1)
        {
            let wonByPlayer1 = parseInt($("#gamesWon").text());
            let total = parseInt($("#gamesTotal").text());

            $("#gamesWon").text((wonByPlayer1+1).toString());
            $("#gamesTotal").text((total+1).toString());
        }
        else
        {
            let wonByPlayer2 = parseInt($("#gamesLost").text());
            let total = parseInt($("#gamesTotal").text());

            $("#gamesLost").text((wonByPlayer2+1).toString());
            $("#gamesTotal").text((total+1).toString());
        }
    }

    $("#playAgain").click(function()
    {
        if(selectedGameType == "CvsP")
        {
            restartGame();
        }
        else if(selectedGameType == "PvsP")
        {
            gameEnded = false;
            moves = 0;
            grid = [[0,0,0],[0,0,0],[0,0,0]];
            $("#playAgain").css("visibility", "hidden");
            $(".box").removeClass("winPath");
            $(".box").text("");
            $("#message").text("Player "+turn.toString() +"'s turn");
        }
    });
});
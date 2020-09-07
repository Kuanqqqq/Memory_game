/* This script extracts the total seconds from the iframe and calculates the winner. */

// get each individual iframes
var iframe1 = document.getElementById("if1");
var iframe2 = document.getElementById("if2");
var iframe3 = document.getElementById("if3");
var iframe4 = document.getElementById("if4");

/* Will check if there is a winner every second. If there is,
 * it will return the winner's time. */
function checkWin() {
    // check if all the individual games are done
    var if1Win = iframe1.contentWindow.hasWon();
    var if2Win = iframe2.contentWindow.hasWon();
    var if3Win = iframe3.contentWindow.hasWon();
    var if4Win = iframe4.contentWindow.hasWon();

    if (if1Win && if2Win && if3Win && if4Win) {
        var scores = []; //store all the times in a dictionary

        scores["Player 1"] = iframe1.contentWindow.returnScore();
        scores["Player 2"] = iframe2.contentWindow.returnScore();
        scores["Player 3"] = iframe3.contentWindow.returnScore();
        scores["Player 4"] = iframe4.contentWindow.returnScore();

        var bestPlayer = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
        var highestScore = scores[bestPlayer];

        alert("The best score was " + highestScore + " from " + bestPlayer + "! Good job!");
        clearInterval(myInterval);
    }
}

var myInterval = setInterval(checkWin, 1000);
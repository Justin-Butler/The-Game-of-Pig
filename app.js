/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*FUNCTIONS*/
//Updates the GUI for the Turn Change
function turnChange() {
  if (turnTracker === 1) {
    playerOneName[0].classList.remove("active");
    playerTwoName[0].classList.add("active");
    turnTracker = 2;
  }
  else {
    playerTwoName[0].classList.remove("active");
    playerOneName[0].classList.add("active");
    turnTracker = 1;
  }
}
//Checks to see if the Game is currently won (Player Reaches a Held Score of 100)
function gameOverChecker() {
  if (playerOne.heldScore >= 100 || playerTwo.heldScore >= 100) {
    gameOver = true;
  }
  else {
    if (turnTracker === 1) {
      turnChange();
    }
    else {
      turnChange();
    }
  }
}
//Randomizes a number from 1-6 as the die is six sided. Performs Animation and then displays the result to the player and returns the value of the die.
function rollDice() {
  var result = Math.floor(Math.random() * 7);
  var diceImg = 1;
  var anim = setInterval(frame, 50);
  function frame() {
    if (diceImg > 6){
      dice.src = "dice/dice-" + result + ".png";
      clearInterval(anim);
    }
    else {
      dice.src = "dice/dice-" + diceImg + ".png";
      diceImg++;
    }
  }
  return result;
}
//Calls Dice Roll Function and uses the result to update the score of the player.
function answerCheck() {
  if (!gameOver){
    var roll = rollDice();
    //If a 1 is rolled
    if (roll === 1) {
      if (turnTracker === 1) {
        playerOne.tempScore = 0;
        playerOneTempScore.innerHTML = playerOne.tempScore;
        turnChange();
      }
      else {
        playerTwo.tempScore = 0;
        playerTwoTempScore.innerHTML = playerTwo.tempScore;
        turnChange();
      }
    }
    //If a number above 1 is rolled
    else {
      if (turnTracker === 1) {
        playerOne.tempScore = playerOne.tempScore + roll;
        playerOneTempScore.innerHTML = playerOne.tempScore;
      }
      else {
        playerTwo.tempScore = playerTwo.tempScore + roll;
        playerTwoTempScore.innerHTML = playerTwo.tempScore;
      }
    }
  } 
}
//Adds the Value of the Temp Score to the Held Score and checks if the game is won.
function holdScore() {
  if (!gameOver) {
    if (turnTracker === 1) {
      playerOne.heldScore = playerOne.heldScore + playerOne.tempScore;
      playerOne.tempScore = 0;
      playerOneTempScore.innerHTML = playerOne.tempScore;
      playerOneHeldScore.innerHTML = playerOne.heldScore;
    }
    else {
      playerTwo.heldScore = playerTwo.heldScore + playerTwo.tempScore;
      playerTwo.tempScore = 0;
      playerTwoTempScore.innerHTML = playerTwo.tempScore;
      playerTwoHeldScore.innerHTML = playerTwo.heldScore;
    }
    gameOverChecker();
  }
}
//New Game Function
function newGame() {
  playerOne.tempScore = 0;
  playerOne.heldScore = 0;
  playerTwo.tempScore = 0;
  playerTwo.tempScore = 0;
  playerOneTempScore.innerHTML = playerOne.tempScore;
  playerOneHeldScore.innerHTML = playerOne.heldScore;
  playerTwoTempScore.innerHTML = playerTwo.tempScore;
  playerTwoHeldScore.innerHTML = playerTwo.heldScore;
  gameOver = false;
  if (turnTracker === 2) {
    turnChange();
  }
}

/*GLOBAL VARIABLES*/

//Player Scores
var playerOne = {
  tempScore: 0,
  heldScore: 0
};
var playerTwo = {
  tempScore: 0,
  heldScore: 0
};

//DOM Variables
var playerOneName = document.getElementsByClassName("player-0-panel");
var playerTwoName = document.getElementsByClassName("player-1-panel");
var playerOneHeldScore = document.getElementById("score-0");
var playerOneTempScore = document.getElementById("current-0");
var playerTwoHeldScore = document.getElementById("score-1");
var playerTwoTempScore = document.getElementById("current-1");
var dice = document.getElementById("die");
var newGameBtn = document.getElementById("newGameBtn");
var rollDiceBtn = document.getElementById("rollDiceBtn");
var holdBtn = document.getElementById("holdBtn");

//Other Global Variables 
var turnTracker = 1;
var gameOver = false;

/*INITIATE*/
newGame();

/*Event Listeners*/
newGameBtn.addEventListener("click", newGame);
rollDiceBtn.addEventListener("click", answerCheck);
holdBtn.addEventListener("click", holdScore);

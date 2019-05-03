var scores, roundScore, activePlayer, dice, dice2, lastDice, lastDice2;

//variables declared

var scoreZero = document.getElementById("score-0");
var scoreOne = document.getElementById("score-1");
var currentZero = document.getElementById("current-0");
var currentOne = document.getElementById("current-1");
var nameZero = document.getElementById("name-0");
var nameOne = document.getElementById("name-1");

var panelZero = document.querySelector(".player-0-panel");
var panelOne = document.querySelector(".player-1-panel");

var buttonRoll = document.querySelector(".btn-roll");
var buttonHold = document.querySelector(".btn-hold");
var buttonNew = document.querySelector(".btn-new");

var diceIcon = document.querySelector(".dice");
var diceIcon2 = document.querySelector(".dice-2");

const playerZeroTitle = document.querySelector(".player-0-panel");
const playerOneTitle = document.querySelector(".player-1-panel");

// on page load ---------------------------------------------------------------------------------------------------//

init();

diceIcon.style.display = "none";
diceIcon2.style.display = "none";

//----------------------------------------------------------------------------------------------------------------//
// FUNCTION   button roll    --------------------------------------------------------------------------------------//
buttonRoll.addEventListener("click", function() {
  if (gamePlaying) {
    // 1. random number
    //always displays a number between 1 - 6
    dice = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    //2.display the result
    diceIcon.style.display = "block";
    diceIcon2.style.display = "block";
    diceIcon.src = "../img/d-" + dice + ".svg";
    diceIcon2.src = "../img/d-" + dice2 + ".svg";

    // if either dice is not equal to 1 add score

    if (dice !== 1 && dice2 !== 1) {
      //add score
      roundScore += dice + dice2;
      // same as roundScore = roundScore + dice;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //from our nextplayer function
      nextPlayer();
    }

    // find variable after click
    lastDice = dice;
    lastDice2 = dice2;
  }
});
//----------------------------------------------------------------------------------------------------------------//
// FUNCTION   button Hold   --------------------------------------------------------------------------------------//
buttonHold.addEventListener("click", function() {
  if (gamePlaying) {
    // add current score to global score
    //console.log(scores[activePlayer]);

    scores[activePlayer] += roundScore;
    //socres[activePlayer] = scores[activePlayer] + roundScore;
    //console.log(scores[activePlayer]);

    //update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // take value from input
    var input = document.querySelector(".final-score").value;
    // if input equals 0 the default is 100
    if (input === "0") {
      input = "100";
    }
    console.log(input);

    //check if player won the game
    if (scores[activePlayer] >= input) {
      document.querySelector("#name-" + activePlayer).textContent = "winner!";
      diceIcon.style.display = "none";
      diceIcon2.style.display = "none";
      //state variable
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});
//----------------------------------------------------------------------------------------------------------------//
// FUNCTION   nextplayer   --------------------------------------------------------------------------------------//

function nextPlayer() {
  //tenary operator if
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //set roundscore back to zero
  roundScore = 0;
  // set current scores back to zero
  currentZero.textContent = "0";
  currentOne.textContent = "0";
  //
  panelOne.classList.toggle("active");
  panelZero.classList.toggle("active");
  //remove dice when one has been rolled
  diceIcon.style.display = "none";
  diceIcon2.style.display = "none";
}
//----------------------------------------------------------------------------------------------------------------//
// FUNCTION   new game click  --------------------------------------------------------------------------------------//
//pass in function not calling it
buttonNew.addEventListener("click", init);

//----------------------------------------------------------------------------------------------------------------//
// FUNCTION   initialize  --------------------------------------------------------------------------------------//

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  scoreZero.innerHTML = "0";
  scoreOne.textContent = "0";
  currentOne.textContent = "0";
  currentZero.textContent = "0";
  nameZero.textContent = "Player 1";
  nameOne.textContent = "Player 2";

  playerOneTitle.classList.remove("winner");
  playerZeroTitle.classList.remove("winner");
  playerZeroTitle.classList.remove("active");
  playerOneTitle.classList.remove("active");

  // add active to the zero player on load
  playerZeroTitle.classList.add("active");
}

var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 1;

var scoreZero = document.getElementById("score-0");
var scoreOne = document.getElementById("score-1");
var currentZero = document.getElementById("current-0");
var currentOne = document.getElementById("current-1");

var panelZero = document.querySelector(".player-0-panel");
var panelOne = document.querySelector(".player-1-panel");

scoreZero.textContent = "0";
scoreOne.textContent = "0";
currentOne.textContent = "0";
currentZero.textContent = "0";

var buttonRoll = document.querySelector(".btn-roll");
var buttonHold = document.querySelector(".btn-hold");
var diceIcon = document.querySelector(".dice");

diceIcon.style.display = "none";
//
//
//
//
//
//button roll function
buttonRoll.addEventListener("click", function() {
  //

  //
  // 1. random number
  //always displays a number between 1 - 6
  dice = Math.floor(Math.random() * 6) + 1;
  //

  //2.display the result
  diceIcon.style.display = "block";
  diceIcon.src = "../img/d-" + dice + ".svg";
  //3. update the round score if the rooled number is not a 1
  if (dice !== 1) {
    //add score
    roundScore += dice;
    // same as roundScore = roundScore + dice;
    //
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    //
    //next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    //set roundscore back to zero
    roundScore = 0;
    // set current scores back to zero
    currentZero.textContent = "0";
    currentOne.textContent = "0";
    //
    // panelZero.classList.remove("active");
    // panelOne.classList.add("active");

    panelZero.classList.toggle("active");
    panelOne.classList.toggle("active");
    //remove dice when one has been rolled
    diceIcon.style.display = "none";
  }
});

buttonHold.addEventListener("click", function() {
  // add current score to global score
  console.log(scores[activePlayer]);

  scores[activePlayer] += roundScore;
  //socres[activePlayer] = scores[activePlayer] + roundScore;
  console.log(scores[activePlayer]);

  //update the UI
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  //check if player won the game
});
